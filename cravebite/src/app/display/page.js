"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Display() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedData, setUpdatedData] = useState({ fname: "", lname: "" });

  useEffect(() => {
    axios
      .get("/api/display")
      .then((response) => setUsers(response.data.students))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user.student_id);
    setUpdatedData({ fname: user.fname, lname: user.lname });
  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`/api/display/${user.student_id}`);
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.student_id !== user.student_id)
      );
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/display/${editingUserId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.student_id === editingUserId ? { ...user, ...updatedData } : user
        )
      );
      setEditingUserId(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {users.map((user) => (
          <li key={user.student_id}>
            {user.student_id}, {user.fname}, {user.lname}{" "}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingUserId && (
        <div>
          <input
            type="text"
            value={updatedData.fname}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, fname: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedData.lname}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, lname: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingUserId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
