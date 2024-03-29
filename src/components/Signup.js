import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`https://i-notebook-backend-blue.vercel.app/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,password
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Craeted Successfully",'success');
    }
     else{
      props.showAlert("Invalid Credentials",'danger');
     } 

  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
      <div className="container mt-2">
        <h2 className="mb-4">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
          value={credentials.name}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
          value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          value={credentials.password}
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
          value={credentials.cpassword}
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
