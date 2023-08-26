import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: String,
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: String,
    description: String,
    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Offered", "Negotiating","Rejected", "Accepted"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;