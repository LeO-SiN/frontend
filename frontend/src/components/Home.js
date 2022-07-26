import React, { useContext } from 'react'
import NoteContext from "../context/notes/NoteContext.js";

function Home() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <>
            <div className='container my-3'>
                <h2>Add Note</h2>
                <form >
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Note Title</label>
                        <input type="text" className="form-control" id="noteid" placeholder="Note Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Note Content</label>
                        <textarea className="form-control" id="note" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" placeholder="Tags" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className='container my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map((note)=>{
                        return note.note_title
                    })
                }
            </div>
        </>
    )
}

export default Home