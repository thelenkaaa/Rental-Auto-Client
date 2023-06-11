import "./UserInfo.css";
import UserIcon from "../main/img/user_icon.png";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import { fetch_data_with_error } from "../../utils/error";


export const UpdateUser = (props: any) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(props.Username || "");
    const [name, setName] = useState(props.Name || "");
    const [surname, setSurname] = useState(props.Surname || "");
    const [email, setEmail] = useState(props.Email || "");
    const [phone, setPhone] = useState(props.Phone || "");
    const [driverLicence, setDriverLicence] = useState(props.DriverLicence || "");


    const handleUsernameChange = (event: any) => {
      setUsername(event.target.value);
    };
  
    const handleNameChange = (event: any) => {
      setName(event.target.value);
    };
  
    const handleSurnameChange = (event: any) => {
      setSurname(event.target.value);
    };
  
    const handleEmailChange = (event: any) => {
      setEmail(event.target.value);
    };
  
    const handlePhoneChange = (event: any) => {
      setPhone(event.target.value);
    };
  
    const handleDriverLicenceChange = (event: any) => {
      setDriverLicence(event.target.value);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isNaN(Number(phone))){
            window.alert('400: "phone: [Not a valid integer.]}')
            return
        }

        try{
            const response = await fetch_data_with_error("/user/updateMe", "PUT", {
                username : username,
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                drive_license: driverLicence,
              });
            if (response.status != 200) {
            window.alert(response.status + ': ' + response.statusText)
            }
            else{
                navigate("/user")
            }
        } catch (error: any) {
            window.alert(error.code+ error.message)
        }
        };

  
    return (
      <div className="container">
        <h2 className="text-center my-4">Your Page</h2>
  
        <div className="col-md-8 user-wrapper mx-auto py-4 shadow-lg p-3 mb-5 bg-white">
          <div className="d-flex justify-content-center align-items-center">
            <img src={UserIcon} alt="user" width="200" height="190" />
          </div>
  
          <div className="user-info-wrapper mx-2">

            <form onSubmit={handleSubmit}>
            <div className="user-info-row my-2 mx-1" >
              <div className="user-info-label">
                <strong>Username:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="form-control"
                />
              </div>
            </div>
  
            <div className="user-info-row my-2 mx-1">
              <div className="user-info-label">
                <strong>Name:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="user-info-row my-2 mx-1">
              <div className="user-info-label">
                <strong>Surname:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={surname}
                  onChange={handleSurnameChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="user-info-row my-2 mx-1">
              <div className="user-info-label">
                <strong>Email:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="user-info-row my-2 mx-1">
              <div className="user-info-label">
                <strong>Phone:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="form-control"
                  data-testid="phone-input"
                />
              </div>
            </div>

            <div className="user-info-row my-2 mx-1">
              <div className="user-info-label">
                <strong>Driver Licence:</strong>
              </div>
              <div className="user-info-value">
                <input
                  type="text"
                  value={driverLicence}
                  onChange={handleDriverLicenceChange}
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" className="edit-user-button my-2 mx-1">
                Save Changes
            </button>
            </form>
          </div>
          
          </div>
          </div>
    )};


