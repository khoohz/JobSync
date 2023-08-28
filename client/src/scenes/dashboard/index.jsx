import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetDashboardAppsQuery, useGetTaskStatusQuery } from "states/api";
import { setApplications, setTask } from "states";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  useTheme,
  useMediaQuery,
  TextField,
  Card,
  Typography,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import CustomNoRowsOverlay from "components/CustomNoRowsOverlay";
import { useNavigate } from "react-router-dom";
import StatsBox from "components/StatsBox";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import LoadingImg from "components/LoadingImg";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMediumScreen = useMediaQuery("(min-width: 1300px");
  const applications = useSelector((state) => state.auth.applications);
  const task = useSelector((state) => state.auth.task);
  const { data: taskData } = useGetTaskStatusQuery();
  const { data: appData, isLoading: appLoading } = useGetDashboardAppsQuery();

  const mode = useSelector((state) => state.auth.mode);
  const isLightMode = mode === "light";

  useEffect(() => {
    const getApplication = async () => {
      try {
        if (applications.length === 0 && appData) {
          dispatch(setApplications({ applications: appData }));
        }
      } catch (error) {
        alert(error);
      }
    };
    getApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData, dispatch]);

  useEffect(() => {
    const getTaskStatus = async () => {
      try {
        if (taskData) {
          const inProgressTasks = taskData.filter(
            (status) => status.title !== "Done"
          );
          dispatch(setTask({ task: inProgressTasks }));
        }
      } catch (error) {
        alert(error);
      }
    };
    getTaskStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskData, dispatch]);

  const totalApplied = applications.filter(
    (status) => status.status === "Applied"
  ).length;

  const totalInterviewing = applications.filter(
    (status) => status.status === "Interviewing"
  ).length;

  const totalOffered = applications.filter(
    (status) => status.status === "Offered"
  ).length;
  
  const totalRejected = applications.filter(
    (status) => status.status === "Rejected"
  ).length;

  const columns = [
    {
      field: "company",
      headerName: "Company",
      flex: 0.5,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.5,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.35,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem 1.5rem 2.5rem">
      {appData?.length > 0 && task?.length > 0 ? (
        <Box
          mt="1.125rem"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="10rem"
          gap="1.125rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreen ? undefined : "span 12",
            },
          }}
        >
          <StatsBox title="Total Applied" value={totalApplied} />
          <StatsBox title="Total Interviewing" value={totalInterviewing} />
          <StatsBox title="Total Offered" value={totalOffered} isOffered={true}/>
          <StatsBox title="Total Rejected" value={totalRejected} />

          <Box gridColumn="span 4" gridRow="span 5">
            <FlexBetween sx={{ ml: "1rem", mb: "0.8rem" }}>
              <Typography
                variant="h3"
                color={theme.palette.font.main}
                fontWeight="700"
              >
                Tasks
              </Typography>
              <IconButton
                onClick={() => navigate("/tasks")}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  borderRadius: "50%",
                  width: "1.2em",
                  height: "1.2em",
                  mr: "0.5rem",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ChevronRightOutlinedIcon />
              </IconButton>
            </FlexBetween>
            {task.map((taskStatus) => (
              <Box
                key={taskStatus._id}
                sx={{
                  width: "100%",
                  flex: "1",
                  minWidth: "12rem",
                  flexShrink: 0,
                  "& .MuiInputBase-input": {
                    ml: "0.2rem",
                  },
                }}
              >
                <Box
                  sx={{
                    padding: "1rem 0.3rem 1rem 1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField
                      value={taskStatus.title}
                      variant="outlined"
                      sx={{
                        flexGrow: 1,
                        "& .MuiOutlinedInput-input": { padding: 0 },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset ",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontSize: "1.125rem",
                          fontWeight: "700",
                        },
                      }}
                    />
                  </Box>
                  {/* tasks */}
                  {taskStatus.tasks && taskStatus.tasks.length > 0 ? (
                    taskStatus.tasks.slice(0, 3).map((tasks) => (
                      <Card
                        key={tasks._id}
                        sx={{
                          padding: "0.8rem 0.9rem 0.4rem 0.9rem",
                          backgroundColor: theme.palette.neutral.main,
                          marginBottom: "1rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                          {tasks.title || "Untitled"}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="500"
                          gutterBottom
                          sx={{ color: theme.palette.font.light }}
                        >
                          {tasks.company || "No company"}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="500"
                          gutterBottom
                          sx={{ color: theme.palette.font.light }}
                        >
                          Deadline:{" "}
                          {tasks.deadline
                            ? new Date(tasks.deadline).toLocaleDateString(
                                "en-GB"
                              )
                            : "-"}
                        </Typography>
                        <Box
                          sx={{
                            pt: "0.15rem",
                            borderTop: "3px solid ",
                            borderColor: theme.palette.background.alt,
                          }}
                        >
                          <Typography
                            variant="h7"
                            fontWeight="500"
                            components={{ span: "span" }}
                            sx={{ color: theme.palette.font.light }}
                          >
                            Last updated:{" "}
                            <span
                              style={{
                                color: theme.palette.font.main,
                                fontWeight: "600",
                              }}
                            >
                              {new Date(tasks.updatedAt).toLocaleDateString(
                                "en-GB"
                              ) ||
                                new Date(tasks.createdAt).toLocaleDateString(
                                  "en-GB"
                                )}
                            </span>
                          </Typography>
                        </Box>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="h6" sx={{ ml: "0.2rem" }}>
                      No tasks available.
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 5"
            mt="2rem"
            height="72vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.font.main,
                borderBottom: isLightMode
                  ? `${theme.palette.grey[300]} solid 2.5px`
                  : `rgba(246, 246, 246, 0.5) solid 2px`,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "600",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-row": {
                borderBottom: isLightMode
                  ? `${theme.palette.grey[300]} solid 2.5px`
                  : `rgba(246, 246, 246, 0.5) solid 2px`,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.font.light} !important`,
              },
            }}
          >
            <FlexBetween sx={{ mb: "1rem", ml: "0.625rem" }}>
              <Typography
                variant="h3"
                color={theme.palette.font.main}
                fontWeight="700"
              >
                Applications
              </Typography>
              <IconButton
                onClick={() => navigate("/applications")}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  borderRadius: "50%",
                  width: "1.2em",
                  height: "1.2em",
                  mr: "0.5rem",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ChevronRightOutlinedIcon />
              </IconButton>
            </FlexBetween>
            <DataGrid
              rows={applications || []}
              columns={columns}
              loading={appLoading || !applications}
              getRowId={(row) => row._id}
              rowHeight={55}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box mt="28vh">
          <LoadingImg content={"Loading ..."}/>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
