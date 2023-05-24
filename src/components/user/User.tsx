import React, { useEffect } from "react";
import { fetch_data } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from "./EditUser";
import "./UserInfo.css"
import UserIcon from "../main/img/user_icon.png"


const User = () => {
  const [username, setUsername] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [drive_license, setDrive_license] = React.useState("");

  
  const fetchData = async () => {

    const data = await fetch_data("/user/me", "GET", null, true);
    setUsername(data.username);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPhone(data.phone);
    setDrive_license(data.drive_license);
    localStorage.setItem("user_id", data.user_id);
  };

  const navigate = useNavigate();

  const Update = async (newProps: any) => {
      < UpdateUser Props={newProps} />;
      navigate("/edit");
  };
  const DeleteUser = async () => {
      const data = await fetch_data("/user/deleteMe","DELETE");
      navigate("/login");
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
    <h2 className="text-center my-4">Your Page</h2>

    <div className="col-md-8 user-wrapper mx-auto py-4 shadow-lg p-3 mb-5 bg-white">
        <div className="d-flex justify-content-center align-items-center">            
            <img src={UserIcon} alt='user' width="200" height="190" />
        </div>

        <div className="user-info-wrapper mx-2">

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label d-flex justify-content-start"><strong>Username:</strong></div>
                <div className="user-info-value d-flex justify-content-end">{username}</div>
            </div>

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label"><strong>Name:</strong></div>
                <div className="user-info-value">{first_name}</div>
            </div>

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label"><strong>Surname:</strong></div>
                <div className="user-info-value">{last_name}</div>
            </div>

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label"><strong>Email:</strong></div>
                <div className="user-info-value">{email}</div>
            </div>

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label"><strong>Phone:</strong></div>
                <div className="user-info-value">{phone}</div>
            </div>

            <div className="user-info-row my-2 mx-1">
                <div className="user-info-label"><strong>Driver Licence:</strong></div>
                <div className="user-info-value">{drive_license}</div>
            </div>

        </div>

        <button className="edit-user-button my-2 mx-1"
            onClick={() => Update({username, first_name, last_name, email, phone, drive_license})}>
            edit profile
        </button>       
        <button className="delete-user-button my-2" 
            onClick={() => DeleteUser()}>
            delete profile
        </button>  
    </div>            
</div>
  );
};

export default User;





