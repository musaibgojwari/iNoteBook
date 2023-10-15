import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

export default function NoteItem(props) {
  const context = useContext(NoteContext)
  const {deleteNote } = context
    const {note,updateNote} = props

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div key={note._id} className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i className="mx-2 ri-delete-bin-fill" onClick={() => deleteNote(note._id)}></i>
            <i className="mx-2 ri-edit-box-fill" onClick={() => updateNote(note)}></i>
          </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
    
  )
}
