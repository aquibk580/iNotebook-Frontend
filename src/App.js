import "./App.css";
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Home showAlert={showAlert}/>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <About showAlert={showAlert}/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Login showAlert={showAlert}/>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Signup showAlert={showAlert} />
        </>
      ),
    },
  ]);
  return (
    <>
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App;
