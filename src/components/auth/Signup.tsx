import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetch_data } from "../../utils/api";
import { fetch_data_with_error } from "../../utils/error";

const SignUp = () => {
  const server_url = 'http://localhost:63341';


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [driverLicence, setDriverLicence] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      const response = await fetch_data_with_error('/user/user', 'POST', {
      username: username,
      password: password,
      first_name: name,
      last_name: surname,
      email: email,
      phone: phone,
      drive_license: driverLicence
      }, false);
      if (response.status != 200) {
        alert(response.statusText)
      }
      else{
        alert("Successful authorization!")
        navigate("/login")
      }
    } catch (error: any) {
        alert(error.message)
  }
    
  };
  
    return (
        <>
        <div className="row align-items-center">
            <div className="col-md-6 col-sm-12">

              <div className="sign-up-form text-center">

                <form className="sign-up-form" onSubmit={handleSubmit}>
                  <h3 className="text-center">Sign up here</h3>
                  <div className="form-group my-2">
                    <label htmlFor="email">Email:</label>
                    <input type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="email">Username:</label>
                    <input type="username" 
                    className="form-control" 
                    id="username" 
                    placeholder="Enter your username" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="email">Name:</label>
                    <input type="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="email">Surname:</label>
                    <input type="surname" 
                    className="form-control" 
                    id="surname" 
                    placeholder="Enter your surname" 
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="email">Phone:</label>
                    <input type="phone" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Enter your phone" 
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="email">Driver Licence:</label>
                    <input type="driverLicence" 
                    className="form-control" 
                    id="driverLicence" 
                    placeholder="Enter your licence" 
                    value={driverLicence}
                    onChange={(event) => setDriverLicence(event.target.value)}                   
                    required/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required/>
                  </div>
                  <button type="submit" className="log-in-button my-3">Sign up</button>

                </form>
              </div>
            </div>

            <div className="background-wrapper col-md-6 col-sm-12 display-flex" >
              <div className="d-flex flex-column align-items-center" >
                <h4 className="text-center my-4">Already have account?</h4>
                <p className="my-2">Log into system!</p>
                <Link to="/login" className="btn sign-up-button my-4">Log in</Link>
              </div>
            </div>
          </div>
        </>
    );
};

export default SignUp;
