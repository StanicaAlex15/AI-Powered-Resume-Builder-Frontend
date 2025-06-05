import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>ResumeBuilder</h2>
      <div style={styles.links}>
        <Link to="/submit" style={styles.link}>
          Submit CV
        </Link>
        <Link to="/history" style={styles.link}>
          History
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#007bff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
