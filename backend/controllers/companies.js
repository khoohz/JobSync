import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const {
      userId,
      name,
      position,
      companySize,
      location,
      websiteURL,
      linkedInURL,
      rating
    } = req.body;

    const newCompany = new Company({
      userId,
      name,
      position,
      companySize,
      location,
      websiteURL,
      linkedInURL,
      rating
    });

    await newCompany.save();

    const company = await Company.find();

    res.status(201).json(company);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const companies = await Company.find({ userId: userId });
    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneCompany = async (req, res) => {
  try {

    const { companyId } = req.params;
    const company = await Company.findById({ _id: companyId });

    if (!company) return res.status(404).json("Company not found");

    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const {
      userId,
      name,
      position,
      companySize,
      location,
      websiteURL,
      linkedInURL,
      rating
    } = req.body;

    if (position === "") req.body.position = "-";
    if (location === "") req.body.location = "-";
    if (websiteURL === "") req.body.websiteURL = "-";
    if (linkedInURL === "") req.body.linkedInURL = "-";
    if (rating === "") req.body.rating = "-";

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const updatedCompany = await Company.findByIdAndUpdate(companyId, {
      $set: req.body,
    });

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    await Company.findByIdAndDelete(companyId);

    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
