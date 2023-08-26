import TaskStatus from "../models/TaskStatus.js"

const createInitialTaskStatus =  (userId) => {
  const titles = ["Done", "In Progress", "Not started"]
  const taskStatus = titles.map(async (title) => {
    const newTaskStatus = new TaskStatus({
      userId,
      title,
    });
    return await newTaskStatus.save();
  });

  return Promise.all(taskStatus);
}

export default createInitialTaskStatus


