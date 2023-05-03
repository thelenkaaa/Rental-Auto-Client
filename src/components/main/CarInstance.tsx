import "./CarInstance.css"
import { Link } from 'react-router-dom';
import React from 'react'

interface Props {
  strImagePath: any,
  strMark: string,
  strPrice: string
}

const CarInstance = (props:Props) => {

  return (
    <Link to="/car"  className="btn car-image-wrapper col-md-4 col-sm-6 col-12">
      <img src={props.strImagePath} alt={props.strMark} />
        <p className="car-name">{props.strMark}</p>
        <p className="car-price">{props.strPrice}$/day</p>
    </Link>
  );
}

export default CarInstance;





