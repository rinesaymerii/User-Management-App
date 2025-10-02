import React, { useState, useEffect } from "react"
import { usersData } from "../data/users"

function UsersList() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [sortAsc, setSortAsc] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userCompany, setUserCompany] = useState("")
  const [msg, setMsg] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)

  useEffect(() => {
    setUsers(usersData)
  }, [])

  function handleSort() {
    const sorted = [...users].sort((a, b) => {
      if (a.name < b.name) return sortAsc ? -1 : 1
      if (a.name > b.name) return sortAsc ? 1 : -1
      return 0
    })
    setUsers(sorted)
    setSortAsc(!sortAsc)
  }

  function openAddModal() {
    setEditingUser(null)
    setUserName("")
    setUserEmail("")
    setUserCompany("")
    setMsg("")
    setShowModal(true)
  }

  function openEditModal(user) {
    setEditingUser(user)
    setUserName(user.name || "")
    setUserEmail(user.email || "")
    setUserCompany(user?.company?.name || "")
    setMsg("")
    setShowModal(true)
  }

  function saveUser(e) {
    e.preventDefault()
    if (!userName || !userEmail) {
      setMsg("Name and email are required")
      return
    }
    if (!userEmail.includes("@")) {
      setMsg("Email must contain '@'")
      return
    }

    if (editingUser) {
      setUsers(
        users.map(u =>
          u.id === editingUser.id
            ? { ...u, name: userName, email: userEmail, company: { name: userCompany } }
            : u
        )
      )
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      const newUser = {
        id: newId,
        name: userName,
        email: userEmail,
        address: { street: "", suite: "", city: "", zipcode: "" },
        phone: "",
        website: "",
        company: { name: userCompany },
      }
      setUsers([newUser, ...users])
    }

    setShowModal(false)
    setEditingUser(null)
    setUserName("")
    setUserEmail("")
    setUserCompany("")
    setMsg("")
  }

  function confirmDelete(user) {
    setDeleteUser(user)
    setShowDeleteModal(true)
  }

  function handleDelete() {
    if (!deleteUser) return
    setUsers(users.filter(u => u.id !== deleteUser.id))
    setShowDeleteModal(false)
    setDeleteUser(null)
  }

  function cancelDelete() {
    setShowDeleteModal(false)
    setDeleteUser(null)
  }

  const filtered = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search:"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "6px 8px", border: "1px solid #050505ff", borderRadius: "4px" }}
        />
        <button
          onClick={handleSort}
          style={{ padding: "6px 10px", border: "1px solid #050505ff", borderRadius: "4px", background: "white", cursor: "pointer" }}
        >
          Sort by Name
        </button>
        <button
          onClick={openAddModal}
          style={{ padding: "6px 10px", borderRadius: "4px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
        >
          Add User
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #050505ff", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #050505ff", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #050505ff", padding: "8px" }}>Company</th>
            <th style={{ border: "1px solid #050505ff", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={{ borderBottom: "1px solid #050505ff" }}>
              <td
                style={{ border: "1px solid #050505ff", padding: "8px", color: "blue", textDecoration: "underline", cursor: "pointer" }}
                onClick={() => { setSelectedUser(u); setShowUserModal(true) }}
              >
                {u.name}
              </td>
              <td style={{ border: "1px solid #050505ff", padding: "8px" }}>{u.email}</td>
              <td style={{ border: "1px solid #050505ff", padding: "8px" }}>{u.company?.name}</td>
              <td style={{ border: "1px solid #050505ff", padding: "8px" }}>
                <button
                  onClick={() => openEditModal(u)}
                  style={{ padding: "4px 8px", marginRight: "6px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Update
                </button>
                <button
                  onClick={() => confirmDelete(u)}
                  style={{ padding: "4px 8px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "420px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}>
            <h2 style={{ marginTop: 0 }}>{editingUser ? "Edit User" : "Add User"}</h2>
            {msg && <p style={{ color: "red" }}>{msg}</p>}
            <form onSubmit={saveUser} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Name"
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <input
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                placeholder="Email"
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <input
                value={userCompany}
                onChange={e => setUserCompany(e.target.value)}
                placeholder="Company"
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" }}>
                <button type="button" onClick={() => { setShowModal(false); setEditingUser(null); }} style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "8px 12px", borderRadius: "4px", border: "none", background: "#4CAF50", color: "white", cursor: "pointer" }}>
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}>
            <h2 style={{ marginTop: 0 }}>Delete User</h2>
            <p>Are you sure you want to delete <strong>{deleteUser?.name}</strong>?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <button onClick={cancelDelete} style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleDelete} style={{ padding: "8px 12px", borderRadius: "4px", border: "none", background: "red", color: "white", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showUserModal && selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            width: "420px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              {selectedUser.name}
            </h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Company:</strong> {selectedUser.company?.name || "N/A"}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
            <p><strong>Website:</strong> {selectedUser.website || "N/A"}</p>
            <p><strong>Address:</strong> {selectedUser.address?.street}, {selectedUser.address?.city}</p>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => setShowUserModal(false)}
                style={{
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#1976d2",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersList
