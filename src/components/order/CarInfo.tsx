import React, { useState } from 'react'
import Car1 from "../main/img/image1.jpeg"
import Car from './Car';

const CarInfo = () => {

  const [car] = useState({
    Mark: "Test",
    Category: "Test",
    Price: "Test",
    Transmission: "Gearbox",
    Status: "Available",
    ImagePath: {Car1}
  })

  return (
      <Car
        Mark={car.Mark}
        Category={car.Category}
        Price={car.Price}
        Transmission={car.Transmission}
        Status={car.Status}
        ImagePath={car.ImagePath}
      />
  );
};
export default CarInfo