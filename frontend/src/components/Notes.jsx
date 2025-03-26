// src/components/Notes.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchNotes = () => {
    axios
      .get("notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`notes/${editNoteId}/`, formData)
      : axios.post("notes/", formData);

    request
      .then(() => {
        setFormData({ title: "", content: "" });
        setIsEditing(false);
        setEditNoteId(null);
        fetchNotes();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content });
    setIsEditing(true);
    setEditNoteId(note.id);
  };

  const handleDelete = (id) => {
    axios.delete(`notes/${id}/`).then(fetchNotes);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Welcome, {username}!</strong>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
        />
        <br />
        <textarea
          name="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Content"
          rows="4"
        />
        <br />
        <button type="submit">{isEditing ? "Update" : "Add"} Note</button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditNoteId(null);
              setFormData({ title: "", content: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
