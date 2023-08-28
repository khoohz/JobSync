import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import ContactForm from "./ContactForm";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useGetContactsQuery, useDeleteContactMutation } from "states/api";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LoadingImg from "components/LoadingImg";

const Contact = ({
  _id,
  name,
  email,
  phoneNumber,
  position,
  department,
  company,
  location,
  linkedInURL,
  otherURL,
  deletedContact,
  editContact,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteContact] = useDeleteContactMutation();

  const handleEditContact = () => {
    editContact(_id);
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(_id);
      deletedContact();
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
    <Card
      sx={{
        borderRadius: "0.55rem",
        "& .MuiCardContent-root": {
          padding: "1.5rem 1.5rem 0.5rem 1.5rem",
        },
        // boxShadow: "none"
      }}
    >
      <CardContent mr="1.5rem">
        <Typography
          variant="h4"
          fontWeight="700"
          color={theme.palette.font.main}
          gutterBottom
        >
          {name}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Email:{" "}
          </span>{" "}
          {email}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Phone number:{" "}
          </span>{" "}
          {phoneNumber}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Position:{" "}
          </span>{" "}
          {position}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Department:{" "}
          </span>{" "}
          {department}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Company:{" "}
          </span>{" "}
          {company}
        </Typography>
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
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Location:{" "}
          </span>{" "}
          {location}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="500"
          color={theme.palette.font.light}
        >
          LinkedIn:
        </Typography>
        <Typography variant="h6" component="div">
          {linkedInURL}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="500"
          color={theme.palette.font.light}
        >
          Social media:
        </Typography>
        <Typography variant="h5" component="div">
          {otherURL}
        </Typography>
      </CardContent>
      <CardActions>
        <Box width="90%" ml="5%" mb="0.5rem">
          <FlexBetween>
            <IconButton
              variant="primary"
              size="small"
              onClick={() => {
                handleEditContact();
              }}
              sx={{ color: theme.palette.primary.main }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              variant="primary"
              size="small"
              onClick={() => handleClickOpen()}
              sx={{ color: "#FF3D6E" }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
            <Dialog
              open={isOpen}
              onClose={handleClose}
              sx={{
                m: "1rem 2rem",
                "& .MuiDialogTitle-root": { fontSize: "1.5rem" },
              }}
            >
              <DialogTitle id="confirm-delete-task">Delete contact</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this contact info?
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
                    handleDeleteContact();
                    handleClose();
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
        </Box>
      </CardActions>
    </Card>
  );
};

const Contacts = () => {
  const theme = useTheme();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:1350px");

  const [isEdit, setIsEdit] = useState("");

  const { data, isLoading, refetch } = useGetContactsQuery();

  const handleCreateForm = () => {
    setIsFormOpen(true);
    setIsEdit("");
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    refetch();
  };

  const handleEditForm = (contactId) => {
    setIsFormOpen(true);
    setIsEdit(contactId);
  };

  const deleteContact = () => {
    refetch();
  };

  return (
    <>
      {data && (
        <Box m="1.5rem 0rem 1.5rem 2.5rem">
          <FlexBetween>
            <Header title="Contacts" />
            <Box pr="4rem">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  handleCreateForm();
                }}
                sx={{
                  p: "0.5rem 1rem 0.4rem 1rem",
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
                Create
              </Button>
            </Box>
          </FlexBetween>
          {data.length > 0 && (
            <Box
              mt="1.25rem"
              mr="2.5rem"
              display="grid"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="1.5rem"
              columnGap="1.2rem"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 3",
                },
              }}
            >
              {data.map(
                ({
                  _id,
                  name,
                  email,
                  phoneNumber,
                  position,
                  department,
                  company,
                  location,
                  linkedInURL,
                  otherURL,
                }) => (
                  <Contact
                    key={_id}
                    _id={_id}
                    name={name}
                    email={email}
                    phoneNumber={phoneNumber}
                    position={position}
                    department={department}
                    company={company}
                    location={location}
                    linkedInURL={linkedInURL}
                    otherURL={otherURL}
                    deletedContact={deleteContact}
                    editContact={handleEditForm}
                  />
                )
              )}
            </Box>
          )}

          {isFormOpen && (
            <ContactForm
              onClose={() => {
                handleCloseForm();
              }}
              editMode={isEdit}
            />
          )}

          {data.length === 0 &&
            !isLoading && ( // Check if data is empty and not loading
              <Box mt="28vh">
                <LoadingImg content="No contact" />
              </Box>
            )}

          {data.length > 0 &&
            isLoading && ( // Check if loading
              <Box mt="28vh">
                <LoadingImg content="Loading contacts ..." />
              </Box>
            )}
        </Box>
      )}
    </>
  );
};

export default Contacts;
