import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetApplicationsQuery,
  useDeleteApplicationMutation,
} from "states/api";
import { setApplications, delApplications } from "states";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  IconButton
} from "@mui/material";
import Header from "components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AppForm from "./AppForm";
import FlexBetween from "components/FlexBetween";
import CustomNoRowsOverlay from "components/CustomNoRowsOverlay";
import { useNavigate  } from "react-router-dom";


const Applications = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const applications = useSelector((state) => state.auth.applications);
  const mode = useSelector((state) => state.auth.mode);
  const isLightMode = mode === "light";
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading } = useGetApplicationsQuery();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [delApplication] = useDeleteApplicationMutation();


  useEffect(() => {
    const getApplication = async () => {
      try {
        if (applications.length === 0 && data) {
          dispatch(setApplications({ applications: data }));
        } 
      } catch (error) {
        alert(error);
      }
    };
    getApplication();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]); 

  const deleteApp = async () => {
    try {
      const deleted = await delApplication({ appIds: rowSelectionModel });
    if (deleted) {
      dispatch(delApplications({ applications: rowSelectionModel }));
    }
    } catch (error) {
      alert(error)
    }
  };

  const handleDelete = () => {
    deleteApp();
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  
  const handleEditApplication = (appId) => {
    navigate(`/applications/${appId}`);
  };

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
      field: "department",
      headerName: "Department",
      flex: 0.6,
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
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.55,
      renderCell: (params) => {
        const dateStr = params.value;
        const formattedDate = new Date(dateStr).toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.2,
      valueGetter: (params) => params.row._id,
      renderCell: (params) => {
        return (
          <IconButton
            variant="contained"
            onClick={() => handleEditApplication(params.row._id)}
          >
            <EditOutlinedIcon sx={{color: theme.palette.primary.main}}/>
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 0rem 0rem 2.5rem">
      <FlexBetween>
        <Header title="Applications" />
        {!isFormOpen && (
          <Box pr="4rem">
            {rowSelectionModel.length > 0 && (
              <Button
                variant="contained"
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => handleDelete()}
                sx={{
                  p: "0.5rem 1rem",
                  backgroundColor: "#FF3D6E",
                  color: theme.palette.background.alt,
                  borderRadius: "0.625rem",
                  mr: "1rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  boxShadow: "none",
                  "&:hover": {
                    color: "#FF295E",
                    backgroundColor: theme.palette.primary.light,
                    boxShadow: "none",
                  },
                }}
              >
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenForm()}
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
        )}
      </FlexBetween>

      <Box
        height="90vh"
        width="96%"
        pt="1rem"
        pl="0.5rem"
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
        <DataGrid
          rows={applications || []}
          columns={columns}
          loading={isLoading || !applications}
          getRowId={(row) => row._id}
          rowHeight={55}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setRowSelectionModel(ids);
          }}
          slots={{
            toolbar: () => {
              return <GridToolbarQuickFilter sx={{ width: "14rem" }} />;
            },
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              quickFilterProps: { debounceMs: 1000 },
            },
          }}
        />
      </Box>

      <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="35rem">
        <AppForm handleCloseForm={handleCloseForm} />
      </Dialog>
    </Box>
  );
};

export default Applications;
