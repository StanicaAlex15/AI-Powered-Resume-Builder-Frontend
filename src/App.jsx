import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SubmitCv } from "./pages/SubmitCv";
import { ViewCv } from "./pages/ViewCv";
import { History } from "./pages/History";
import { Navbar } from "./components/Navbar";
import { LoginButton } from "./components/LoginButton";
import { TokenSaver } from "./components/TokenSaver";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div style={styles.centered}>
        <h1>Welcome to Resume Builder</h1>
        <LoginButton />
      </div>
    );
  }

  return (
    <>
      <TokenSaver />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/submit" />} />
        <Route path="/submit" element={<SubmitCv />} />
        <Route path="/view-cv/:uuid" element={<ViewCv />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

const styles = {
  centered: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
