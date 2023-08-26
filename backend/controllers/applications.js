import Application from "../models/Application.js";
import User from "../models/User.js";

export const createApplication = async (req, res) => {
  try {
    const {
      userId,
      position,
      department,
      company,
      location,
      salary,
      description,
      status,
    } = req.body;

    const newApplication = new Application({
      userId,
      position,
      department,
      company,
      location,
      salary,
      description,
      status,
    });

    await newApplication.save();

    const application = await Application.find({userId});

    res.status(201).json(application);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const applications = await Application.find({ userId: userId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneApplication = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { appId } = req.params;
    const application = await Application.findOne({ userId: userId, _id: appId });
    
    if (!application) return res.status(404).json("Application not found");

    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { appId } = req.params;
    const {
      position,
      department,
      company,
      location,
      salary,
      description,
      status,
    } = req.body;

    if (position === '') req.body.position = '-'
    if (department === '') req.body.department = '-'
    if (company === '') req.body.company = '-'
    if (location === '') req.body.location = '-'
    if (salary === '') req.body.salary = '-'
    if (description === '') req.body.description = ''

    const application = await Application.findById(appId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    const updatedApplication = await Application.findByIdAndUpdate(appId, {$set: req.body,});

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const {appIds} = req.body;
    console.log("🚀 ~ file: applications.js:76 ~ deleteApplication ~ appIds:", appIds)

    await Application.deleteMany({ _id: { $in: appIds } });

    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
