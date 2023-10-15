import React, { useContext, useEffect,useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useRef } from "react";
export default function Note() {

  var context = useContext(NoteContext);
  const {notes,getNotes,editNote,deleteNote} = context
  
  const [note, setNotes] = useState({
    id:"",
    etitle:"",
    edescription:"",
    etag:""
    })
  const ref = useRef(null)

  const updateNote = (currentnote) => {
    ref.current.click()
    setNotes({eid:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    console.log("clicked note id",currentnote._id)
  }

    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.eid,note.etitle,note.edescription,note.etag)
        console.log(note.eid)
        console.log("gone from here")
    }

    const handleChange = (e) => {
        e.preventDefault();

        setNotes({
            ...note,
            [e.target.name]:[e.target.value]
        })
    }

  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])
  
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
          <div className="form-group">
            <label htmlFor="etitle" name="etitle" >Title</label>
            <input
              type="text"
              className="form-control"
              name="etitle"
              id="etitle"
              value={note.etitle}
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              name="edescription"
              id="description"
              value={note.edescription}
              placeholder="Add Description"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              name="etag"
              id="tag"
              value={note.etag}
              placeholder="Add a Tag"
              onChange={handleChange}
            />
          </div>
        </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Update Note</button>
                </div>
                </div>
            </div>
            </div>
            <div className="row my-3">
              <div className="container">
                {notes.length === 0 && 'No notes to display. Please add some'}
              </div>
                
                {notes && notes.map( (note) => {
                    return (
                        <NoteItem key={note._id} note={note} updateNote={updateNote} deleteNote={deleteNote} />
                    )
                })}
        </div>
        </>
    )
}