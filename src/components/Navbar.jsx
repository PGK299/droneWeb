import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: isActive ? "#fff" : "#111",
  background: isActive ? "#111" : "transparent",
  border: "1px solid #ccc",
  marginRight: 8,
});

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">Drone Console</div>
        <nav>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/config" style={linkStyle}>
            View Config
          </NavLink>
          <NavLink to="/log" style={linkStyle}>
            Log Temperature
          </NavLink>
          <NavLink to="/logs" style={linkStyle}>
            View Logs
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
