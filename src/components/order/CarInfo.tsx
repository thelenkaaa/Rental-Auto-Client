import { useState, useEffect } from 'react'
import Car1 from "../main/img/image1.jpeg"
import Car from './Car';
import { fetch_data } from "../../utils/api";
import { CarProps } from './Car';
import './Car.css';
import { carImageMap } from '../main/CarInstance';

const CarInfo = () => {
  const that_id = getCarIdFromUrlParams();

  const [car, setCar] = useState({
    car_id: 0,
    mark: "",
    category: "",
    price: 0,
    transmission: "",
    status: "",
    image_path: "",
  });

  const fetchDataForUseEffect = async() => {
    await getCarInstance();
  }

  useEffect(() => {
    fetchDataForUseEffect();
  }, []);

  function getCarIdFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('car_id');
  }

  const getCarInstance = async () => {
    const data = await fetch_data(`/car/${that_id}`,"GET", null, true);
    setCar(data);
    console.log(data)
  };

  return (
    <div className="col-md-6 col-sm-12 col-12">
    <h3 className="text-center mb-4">{car.mark}</h3>  
    <div className="car-image-wrapper-order">
        <img src={carImageMap[car.car_id]}  alt="car"/>
    </div>

    <div className="car-description my-2">          
        <button className="car-status-button-order">{car.status}</button>

        <ul className="car-features my-2">
        <li><strong>Price:</strong> {car.price}$ per hour, available discounts</li>
        <li><strong>Transmission:</strong>{car.transmission}</li>
        </ul>
    </div>
    </div>

  );
};
export default CarInfo