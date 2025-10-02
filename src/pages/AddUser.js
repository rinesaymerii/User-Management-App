import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { usersData } from "../data/users"

function AddUser() {
  const go = useNavigate()
  const location = useLocation()
  const editingUser = location.state?.user || null

  const [name, setName] = useState(editingUser ? editingUser.name : "")
  const [email, setEmail] = useState(editingUser ? editingUser.email : "")
  const [company, setCompany] = useState(editingUser ? editingUser.company.name : "")
  const [msg, setMsg] = useState("")

  function saveUser(e) {
    e.preventDefault()

    if (name === "" || email === "") {
      setMsg("Name and email need to be filled")
      return
    }
    if (!email.includes("@")) {
      setMsg("Email must contain '@'")
      return
    }

    if (editingUser) {
      const index = usersData.findIndex(u => u.id === editingUser.id)
      if (index !== -1) {
        usersData[index] = {
          ...usersData[index],
          name,
          email,
          company: { name: company }
        }
      }
    } else {
      const newUser = {
        id: Date.now(),
        name,
        email,
        address: { street: "", suite: "", city: "", zipcode: "" },
        phone: "",
        website: "",
        company: { name: company }
      }
      usersData.unshift(newUser)
    }

    go("/")
  }

  return (
    <div>
      <h2>{editingUser ? "Update User" : "Add User"} Page</h2>
      <p style={{ color: "red" }}>{msg}</p>
      <form onSubmit={saveUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <br />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="company"
        />
        <br />
        <button>{editingUser ? "Update" : "Add"}</button>
      </form>
    </div>
  )
}

export default AddUser
