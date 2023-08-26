import mongoose from "mongoose";

const taskStatus_Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Untitled",
    },
    tasks: [{
      type: mongoose.Types.ObjectId,
      ref: "Task",
    }],
  },
  { timestamps: true }
);

const TaskStatus = mongoose.model("TaskStatus", taskStatus_Schema);

export default TaskStatus;