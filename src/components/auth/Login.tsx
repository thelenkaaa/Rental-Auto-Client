import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { fetch_data } from "../../utils/api";
import { fetch_data_with_error } from "../../utils/error";

const server_url = 'http://localhost:63341';

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try{
            const response = await fetch_data_with_error(
                "/user/login",
                "POST",
                {
                  username: username,
                  password: password,
                },
                false
              );
            console.log(response)
            if (response.status != 200) {
              alert(response.status + ': ' + response.statusText)
            }
            else{
                localStorage.setItem("access_token", response.data.AccessToken);
                navigate("/main")
            }
          } catch (error: any) {
              alert(error.message)
        }
      };
    

    return (
        <>

        <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 my-5">
                <div className="log-in-form text-center">
                    <h3 className="text-center">Log in here</h3>
                    <form className="log-in-form" onSubmit={handleSubmit}>
                        <div className="form-group my-2">
                            <label htmlFor="username">Username:</label>
                            <input type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required 
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="password">Password:</label>
                            <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            />
                        </div>
                        <button type="submit" className="log-in-button my-5" id="login-btn">Log In</button>
                    </form>
                </div>
            </div>
            <div className="background-wrapper col-md-6 col-sm-12 display-flex">
                <div className="d-flex flex-column align-items-center " >
                    <h4 className="text-center my-4">Don't have an account yet?</h4>
                    <p className="my-2">Enter your personal data <br/>and start journey with us!</p>
                    <Link to="/signup" className="btn sign-up-button my-4">Sign Up</Link>

                </div>
            </div>
        </div>
        </>
    );
};

export default LogIn;
