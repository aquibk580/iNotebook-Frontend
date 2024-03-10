import React, { useContext, useEffect, useRef,useState } from "react";
import { useNavigate } from 'react-router-dom'
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note,setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
  };
  const handleClick = (e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container">
        <AddNote showAlert={props.showAlert}/>

        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {" "}
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      value={note.etitle}
                      required 
                      minLength={5}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      description
                    </label>
                    <input
                      type="text"
                      name="edescription"
                      className="form-control"
                      id="edescription"
                      value={note.edescription}
                      required 
                      minLength={5}
                      onChange={onChange}    
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      name="etag"
                      className="form-control"
                      id="etag"
                      value={note.etag}
                      required 
                      minLength={5}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <h2>Your notes</h2>
          <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
