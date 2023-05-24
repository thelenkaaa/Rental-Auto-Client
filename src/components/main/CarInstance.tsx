import "./CarInstance.css"
import { Link, useNavigate } from 'react-router-dom';
import Car1 from "./img/image1.jpeg"
import Car2 from "./img/image2.jpeg"
import Car3 from "./img/image3.webp"
import Car4 from "./img/image4.jpeg"
import Car5 from "./img/image5.jpeg"
import Car6 from "./img/image6.jpeg"
import Car7 from "./img/image7.jpeg"
import Car8 from "./img/image8.jpeg"
import Car9 from "./img/image9.webp"

interface Props {
  strImagePath: any,
  strMark: string,
  strPrice: string,
  carId: number,
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


const CarInstance = (props:Props) => {
  const navigate = useNavigate();

  return (
    <div className="btn car-image-wrapper col-md-4 col-sm-6 col-12" 
    onClick={() => navigate(`/car?car_id=${props.carId}`)}>
      <img src={carImageMap[props.carId]} 
      alt={props.strMark} />
        <p className="car-name">{props.strMark}</p>
        <p className="car-price">{props.strPrice}$/day</p>
    </div>
  );
}

export default CarInstance;




