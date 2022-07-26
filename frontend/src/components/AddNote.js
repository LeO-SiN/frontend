import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const handleClick = () =>{

    }
    const onChange = () =>{

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
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea className="form-control" id="desc" name="desc" rows="3"  onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tags" name="tags" placeholder="Tags" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote