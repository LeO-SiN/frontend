import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "",description:"", tag: ""})
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add Note</h2>
            <form >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" name="title" id="title" placeholder="Note Title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3"  onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" id="tag" placeholder="Tag" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote