import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "states";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// yup validation schema
const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.string().required("Profile picture is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = ({ onPageTypeChange, isLogin, isRegister }) => {
  // const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const register = async (values, onSubmitProps) => {
    const formData = new FormData(); // send form data with image
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      onPageTypeChange("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="0.7rem"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Email*
            </Typography>
            <TextField
              name="email"
              label="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />
            <Typography
              fontWeight="600"
              variant="h5"
              sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
            >
              Password*
            </Typography>
            <TextField
              name="password"
              type="password"
              label="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
              InputProps={{ sx: { borderRadius: "0.625rem" } }}
            />

            {isRegister && (
              <>
                <Typography
                fontWeight="600"
                variant="h5"
                sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
              >
                Name*
              </Typography>
                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{ sx: { borderRadius: "0.625rem" } }}
                />
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
                >
                  Phone Number*
                </Typography>
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{ sx: { borderRadius: "0.625rem" } }}
                />
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
                >
                  Occupation*
                </Typography>
                <TextField
                  name="occupation"
                  label="Occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{ sx: { borderRadius: "0.625rem" } }}
                />
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ color: theme.palette.font.main, paddingTop: "1.75rem" }}
                >
                  Profile picture*
                </Typography>
                <Box
                  gridColumn="span 2"
                  border={`1px solid ${theme.palette.neutral.main}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                    inputProps={{ sx: { borderRadius: "0.625rem" } }}
                    
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.neutral.main}`}
                        borderRadius="0.625rem"
                        p="1rem"
                        sx={{ " &:hover": { cursor: "pointer" } }}

                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Upload an image (.jpg, .jpeg, .png)</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {values.picture.name}
                              <EditOutlinedIcon />
                            </Typography>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            
          </Box>

          <Box>
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
              {isLogin ? "Log In" : "Create Account"}
            </Button>
            <Typography
              onClick={() => {
                onPageTypeChange(isLogin ? "register" : "login");
                resetForm();
              }}
              variant="h6"
              textAlign="center"
              sx={{
                textDecoration: "underline",
                color: theme.palette.font.main,
                "&:hover": {
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log In"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
