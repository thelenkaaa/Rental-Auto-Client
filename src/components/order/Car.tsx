import React from 'react'
import "./Car.css"
import Car1 from "../main/img/image1.jpeg"
import { useParams } from 'react-router-dom';

const carMark = 'Ferrari A'
  

const Car = (props: any) => {
  return (
      <div className="col-md-6 col-sm-12 col-12">
          <h3 className="text-center mb-4">{props.Mark}</h3>  
          <div className="car-image-wrapper-order">
              <img src={Car1} alt="car"/>
          </div>

          <div className="car-description my-2">          
              <button className="car-status-button-order">{props.Status}</button>


              <ul className="car-features my-2">
                  <li><strong>Price:</strong> {props.Price}$ per hour, available discounts</li>
                  <li><strong>Transmission:</strong>{props.Transmission}</li>
              </ul>
          </div>
      </div>
  )
}

export default Car