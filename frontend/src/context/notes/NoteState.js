import React, { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props) => {
    const host = "http://localhost/notes/";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNheWVkaW1yYW4wMDc4NkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiRVNBSDFJTDE3NyIsImV4cCI6MTY1OTE1NTk4Mn0.19ezSVv0jI1Q8RQKeUJyPqkoBcsSQ3pKWNPLmVPAmuY");
    const getNotes = async () => {

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const url = host + "find_notes";

        const response = await fetch(url, requestOptions)
            .then(response => response.json())
        // .then(result => console.log(result.data))
        // .catch(error => console.log('error', error));
        // console.log(response.data)
        setNotes(response.data)
    }

    // Add note
    const addNote = async (title, description, tag) => {
        const url = host + "create_note";
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title": title,
            "description": description,
            "tag": tag
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        await fetch(url, requestOptions)
            .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

        const note = {
            "title": title,
            "description": description,
            "tag": tag,
            "note_id": "ESAH1IL177_W7P",
            "user_id": "ESAH1IL177",
            "created_at": "2022-07-26 13:07:13.867561"

        };
        setNotes(notes.concat(note))
    }
    // Edit Note
    const editNote = async (id, title, description, tag) => {
        const url = host + `update_note/${id}`
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "title": title,
            "description": description,
            "tag": tag
        });
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        await fetch(url, requestOptions)
            .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element.note_id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            setNotes(newNotes);

        }
    }
    // Delete Note
    const deleteNote = async (id) => {

        const url = host + `delete_note/${id}`

        await fetch(url, {
            method: 'DELETE',
            headers: myHeaders,

        }).then(response => response.json());
        setNotes(notes.filter(note => (note.note_id !== id)));
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState