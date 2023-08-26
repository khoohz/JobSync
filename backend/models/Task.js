import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskStatus: {
      type: mongoose.Types.ObjectId,
      ref: "TaskStatus",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled",
    },
    company: String,
    deadline: mongoose.Schema.Types.Date,
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
