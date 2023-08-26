import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from "states/api";
import {
  Box,
  Typography,
  useTheme,
  Divider,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { setOneApplication, setApplication } from "states";

const Application = () => {
  const applications = useSelector((state) => state.auth.applications);
  const { appId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, refetch } = useGetApplicationQuery(appId);
  const application = useSelector((state) => state.auth.application);
  const [updateApplication] = useUpdateApplicationMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Track data loading

  useEffect(() => {
    const getApplication = async () => {
      try {
        if (data) {
          refetch();
          dispatch(setOneApplication({ application: data }));
          setCompany(data.company);
          setPosition(data.position);
          if (data.department === null) {
            setDepartment("-");
          } else {
            setDepartment(data.department);
          }
          setDescription(data.description);
          setLocation(data.location);
          setStatus(data.status);
          setAppliedDate(data.createdAt);

          setTimeout(() => {
            setDataLoaded(true);
          }, 300);
        }
      } catch (error) {
        alert(error);
      }
    };
    getApplication();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, appId, dispatch]);

  const handleNavigateBack = () => {
    navigate(-1);
    dispatch(setOneApplication({ application: null }));
  };

  const updatePosition = async (current) => {
    const newPosition = current.target.value;
    setPosition(newPosition);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], position: newPosition };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };

  const updateDepartment = async (current) => {
    const newDepartment = current.target.value;
    setDepartment(newDepartment);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], department: newDepartment };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };

  const updateCompany = async (current) => {
    const newCompany = current.target.value;
    setCompany(newCompany);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], company: newCompany };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };
  const updateLocation = async (current) => {
    const newLocation = current.target.value;
    setLocation(newLocation);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], location: newLocation };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };

  const updateDescription = async (current) => {
    const newDescription = current.target.value;
    setDescription(newDescription);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], description: newDescription };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };

  const updateStatus = async (current) => {
    const newStatus = current.target.value;
    setStatus(newStatus);

    let temp = [...applications];
    const index = temp.findIndex((current) => current._id === appId);
    temp[index] = { ...temp[index], status: newStatus };
    dispatch(setOneApplication({ application: temp[index] }));
    dispatch(setApplication({ applications: temp }));
  };

  const handleUpdateApp = async () => {
    try {
      setIsLoading(true);
      const updated = await updateApplication({
        ...application,
        appId: appId,
      });

      if (updated) {
        console.log("updated successfully");
        navigate("/applications");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box m="1rem 1.5rem 1.5rem 2.0rem" position="relative">
      {dataLoaded && (
        <>
          <IconButton onClick={() => handleNavigateBack()}>
            <KeyboardBackspaceIcon sx={{ color: theme.palette.font.light }} />
          </IconButton>

          <Box height="83vh" width="96%" ml="1.5rem" mt="0.5rem">
            <TextField
              value={position}
              onChange={updatePosition}
              variant="outlined"
              fullWidth
              sx={{
                color: theme.palette.font.main,
                mb: "0.5rem",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2rem",
                  fontWeight: "700",
                },
              }}
            ></TextField>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb="0.5rem"
              alignItems="center"
            >
              <Typography
                variant="h5"
                fontWeight="500"
                color={theme.palette.font.light}
              >
                Department:
              </Typography>
              <TextField
                value={department}
                onChange={updateDepartment}
                variant="outlined"
                fullWidth
                sx={{
                  ml: "0.5rem",
                  color: theme.palette.font.main,
                  "& .MuiOutlinedInput-input": { padding: 0 },
                  "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                  "& .MuiOutlinedInput-root": { fontSize: "1.125rem" },
                }}
              ></TextField>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb="0.5rem"
              alignItems="center"
            >
              <Typography
                variant="h5"
                fontWeight="500"
                color={theme.palette.font.light}
              >
                Company:
              </Typography>
              <TextField
                value={company}
                onChange={updateCompany}
                variant="outlined"
                fullWidth
                sx={{
                  ml: "0.5rem",
                  color: theme.palette.font.main,
                  "& .MuiOutlinedInput-input": { padding: 0 },
                  "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                  "& .MuiOutlinedInput-root": { fontSize: "1.125rem" },
                }}
              ></TextField>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb="0.5rem"
              alignItems="center"
            >
              <Typography
                variant="h5"
                fontWeight="500"
                color={theme.palette.font.light}
              >
                Location:
              </Typography>
              <TextField
                value={location}
                onChange={updateLocation}
                variant="outlined"
                fullWidth
                sx={{
                  ml: "0.5rem",
                  color: theme.palette.font.main,
                  "& .MuiOutlinedInput-input": { padding: 0 },
                  "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                  "& .MuiOutlinedInput-root": { fontSize: "1.125rem" },
                }}
              ></TextField>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb="0.5rem"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ color: theme.palette.font.light }}
              >
                Status:
              </Typography>
              <Select
                label="Select your status"
                name="status"
                value={status}
                onChange={updateStatus}
                sx={{
                  borderRadius: "0.625rem",
                  height: "2.5rem",
                  width: "9rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  paddingLeft: "0.1rem",
                  paddingTop: "0.1rem",
                }}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interviewing">Interviewing</MenuItem>
                <MenuItem value="Offered">Offered</MenuItem>
                <MenuItem value="Negotiating">Negotiating</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
              </Select>
            </Box>
            <Typography
              variant="h6"
              fontWeight="500"
              color={theme.palette.font.main}
              gutterBottom
              components={{ span: "span" }}
            >
              <span
                style={{
                  color: theme.palette.font.light,
                  fontSize: "1.125rem",
                  fontWeight: "500",
                }}
              >
                Created at: {" "}
              </span>{" "}
              {new Date(appliedDate).toLocaleDateString("en-GB")}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              fontWeight="700"
              mt="1.5rem"
              mb="1rem"
              sx={{ color: theme.palette.font.main }}
            >
              Job description
            </Typography>
            <TextField
              value={description}
              onChange={updateDescription}
              variant="outlined"
              fullWidth
              sx={{
                color: theme.palette.font.light,
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": { fontSize: "1.125rem" },
              }}
            ></TextField>
          </Box>
          <Box position="absolute" bottom="1.5rem" right="2.5rem">
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleUpdateApp()}
              sx={{
                p: "0.5rem 1.2rem 0.4rem 1.2rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                borderRadius: "0.625rem",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "none",
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  boxShadow: "none",
                },
              }}
            >
              Save
            </LoadingButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Application;
