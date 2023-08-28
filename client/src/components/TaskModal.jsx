import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Checklist from "@editorjs/checklist";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import FlexBetween from "./FlexBetween";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Modal,
  TextField,
  IconButton,
  useTheme,
  Backdrop,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
} from "@mui/material";
import { useUpdateTaskMutation, useDeleteTaskMutation } from "states/api";
import "./TaskModal.css";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import { formatISO } from "date-fns";

const TaskModal = ({ data, closeTask }) => {
  const theme = useTheme();
  const [task, setTask] = useState(data);
  const [title, setTitle] = useState(data.title);
  const [company, setCompany] = useState(data.company);
  const [deadline, setDeadline] = useState(
    data.deadline ? parseISO(data.deadline) : new Date()
  );
  const [content, setContent] = useState(data.content);
  const [isOpen, setIsOpen] = useState(false);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const editorRef = useRef();
  const [updateTaskMutatation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  let timer;
  const timeout = 500;

  useEffect(() => {
    if (!editorRef.current && !editorInitialized) {
      initEditor();
      setEditorInitialized(true);
    }
    return () => {
      // editorRef.current.destroy();
      editorRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorInitialized]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editor.js",
      data: content,
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        let editorData = await editor.saver.save();
        setContent(editorData);
      },
      tools: {
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          inlineToolbar: ["link"],
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
          shortcut: "CMD+SHIFT+H",
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
      placeholder: "Write your task here ... Press (tab) for toolbar",
    });
    editorRef.current = editor;
  };

  const closeModal = () => {
    updateContent();
    updateDeadline();
    closeTask();
  };

  const updateTitle = async (current) => {
    clearTimeout(timer);
    const newTitle = current.target.value;
    setTitle(newTitle);
    timer = setTimeout(async () => {
      try {
        await updateTaskMutatation({
          taskId: task._id,
          title: newTitle,
          company: company,
          deadline: deadline,
          content: content,
        });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const updateCompany = async (current) => {
    clearTimeout(timer);
    const newCompany = current.target.value;
    setCompany(newCompany);
    timer = setTimeout(async () => {
      try {
        await updateTaskMutatation({
          taskId: task._id,
          title: title,
          company: newCompany,
          deadline: formatISO(deadline),
          content: content,
        });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const updateContent = async () => {
    if (content !== "") {
      try {
        await updateTaskMutatation({
          taskId: task._id,
          title: title,
          company: company,
          deadline: formatISO(deadline),
          content: content,
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateDeadline = async () => {
    try {
      await updateTaskMutatation({
        taskId: task._id,
        title: title,
        company: company,
        deadline: formatISO(deadline),
        content: content,
      });
    } catch (error) {
      alert(error);
    }
  };

  const deleteTask = async () => {
    try {
      const deletedTask = await deleteTaskMutation(task._id);
      console.log(
        "🚀 ~ file: TaskModal.jsx:166 ~ deleteTask ~ deletedTask:",
        deletedTask
      );
      closeTask();
    } catch (error) {
      alert(error);
    }
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      open={task !== ""}
      onClose={() => {
        closeModal();
        handleClose();
      }}
    >
      <Zoom in={task !== ""}>
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
          sx={{ backgroundColor: theme.palette.neutral[10], boxShadow: 24 }}
        >
          <FlexBetween m="2.5rem 3.5rem 1rem 3.5rem">
            <TextField
              value={title}
              onChange={updateTitle}
              variant="outlined"
              fullWidth
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2.5rem",
                  fontWeight: "700",
                },
                ml: "1.3rem",
              }}
            />
            <IconButton
              sx={{
                color: "#FF3D6E",
              }}
            >
              <DeleteOutlinedIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog
              open={isOpen}
              onClose={handleClose}
              sx={{
                m: "1rem 2rem",
                "& .MuiDialogTitle-root": { fontSize: "1.5rem" },
              }}
            >
              <DialogTitle id="confirm-delete-task">Delete task</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this task?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={handleClose}
                  sx={{
                    color: theme.palette.font[400],
                    mr: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteTask();
                  }}
                  sx={{
                    color: "#FF3D6E",
                    mr: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </FlexBetween>
          <FlexBetween>
            
          </FlexBetween>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb="0.7rem"
          >
            <Typography ml="5rem" variant="h5" fontWeight="600">
              Company:
            </Typography>
            <TextField
              value={company}
              onChange={updateCompany}
              placeholder="Enter your company"
              variant="outlined"
              fullWidth
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.125rem",
                  fontWeight: "400",
                },
                ml: "0.5rem",
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb="0.7rem"
          >
            <Typography ml="5rem" variant="h5" fontWeight="600">
              Deadline:
            </Typography>
            <DatePicker
              label="Select a date"
              value={deadline || null}
              format="dd/MM/yyyy"
              onChange={(newDeadline) => {
                setDeadline((newDeadline));
              }}
              sx={{
                ml: "0.5rem",
                "& .MuiInputLabel-root": {
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  top: "-0.5rem",
                },
                "& .MuiInputBase-root": {
                  borderRadius: "0.625rem",
                  height: "2.5rem",
                  width: "12rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  paddingLeft: "0.1rem",
                  paddingTop: "0.1rem",
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.main
                }
              }}
            />
          </Box>
          <Box>
            <Typography ml="5rem" variant="h5" fontWeight="600">
              Description:
            </Typography>
          </Box>

          <div
            id="editor.js"
            ml="1rem"
            style={{ maxHeight: "54vh", overflowY: "auto" }}
          ></div>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default TaskModal;
