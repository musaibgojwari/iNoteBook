import React, {useContext , useState} from 'react'
import NoteContext from '../contexts/notes/NoteContext';

export default function AddNote() {

    const context = useContext(NoteContext);
    const {addNotes} = context

    const [note, setNotes] = useState({
        title:"",
        description:"",
        tag:""
    })

    const handleClick = (e) => {
      e.preventDefault();
      console.log("Values to be passed to addNotes:", note.title, note.description, note.tag);
      addNotes(note.title, note.description, note.tag);
      setNotes({ title: "", description: "", tag: "" });
  }
  

    const handleChange = (e) => {
        e.preventDefault();

        setNotes({
            ...note,
            [e.target.name]:e.target.value
        })
    }

  return (
    <div className="my-2">
      <h2 className="container">Add Note</h2>

      <div className="container my-4">
        <form>
          <div className="form-group">
            <label htmlFor="title" name="title" >Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Enter Title"
              onChange={handleChange}
              value={note.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              placeholder="Add Description"
              onChange={handleChange}
              value={note.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              placeholder="Add a Tag"
              onChange={handleChange}
              value={note.tag}
            />
          </div>

          <button type="submit" onClick={handleClick} className="btn btn-primary my-2">
            Add note
          </button>

        </form>
      </div>
    </div>
  )
}
