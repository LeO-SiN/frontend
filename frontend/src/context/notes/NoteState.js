import React, { useState } from "react";
import  NoteContext from "./NoteContext.js";

const NoteState = (props) => {
    const notesInitial = [
        {
            "note_title": "My Note",
            "note_content": "Writing the very first note",
            "tags": [
                "first",
                "dev",
                "hemllo Worlmd"
            ],
            "note_id": "ESAH1IL177_JZ5JN",
            "user_id": "ESAH1IL177",
            "created_at": "2022-07-26 13:06:10.555578"
        },
        {
            "note_title": "Second Note",
            "note_content": "Will be completing the application this week itself",
            "tags": [
                "finish",
                "dev",
                "Byme World"
            ],
            "note_id": "ESAH1IL177_W277P",
            "user_id": "ESAH1IL177",
            "created_at": "2022-07-26 13:07:13.867561"
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState