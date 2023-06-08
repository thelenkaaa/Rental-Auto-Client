import React, { useEffect } from "react";
import { fetch_data } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from "./EditUser";
import "./UserInfo.css"
import UserIcon from "../main/img/user_icon.png"

import Car1 from "../main/img/image1.jpeg"
import Car2 from "../main/img/image2.jpeg"
import Car3 from "../main/img/image3.webp"
import Car4 from "../main/img/image4.jpeg"
import Car5 from "../main/img/image5.jpeg"
import Car6 from "../main/img/image6.jpeg"
import Car7 from "../main/img/image7.jpeg"
import Car8 from "../main/img/image8.jpeg"
import Car9 from "../main/img/image9.webp"

interface Car {
    car_id: number;
    category: string;
    image_path: any;
    mark: string;
    price: number;
    status: string;
    transmission: string;
  }

  export const carImageMap: { [key: number]: string } = {
    1: Car1,
    2: Car2,
    3: Car3,
    4: Car4,
    5: Car5,
    6: Car6,
    7: Car7,
    8: Car8,
    9: Car9
  };

const User = () => {
  const [username, setUsername] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [drive_license, setDrive_license] = React.useState("");

  const [cars, setCars] = React.useState<Car[]>([]);
  
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

    const fetchCars = async () => {
        try {
            const data = await fetch_data("/rental/getRentedCars", "GET", null, true);
            setCars(data.cars); 
            console.log(data);
        } catch (error) {
            console.error("Error fetching user's cars:", error);
        }
    };

  useEffect(() => {
    fetchData();
    fetchCars();
  }, []);

  return (
    <div className="container">
        <h2 className="text-center my-4">My Page</h2>

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

        <div className='car-container text-center'>
        <h3>My Rented Cars:</h3>
            <div className="row gy-4 my-3 car-list" id="car-list">
                {cars.map((car) => (
                <div key={car.car_id} className="my-2 btn car-image-wrapper col-md-4 col-sm-12 col-6"
                onClick={() => navigate(`/car?car_id=${car.car_id}`)}>
                    <img src={carImageMap[car.car_id]} alt={car.mark} />
                    <p className="car-name">{car.mark}</p>
                    <p className="car-price">{car.price}$/day</p>
                </div>
            ))}
            </div>

      </div>
</div>
  );
};

export default User;
