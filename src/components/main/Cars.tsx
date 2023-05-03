import React, { useState } from 'react'
import "./Cars.css"
import Car1 from "./img/image1.jpeg"
import Car2 from "./img/image2.jpeg"
import Car3 from "./img/image3.webp"
import Car4 from "./img/image4.jpeg"
import Car5 from "./img/image5.jpeg"
import Car6 from "./img/image6.jpeg"
import Car7 from "./img/image7.jpeg"
import Car8 from "./img/image8.jpeg"
import Car9 from "./img/image9.webp"

import CarInstance from './CarInstance'

export const Cars = () => {
    const [cars] = useState([
        {
            strMark : "Ferrari A",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car1
        },
        {
            strMark : "Ferrari B",
            strCategory : "Smth",
            strPrice : "1000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car2
        },
        {
            strMark : "Ferrari C",
            strCategory : "Smth",
            strPrice : "1500",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car3
        },
        {
            strMark : "Ferrari A",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car4
        },
        {
            strMark : "Ferrari A",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car5
        },
        {
            strMark : "Ferrari A",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car6
        },
        {
            strMark : "Ferrari B",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car7
        },
        {
            strMark : "Ferrari C",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car8
        },
        {
            strMark : "Ferrari A",
            strCategory : "Smth",
            strPrice : "2000",
            strTransmission : "Automatic",
            strStatus : "Available",
            strImagePath : Car9
        }
    ]);

    // const history = useHistory();
    // const [selectedCar, setSelectedCar] = useState(null);
  
    // const handleCarClick = (car) => {
    //   setSelectedCar(car);
    //   history.push(`/car/${car.strMark}`);
    // };

    return (
        <div className="car-container my-4">
          <div className="row row-cols-3 gy-4 car-list" id="car-list">
  
            {cars.map((car, index) => (
                <CarInstance
                    key={index}
                    strMark={car.strMark}
                    strPrice={car.strPrice}
                    strImagePath={car.strImagePath}
                />
            ))}
  
          </div>
        </div>
    );
}