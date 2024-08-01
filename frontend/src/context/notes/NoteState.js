import React, { useState } from "react";
import axios from "axios";

import NoteContext from "./NoteContext.js";

const NoteState = (props) => {
    const host = "http://backend-api.ap-south-1.elasticbeanstalk.com/notes/";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    var myHeaders = new Headers();
    
    const getNotes = async () => {
        var token = localStorage.getItem('token')
        myHeaders.append("Authorization", `Bearer ${token}`);

        const url = host + "find_notes";
        var config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        await axios(config).then(response => { 

            setNotes(response.data.data)
         }).catch((error) => console.log(error));
    }

    // Add note
    const addNote = async (title, description, tag) => {
        var token = localStorage.getItem('token')
        myHeaders.append("Authorization", `Bearer ${token}`);
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
        var token = localStorage.getItem('token')
        myHeaders.append("Authorization", `Bearer ${token}`);
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
        var token = localStorage.getItem('token')
        myHeaders.append("Authorization", `Bearer ${token}`);

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