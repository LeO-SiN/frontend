import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
const Noteitem = (props) => {
    const { note } = props
    const context = useContext(NoteContext)
    const {deleteNote} = context;
    
    return (
        <div className="col-md-3">
            <div className="card my-4">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.note_title}</h5>
                        <i className="fa-solid fa-trash-can mx-3" onClick={() =>{deleteNote(note.note_id)}}></i>
                        <i className="fa-solid fa-pencil"></i>
                    </div>
                    <p className="card-text">{note.note_content}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
