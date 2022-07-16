from typing import Optional
from pydantic import BaseModel

class PostsSchema(BaseModel):
    note_title: str
    note_content: str
    published: bool = True
    tags : Optional[list] = []