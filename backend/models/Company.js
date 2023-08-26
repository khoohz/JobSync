import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
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
    position: String,
    companySize: {
      type: String,
      required: true,
    },  
    location: String,
    websiteURL: String,
    linkedInURL: String,
    rating: String,
    
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;