import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
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
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import CompanyForm from "./CompanyForm";
import { useGetCompaniesQuery, useDeleteCompanyMutation } from "states/api";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LoadingImg from "components/LoadingImg";

const Company = ({
  _id,
  name,
  position,
  companySize,
  location,
  websiteURL,
  linkedInURL,
  rating,
  deletedCompany,
  editCompany,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCompany] = useDeleteCompanyMutation();

  const handleEditCompany = () => {
    editCompany(_id);
  };

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(_id);
      deletedCompany();
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
      <CardContent
        mr="1.5rem"
      >
        <Typography variant="h4" fontWeight="700" color={theme.palette.font.main} gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6" fontWeight="500" color={theme.palette.font.light} >
          Available positions: 
        </Typography>
        <Typography variant="h5" fontWeight="500" color={theme.palette.font.main} gutterBottom>
          {position}
        </Typography>
        <Typography variant="h6" fontWeight="500" color={theme.palette.font.light} >
          Company size: 
        </Typography>
        <Typography variant="h5" fontWeight="500" color={theme.palette.font.main} gutterBottom>
          {companySize}
        </Typography>
        <Typography variant="h5" fontWeight="500" color={theme.palette.font.main} gutterBottom components={{ span: "span" }}>
        <span style={{color: theme.palette.font.light, fontSize: "1rem", fontWeight:"500"}}>Location: </span> {location}
        </Typography>
        <Typography variant="h6" fontWeight="500" color={theme.palette.font.light} >
          Company website: 
        </Typography>
        <Typography variant="h5" gutterBottom>
          {websiteURL}
        </Typography>
        <Typography variant="h6" fontWeight="500" color={theme.palette.font.light} >
          LinkedIn: 
        </Typography>
        <Typography variant="h5" gutterBottom>
          {linkedInURL}
        </Typography>
        <Typography variant="h5" fontWeight="500" color={theme.palette.font.main} components={{ span: "span" }}>
        <span style={{color: theme.palette.font.light, fontSize: "1rem", fontWeight:"500"}}>Rating: </span> {rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Box width="90%" ml="5%" mb="0.5rem">
          <FlexBetween>
            <IconButton
              variant="primary"
              size="small"
              onClick={() => {
                handleEditCompany();
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
              <DialogTitle id="confirm-delete-task">Delete company</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this company info?
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
                    handleDeleteCompany();
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

const Companies = () => {
  const theme = useTheme();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:1000px");
  const [isEdit, setIsEdit] = useState("");

  const { data, isLoading, refetch } = useGetCompaniesQuery();

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

  const deleteCompany = () => {
    refetch();
  };

  return (
    <>
      {data || !isLoading ? (
        <Box m="1.5rem 0rem 1.5rem 2.5rem">
          <FlexBetween>
            <Header title="Companies" />
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
                position,
                companySize,
                location,
                websiteURL,
                linkedInURL,
                rating,
              }) => (
                <Company
                  key={_id}
                  _id={_id}
                  name={name}
                  position={position}
                  companySize={companySize}
                  location={location}
                  linkedInURL={linkedInURL}
                  websiteURL={websiteURL}
                  rating={rating}
                  deletedCompany={deleteCompany}
                  editCompany={handleEditForm}
                />
              )
            )}
          </Box>

          {isFormOpen && (
            <CompanyForm
              onClose={() => {
                handleCloseForm();
              }}
              editMode={isEdit}
            />
          )}
        </Box>
      ) : (
        <>
          <Box mt="35%">
            <LoadingImg />
          </Box>
        </>
      )}
    </>
  );
};

export default Companies;
