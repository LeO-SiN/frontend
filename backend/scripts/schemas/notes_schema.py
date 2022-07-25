from typing import Optional
from pydantic import BaseModel

class NotesSchema(BaseModel):
    note_title: str
    note_content: str
    tags : Optional[list] = []