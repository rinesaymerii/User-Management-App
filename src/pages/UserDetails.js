import React from "react";
import { useParams, Link } from "react-router-dom";
import { usersData } from "../data/users";

function UserDetails() {
  const { id } = useParams();
  const user = usersData.find(u => u.id === parseInt(id));

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default UserDetails;
