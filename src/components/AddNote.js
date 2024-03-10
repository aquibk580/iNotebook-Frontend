import React, {useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=>{
      addNote(note.title,note.description,note.tag);
      e.preventDefault();
      setNote({title: "", description: "", tag: "default"})
      props.showAlert("Note Added Successfully","success");
    }
    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
       <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            minLength={5}
            required
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            minLength={5}
            required
            id="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            className="form-control"
            minLength={5}
            required
            id="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
