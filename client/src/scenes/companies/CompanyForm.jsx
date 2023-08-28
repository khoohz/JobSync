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
  Select,
  MenuItem,

} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "states/api";
import { useSelector } from "react-redux";

// yup validation schema
const companySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  position: yup.string(),
  companySize: yup.string().required("Company size is required"),
  location: yup.string(),
  websiteURL: yup.string().url(),
  linkedInURL: yup.string().url(),
  rating: yup.number(),
});

const initialValues = {
  name: "",
  position: "",
  companySize: "",
  location: "",
  websiteURL: "",
  linkedInURL: "",
  rating: "",
};

const CompanyForm = ({ onClose, editMode }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useSelector((state) => state.auth.user._id);

  const { data } = useGetCompanyQuery(editMode);
  const [addCompany] = useCreateCompanyMutation();
  const [changeCompany] = useUpdateCompanyMutation();

  if (!data) {
    return null;
  }

  let dataValues = {
    name: "",
    position: "",
    companySize: "",
    location: "",
    websiteURL: "",
    linkedInURL: "",
    rating: "",
  };

  if (editMode) {
    dataValues = {
      name: data.name,
      position: data.position,
      companySize: data.companySize,
      location: data.location,
      linkedInURL: data.linkedInURL === "-" ? "" : data.linkedInURL,
      websiteURL: data.websiteURL === "-" ? "" : data.websiteURL,
      rating: data.rating === "No rating" ? "" : data.rating,
    };
  }

  const createCompany = async (values, onSubmitProps) => {
    if (values.position === "") values.position = "-";
    if (values.location === "") values.location = "-";
    if (values.linkedInURL === "") values.linkedInURL = "-";
    if (values.websiteURL === "") values.websiteURL = "-";
    if (values.rating === "") values.rating = "No rating";

    await addCompany({
      name: values.name,
      position: values.position,
      companySize: values.companySize,
      location: values.location,
      linkedInURL: values.linkedInURL,
      websiteURL: values.websiteURL,
      rating: values.rating,
      userId: userId,
    });

    onSubmitProps.resetForm();
    onClose();
  };

  const updateCompany = async (values, onSubmitProps) => {
    if (values.position === "") values.position = "-";
    if (values.location === "") values.location = "-";
    if (values.linkedInURL === "") values.linkedInURL = "-";
    if (values.websiteURL === "") values.websiteURL = "-";
    if (values.rating === "") values.rating = "-";

    await changeCompany({
      name: values.name,
      position: values.position,
      companySize: values.companySize,
      location: values.location,
      linkedInURL: values.linkedInURL,
      websiteURL: values.websiteURL,
      rating: values.rating,
      userId: userId,
      companyId: editMode,
    });

    onSubmitProps.resetForm();
    onClose();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    editMode
      ? updateCompany(values, onSubmitProps)
      : createCompany(values, onSubmitProps);
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
            validationSchema={companySchema}
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
                    Create new company
                  </Typography>
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{
                      color: theme.palette.font.main,
                      paddingTop: "1.75rem",
                      gridColumn: "span 2"
                    }}
                  >
                    Company Name*
                  </Typography>
                  <TextField
                    name="name"
                    label="Enter the company name"
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
                      gridColumn: "span 2"
                    }}
                  >
                    Positions offered
                  </Typography>
                  <TextField
                    name="position"
                    type="position"
                    label="Enter the positions"
                    value={values.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.position) && Boolean(errors.position)}
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
                      gridColumn: "span 2",
                    }}
                  >
                    Company Size*
                  </Typography>
                  <Select
                    label="Select the company size"
                    name="companySize"
                    value={values.companySize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.companySize) && Boolean(errors.companySize)}
                    helpertext={touched.companySize && errors.companySize}
                    sx={{ gridColumn: "span 4", borderRadius: "0.625rem" }}
                  >
                    <MenuItem value="-">-</MenuItem>
                    <MenuItem value="0-10 employees">0-10 employees</MenuItem>
                    <MenuItem value="11-50 employees">11-50 employees</MenuItem>
                    <MenuItem value="51-200 employees">51-200 employees</MenuItem>
                    <MenuItem value="201-500 employees">201-500 employees</MenuItem>
                    <MenuItem value="501-1000 employees">501-1000 employees</MenuItem>
                    <MenuItem value="above 1000 employees">above 1000 employees</MenuItem>
                  </Select>
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
                      gridColumn: "span 2"
                    }}
                  >
                    Company Website URL
                  </Typography>
                  <TextField
                    name="websiteURL"
                    type="websiteURL"
                    label="Enter company website URL"
                    value={values.websiteURL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.websiteURL) &&
                      Boolean(errors.websiteURL)
                    }
                    helpertext={touched.websiteURL && errors.websiteURL}
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
                    Rating
                  </Typography>
                  <TextField
                    name="rating"
                    type="rating"
                    label="Enter a rating (1.0-5.0)"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.rating) && Boolean(errors.rating)
                    }
                    helpertext={touched.rating && errors.rating}
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
                      {editMode ? "Update Company" : "Create Company"}
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

export default CompanyForm;
