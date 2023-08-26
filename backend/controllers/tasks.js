import Task from "../models/Task.js";
import TaskStatus from "../models/TaskStatus.js";

export const createTask = async (req, res) => {
  try {
    const { taskStatusId } = req.body;

    const taskStatus = await TaskStatus.findById(taskStatusId);
    const tasksCount = await Task.find({ taskStatus: taskStatusId }).count();

    const task = await Task.create({
      taskStatus: taskStatusId,
      position: tasksCount > 0 ? tasksCount : 0,
    });

    taskStatus.tasks.push(task._id);
    await taskStatus.save();
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTaskStatus = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const taskStatus = await TaskStatus.find({ userId: userId })
      .populate("tasks")
      .exec();

    res.status(200).json(taskStatus);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, company, deadline, content } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json("Task not found");

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      company,
      deadline, 
      content,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTaskPosition = async (req, res) => {
  try {
    const {
      resourceList,
      destinationList,
      resourceTaskStatusId,
      destinationTaskStatusId,
    } = req.body;

    if (resourceTaskStatusId !== destinationTaskStatusId) {
      for (const key in resourceList) {
        await Task.findByIdAndUpdate(resourceList[key]._id, {
          $set: {
            taskStatus: resourceTaskStatusId,
            position: key,
          },
        });
      }
    }

    await TaskStatus.findByIdAndUpdate(resourceTaskStatusId, {
      $set: { tasks: resourceList.map(task => task._id) },
    });

    for (const key in destinationList) {
      const updated = await Task.findByIdAndUpdate(destinationList[key]._id, {
        $set: {
          taskStatus: destinationTaskStatusId,
          position: key,
        },
      }).exec();
    }

    await TaskStatus.findByIdAndUpdate(destinationTaskStatusId, {
      $set: { tasks: destinationList.map(task => task._id) },
    });

    res.status(200).json("updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const currentTask = await Task.findById(taskId);
    await Task.findByIdAndDelete(taskId);

    const tasks = await Task.find({ taskStatus: currentTask.taskStatus }).sort(
      "postition"
    );
    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key]._id, { $set: { position: key } });
    }

    await TaskStatus.updateOne(
      { _id: currentTask.taskStatus },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
