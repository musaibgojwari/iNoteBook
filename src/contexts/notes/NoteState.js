import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    // console.log("=>",url)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMmZhMDMyYzk4OTY3YTU3N2MzYzI5In0sImlhdCI6MTY5MTU1NDAxOX0.iCy-_n7UB2VfgxHkUv12vt3E5VQaJzemflZb3brVWGE",
      },
    });

    const data = await response.json();
    setNotes(notes.concat(data.notes));
  };

  // Add a note, send the note from the other source which is the form
  const addNotes = async (title, description, tag) => {
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMmZhMDMyYzk4OTY3YTU3N2MzYzI5In0sImlhdCI6MTY5MTU2MDYwMH0.p_EhN1_reAPw-eSONofCVJgkk0DSxThhwE1qKDlnz0g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(notes)) {
        setNotes(notes.concat(data));
      } else {
        console.error("Notes is not an array, resetting:", notes);
        setNotes([data]);
      }
    } else {
      console.error("Error adding note:", await response.text());
    }
  };

  // Delete a note, send the note from the other source which is the form
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMmZhMDMyYzk4OTY3YTU3N2MzYzI5In0sImlhdCI6MTY5MTU1NDAxOX0.iCy-_n7UB2VfgxHkUv12vt3E5VQaJzemflZb3brVWGE",
      },
    });
    const data = await response.json();
    console.log(data);

    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update the note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "YOUR_AUTH_TOKEN_HERE", // replace with your token
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    console.log("response=>", response);
  
    // Creating a new array for updated notes without mutating the original
    const updatedNotes = notes.map(note => {
      if (note._id === id) {
        return {
          ...note,
          title: title,
          description: description,
          tag: tag
        };
      }
      return note;
    });
  
    setNotes(updatedNotes);
  };
  

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
