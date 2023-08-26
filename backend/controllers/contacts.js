import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      position,
      department,
      company,
      location,
      linkedInURL,
      otherURL,
    } = req.body;

    const newContact = new Contact({
      userId,
      name,
      email,
      phoneNumber,
      position,
      department,
      company,
      location,
      linkedInURL,
      otherURL,
    });

    await newContact.save();

    const contact = await Contact.find();

    res.status(201).json(contact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const contacts = await Contact.find({ userId: userId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneContact = async (req, res) => {
  try {

    const { contactId } = req.params;
    const contact = await Contact.findById({ _id: contactId });

    if (!contact) return res.status(404).json("Contact not found");

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const {
      userId,
      name,
      email,
      phoneNumber,
      position,
      department,
      company,
      location,
      linkedInURL,
      otherURL,
    } = req.body;

    if (email === "") req.body.email = "-";
    if (phoneNumber === "") req.body.phoneNumber = "-";
    if (department === "") req.body.department = "-";
    if (company === "") req.body.company = "-";
    if (location === "") req.body.location = "-";
    if (linkedInURL === "") req.body.linkedInURL = "-";
    if (otherURL === "") req.body.otherURL = "-";

    const contact = await Contact.findById(contactId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const updatedContact = await Contact.findByIdAndUpdate(contactId, {
      $set: req.body,
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
