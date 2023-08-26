import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Login from "scenes/login";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Applications from "scenes/applications";
import Tasks from "scenes/tasks";
import Companies from "scenes/companies";
import Contacts from "scenes/contacts";
import Application from "scenes/applications/Application";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  const mode = useSelector((state) => state.auth.mode); // grabbing state from global mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // passing into createTheme fx of material UI
  const isAuth = Boolean(useSelector((state) => state.auth.token)); // grabbing state from global token

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={isAuth ? <Layout /> : <Navigate to="/" />}>
                {/* every single page will have all the components wrapped between the route */}
                <Route
                  path="/dashboard"
                  element={isAuth ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                  path="/applications"
                  element={isAuth ? <Applications /> : <Navigate to="/" />}
                />
                <Route
                  path="/applications/:appId"
                  element={isAuth ? <Application /> : <Navigate to="/" />}
                />
                <Route
                  path="/tasks"
                  element={isAuth ? <Tasks /> : <Navigate to="/" />}
                />
                <Route
                  path="/companies"
                  element={isAuth ? <Companies /> : <Navigate to="/" />}
                />
                <Route
                  path="/contacts"
                  element={isAuth ? <Contacts /> : <Navigate to="/" />}
                />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
