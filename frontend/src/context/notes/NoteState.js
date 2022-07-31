import React, { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props) => {
    const host = "http://localhost/notes/";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    var myHeaders = new Headers();
    var token = localStorage.getItem('token')
    myHeaders.append("Authorization", `Bearer ${token}`);
    const getNotes = async () => {

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const url = host + "find_notes";
        

        const response = await fetch(url, requestOptions)
        const json = await response.json()
        setNotes(json.data)
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
        const response = await fetch(url, requestOptions)
        const json = await response.json()
        setNotes(notes.concat(json))
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

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element.note_id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
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