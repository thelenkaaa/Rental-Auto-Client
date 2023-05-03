import "./UserInfo.css"
import React from 'react'
import UserIcon from "../main/img/user_icon.png"

const UserInfo = (props: any) => {
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
                        <div className="user-info-value d-flex justify-content-end">{props.Username}</div>
                    </div>

                    <div className="user-info-row my-2 mx-1">
                        <div className="user-info-label"><strong>Name:</strong></div>
                        <div className="user-info-value">{props.Name}</div>
                    </div>

                    <div className="user-info-row my-2 mx-1">
                        <div className="user-info-label"><strong>Surname:</strong></div>
                        <div className="user-info-value">{props.Surname}</div>
                    </div>

                    <div className="user-info-row my-2 mx-1">
                        <div className="user-info-label"><strong>Email:</strong></div>
                        <div className="user-info-value">{props.Email}</div>
                    </div>

                    <div className="user-info-row my-2 mx-1">
                        <div className="user-info-label"><strong>Phone:</strong></div>
                        <div className="user-info-value">{props.Phone}</div>
                    </div>

                    <div className="user-info-row my-2 mx-1">
                        <div className="user-info-label"><strong>Driver Licence:</strong></div>
                        <div className="user-info-value">{props.DriverLicence}</div>
                    </div>

                </div>

                <button className="edit-user-button my-2 mx-1">edit profile</button>       
                <button className="delete-user-button my-2">delete profile</button>  
            </div>            
        </div>
    );
  };
  
export default UserInfo;

