/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  DialogActions,
  Modal,
  Zoom,
  Backdrop,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useCreateContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "states/api";
import { useSelector } from "react-redux";

// yup validation schema
const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email(),
  phoneNumber: yup.string(),
  position: yup.string().required("Position is required"),
  department: yup.string(),
  company: yup.string(),
  location: yup.string(),
  linkedInURL: yup.string().url(),
  otherURL: yup.string().url(),
});

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  position: "",
  department: "",
  company: "",
  location: "",
  linkedInURL: "",
  otherURL: "",
};

const ContactForm = ({ onClose, editMode }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useSelector((state) => state.auth.user._id);

  const { data } = useGetContactQuery(editMode);
  const [addContact] = useCreateContactMutation();
  const [changeContact] = useUpdateContactMutation();

  if (!data) {
    return null; 
  }

  let dataValues = {
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    company: "",
    location: "",
    linkedInURL: "",
    otherURL: "",
  };

  if (editMode) {
    dataValues = {
      name: data.name,
      email: data.email === "-" ? "" : data.email,
      phoneNumber: data.phoneNumber,
      position: data.position,
      department: data.department,
      company: data.company,
      location: data.location,
      linkedInURL: data.linkedInURL === "-" ? "" : data.linkedInURL,
      otherURL: data.otherURL === "-" ? "" : data.otherURL,
    };
  }

  const createContact = async (values, onSubmitProps) => {
    if (values.email === "") values.email = "-";
    if (values.phoneNumber === "") values.phoneNumber = "-";
    if (values.department === "") values.department = "-";
    if (values.company === "") values.company = "-";
    if (values.location === "") values.location = "-";
    if (values.linkedInURL === "") values.linkedInURL = "-";
    if (values.otherURL === "") values.otherURL = "-";

    await addContact({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      position: values.position,
      department: values.department,
      company: values.company,
      location: values.location,
      linkedInURL: values.linkedInURL,
      otherURL: values.otherURL,
      userId: userId,
    });

    onSubmitProps.resetForm();
    onClose();
  };

  const updateContact = async (values, onSubmitProps) => {
    if (values.email === "") values.email = "-";
    if (values.phoneNumber === "") values.phoneNumber = "-";
    if (values.department === "") values.department = "-";
    if (values.company === "") values.company = "-";
    if (values.location === "") values.location = "-";
    if (values.linkedInURL === "") values.linkedInURL = "-";
    if (values.otherURL === "") values.otherURL = "-";

    await changeContact({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      position: values.position,
      department: values.department,
      company: values.company,
      location: values.location,
      linkedInURL: values.linkedInURL,
      otherURL: values.otherURL,
      userId: userId,
      contactId: editMode,
    });

    onSubmitProps.resetForm();
    onClose();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    editMode
      ? updateContact(values, onSubmitProps)
      : createContact(values, onSubmitProps);
  };

  return (
    <Modal open={Boolean(onClose)} onClose={onClose}>
      <Zoom in={Boolean(onClose)}>
        <Box
          height="80%"
          width="70%"
          m="1rem"
          position="absolute"
          top="10%"
          left="15%"
          transform="translate(-50%, -50%)"
          closeaftertransition="true"
          slots={{ backdrop: Backdrop }}
          slotprops={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{
            backgroundColor: theme.palette.neutral[10],
            boxShadow: 24,
            overflowY: "auto",
          }}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={editMode ? dataValues : initialValues}
            validationSchema={contactSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  m="3rem 8rem"
                  display="grid"
                  gap="0.7rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                    "& .MuiDialogActions-root": {
                      padding: "0rem",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    color={theme.palette.font.main}
                    fontWeight="700"
                    sx={{ mt: "2rem", gridColumn: "span 4" }}
                  >
                    Create new contact
                  </Typography>
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Name*
                  </Typography>
                  <TextField
                    name="name"
                    label="Enter the name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helpertext={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    type="email"
                    label="Enter the email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helpertext={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                      gridColumn: "span 2",
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    name="phoneNumber"
                    type="phoneNumber"
                    label="Enter the phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.phoneNumber) &&
                      Boolean(errors.phoneNumber)
                    }
                    helpertext={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Position*
                  </Typography>
                  <TextField
                    name="position"
                    type="position"
                    label="Enter the position"
                    value={values.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.position) && Boolean(errors.position)
                    }
                    helpertext={touched.position && errors.position}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Department
                  </Typography>
                  <TextField
                    name="department"
                    type="department"
                    label="Enter the department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.department) && Boolean(errors.department)
                    }
                    helpertext={touched.department && errors.department}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Company
                  </Typography>
                  <TextField
                    name="company"
                    type="company"
                    label="Enter the company"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.company) && Boolean(errors.company)}
                    helpertext={touched.company && errors.company}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    Location
                  </Typography>
                  <TextField
                    name="location"
                    type="location"
                    label="Enter the location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helpertext={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                    }}
                  >
                    LinkedIn URL
                  </Typography>
                  <TextField
                    name="linkedInURL"
                    type="linkedInURL"
                    label="Enter LinkedIn profile URL"
                    value={values.linkedInURL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.linkedInURL) &&
                      Boolean(errors.linkedInURL)
                    }
                    helpertext={touched.linkedInURL && errors.linkedInURL}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                      gridColumn: "span 2",
                    }}
                  >
                    Other Social Media URL
                  </Typography>
                  <TextField
                    name="otherURL"
                    type="otherURL"
                    label="Enter other social media URL"
                    value={values.otherURL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.otherURL) && Boolean(errors.otherURL)
                    }
                    helpertext={touched.otherURL && errors.otherURL}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{ sx: { borderRadius: "0.625rem" } }}
                  />

                  <DialogActions
                    sx={{
                      gridColumn: "span 1",
                    }}
                  >
                    <Button
                      fullWidth
                      onClick={() => onClose()}
                      sx={{
                        m: "2rem 0 1rem 0",
                        p: "1rem",
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.main,
                        borderRadius: "0.625rem",
                        fontSize: "16px",
                        fontWeight: "600",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          backgroundColor: theme.palette.neutral.main,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                  <DialogActions sx={{ gridColumn: "span 3" }}>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0 1rem 0",
                        p: "1rem",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.alt,
                        borderRadius: "0.625rem",
                        fontSize: "16px",
                        fontWeight: "600",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          backgroundColor: theme.palette.primary.light,
                        },
                      }}
                    >
                      {editMode ? "Update Contact" : "Create Contact"}
                    </Button>
                  </DialogActions>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default ContactForm;
