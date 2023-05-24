import { useState, useEffect } from 'react'
import "./Cars.css"
import './CarsButtons.css';
import CarInstance from './CarInstance'
import { fetch_data } from "../../utils/api";
import { useNavigate } from 'react-router-dom';

// import Car8 from "./img/image8.jpeg"
// import Car8 from "/Users/lenka/Documents/Web/Web-technologies/src/components/main/img/image1.jpeg"
// import Car9 from "./img/image9.webp"

interface Car {
    car_id: number;
    mark: string;
    category: string;
    price: number;
    transmission: string;
    status: string;
    image_path: any;
  }

export const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
      getCars();
    }, []);

    const getCars = async () => {
        const data = await fetch_data("/car/getAll","GET");
        console.log(data)
        setCars(data);
      };

    const getCarsByStatusAvail = async () => {
        const data = await fetch_data("/car/getByStatusAvail","GET");
        clearCars();
        setCars(data);    
    };
    
    const getCarsByStatusUnavail = async () => {
        const data = await fetch_data("/car/getByStatusUnavail","GET");
        clearCars();
        setCars(data);   
    };
    
    const clearCars = async () => {
        setCars([]);
    };

    return (
        <>
            <div className="my-4 d-flex justify-content-center">
                <button className="car-status-button mx-2" onClick={() => getCarsByStatusAvail()}>
                    available
                </button>
                <button className="car-status-button mx-2" onClick={() => getCarsByStatusUnavail()}>
                    unavailable
                </button>
            </div>

            <div className="car-container my-4">
                <div className="row row-cols-3 gy-4 car-list" id="car-list">
                    {cars.map((car) => (
                        <CarInstance
                            key={car.car_id}
                            strMark={car.mark}
                            strPrice={car.price.toString()}
                            strImagePath={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ferrari_Daytona_SP3_front_side_at_CF_2022.jpg/1200px-Ferrari_Daytona_SP3_front_side_at_CF_2022.jpg"}
                            carId={car.car_id}
            
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
