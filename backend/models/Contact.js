import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      max: 50,
    },
    phoneNumber: String,
    position: {
      type: String,
      required: true,
    },
    department: String,
    company: String,
    location: String,
    linkedInURL: String,
    otherURL: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;