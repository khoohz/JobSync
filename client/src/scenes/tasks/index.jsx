import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  useGetTaskStatusQuery,
  useCreateTaskMutation,
  useUpdateTaskPositionMutation,
} from "states/api";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "components/Header";
import TaskModal from "components/TaskModal";

const Tasks = () => {
  const theme = useTheme();
  const [taskStatus, setTaskStatus] = useState([]);
  const { data, refetch } = useGetTaskStatusQuery();
  const [addTask] = useCreateTaskMutation();
  const [updateTaskPosition] = useUpdateTaskPositionMutation();
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    const getTaskStatus = async () => {
      try {
        if (data) {
          const sortedTaskStatus = [...data].sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            return titleA.localeCompare(titleB);
          });
          setTaskStatus(sortedTaskStatus);
        }
      } catch (error) {
        alert(error);
      }
    };
    getTaskStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const updatedTaskStatus = [...taskStatus];
    const sourceColIndex = updatedTaskStatus.findIndex(
      (current) => current._id === source.droppableId
    );
    const destinationColIndex = updatedTaskStatus.findIndex(
      (current) => current._id === destination.droppableId
    );
    const sourceCol = updatedTaskStatus[sourceColIndex];
    const destinationCol = updatedTaskStatus[destinationColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      updatedTaskStatus[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      updatedTaskStatus[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTasks,
      };
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      updatedTaskStatus[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTasks,
      };
    }

    setTaskStatus(updatedTaskStatus);

    try {
      await updateTaskPosition({
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceTaskStatusId: sourceCol._id,
        destinationTaskStatusId: destinationCol._id,
      });
      refetch();
    } catch (error) {
      alert(error);
    }
  };

  const createTask = async (taskStatusId) => {
    try {
      await addTask({ taskStatusId });
      refetch();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem 1.5rem 2.5rem" width="94%">
      {!selectedTask && (
        <>
          <Header title="Tasks" />

          <DragDropContext onDragEnd={onDragEnd}>
            <Box
              height="83vh"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                overflowX: "auto",
              }}
            >
              {taskStatus.map((taskStatus) => (
                <Box
                  key={taskStatus._id}
                  sx={{
                    width: "100%",
                    flex: "1",
                    minWidth: "180px",
                    flexShrink: 0,
                    "& .MuiInputBase-input": {
                      ml: "0.2rem",
                    },
                  }}
                >
                  <Droppable key={taskStatus._id} droppableId={taskStatus._id}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          padding: "1rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "1rem",
                            marginRight: "-0.5rem",
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
                          <Typography
                            variant="h6"
                            fontWeight="700"
                            p="1.1rem 1rem 1rem 1rem"
                            sx={{
                              borderRadius: "50%",
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.font.light,
                              width: "1.5rem",
                              height: "1.5rem",
                              textAlign: "center",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {taskStatus.tasks.length}
                          </Typography>
                          <IconButton
                            ml="10rem"
                            variant="outlined"
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              "&:hover": { color: theme.palette.primary.dark },
                            }}
                            onClick={() => createTask(taskStatus._id)}
                          >
                            <AddOutlinedIcon />
                          </IconButton>
                        </Box>
                        {/* tasks */}
                        {taskStatus.tasks.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  padding: "0.8rem 0.9rem 0.4rem 0.9rem" ,
                                  marginBottom: "1rem",
                                  borderRadius: "0.5rem",
                                  cursor: snapshot.isDragging
                                    ? "grab"
                                    : "pointer!important",
                                }}
                                onClick={() => setSelectedTask(task)}
                              >
                                <Typography
                                  variant="h5"
                                  fontWeight="600"
                                  gutterBottom
                                >
                                  {task.title || "Untitled"}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  fontWeight="500"
                                  gutterBottom
                                  sx={{ color: theme.palette.font.light }}
                                >
                                  {task.company || "No company"}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  fontWeight="500"
                                  gutterBottom
                                  sx={{ color: theme.palette.font.light }}
                                >
                                  Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString("en-GB") : "-"}
                                </Typography>
                                <Box sx={{pt: "0.15rem", borderTop: "3px solid ", borderColor: theme.palette.background.alt}}>
                                <Typography
                                  variant="h7"
                                  fontWeight="500"
                                  components={{ span: "span" }}
                                  sx={{ color: theme.palette.font.light, }}
                                >
                                  Last updated:{" "}
                                  <span style={{color: theme.palette.font.main, fontWeight: "600"}}>{new Date(task.updatedAt).toLocaleDateString(
                                    "en-GB"
                                  ) ||
                                    new Date(task.createdAt).toLocaleDateString(
                                      "en-GB"
                                    )}</span>
                                </Typography>
                                </Box>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Box>
              ))}
            </Box>
          </DragDropContext>
        </>
      )}
      {selectedTask && (
        <TaskModal
          data={selectedTask}
          closeTask={() => {
            setSelectedTask("");
            refetch();
          }}
        />
      )}
    </Box>
  );
};

export default Tasks;
