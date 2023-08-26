import User from "../models/User.js";
import Application from "../models/Application.js";
import TaskStatus from "../models/TaskStatus.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardApps = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const applications = await Application.find({ userId: userId })
      .limit(50)
      .sort({ createdOn: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
