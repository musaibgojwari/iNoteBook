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
          localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    // console.log("Data=>",data)
    // setNotes(notes.concat(notes));
    setNotes(data.notes)
    // console.log("notes=>",notes)
  };

  // Add a note, send the note from the other source which is the form
  const addNotes = async (title, description, tag) => {
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      
      body: JSON.stringify({ title, description, tag }),
    });
    // console.log("notestate",)
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
          localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    // console.log(data);

    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update the note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
