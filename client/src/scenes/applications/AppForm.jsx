import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setApplications } from "states";
import { useCreateApplicationMutation } from "states/api";
import { useSelector } from "react-redux";

// yup validation schema
const appSchema = yup.object().shape({
  position: yup.string().required("position is required"),
  department: yup.string(),
  company: yup.string().required("company is required"),
  location: yup.string().required("location is required"),
  salary: yup.number(),
  description: yup.string(),
  status: yup.string().required("status is required"),
  userId: yup.string(),
});

const initialValues = {
  position: "",
  department: "",
  company: "",
  location: "",
  salary: "",
  description: "",
  status: "",
  userId: "",
};

const AppForm = ({ handleCloseForm }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useSelector((state) => state.auth.user._id);
  const applications = useSelector((state) => state.auth.applications);

  const [addApplication] = useCreateApplicationMutation();

  const createApp = async (values, onSubmitProps) => {
    if (values.position === '') values.position = '-'
    if (values.department === '') values.department = '-'
    if (values.company === '') values.company = '-'
    if (values.location === '') values.location = '-'
    if (values.salary === '') values.salary = '-'
    if (values.description === '') values.description = 'Description (optional)'
    if (values.status === '') values.status = 'No status'
    
    const savedApp = await addApplication({
      position: values.position,
      department: values.department,
      company: values.company,
      location: values.location,
      salary: values.salary,
      description: values.description,
      status: values.status,
      userId: userId,
    });

    onSubmitProps.resetForm();
    handleCloseForm();

    const newApplication = savedApp.data;

    if (savedApp) {
      dispatch(setApplications({ applications: newApplication}));
    } 
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    createApp(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={appSchema}
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
            m="2rem 8rem"
            display="grid"
            gap="0.7rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              "& .MuiDialogActions-root": {
                padding: "0rem",
              }
            }}
          >
            <Typography
              variant="h3"
              color={theme.palette.font.main}
              fontWeight="700"
              sx={{ mt: "2rem", gridColumn: "span 4" }}
            >
              Create a new application
            </Typography>
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Position*
            </Typography>
            <TextField
              name="position"
              label="Enter the position"
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
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
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
              error={Boolean(touched.department) && Boolean(errors.department)}
              helpertext={touched.department && errors.department}
              sx={{ gridColumn: "span 4" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Company*
            </Typography>
            <TextField
              name="company"
              type="company"
              label="Enter the company name"
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
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Location*
            </Typography>
            <TextField
              name="location"
              type="location"
              label="Enter the location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.location) && Boolean(errors.location)}
              helpertext={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Salary
            </Typography>
            <TextField
              name="salary"
              type="salary"
              label="Enter the expected salary"
              value={values.salary}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.salary) && Boolean(errors.salary)}
              helpertext={touched.salary && errors.salary}
              sx={{ gridColumn: "span 4" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Description
            </Typography>
            <TextField
              name="description"
              type="description"
              label="Enter the job description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helpertext={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Status*
            </Typography>
            <Select
              label="Select a status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.status) && Boolean(errors.status)}
              helpertext={touched.status && errors.status}
              sx={{ gridColumn: "span 4", borderRadius: "0.625rem" }}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interviewing">Interviewing</MenuItem>
              <MenuItem value="Offered">Offered</MenuItem>
              <MenuItem value="Negotiating">Negotiating</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
            </Select>

            <DialogActions
              sx={{
                gridColumn: "span 1",
              }}
            >
              <Button
                fullWidth
                onClick={() => handleCloseForm()}
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
                Create Application
              </Button>
            </DialogActions>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AppForm;
