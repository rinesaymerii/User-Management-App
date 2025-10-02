import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import UsersList from "./pages/UsersList"
import UserDetails from "./pages/UserDetails"
import AddUser from "./pages/AddUser"

function App() {
  return (
    <Router>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "10px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "40px" }}>
          <Link to="/" style={{ textDecoration: "center", color: "grey" }}>
            User Management App
          </Link>
        </h1>

        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
