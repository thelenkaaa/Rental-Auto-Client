export interface CarProps {
    mark: string;
    category: string;
    price: number;
    transmission: string;
    status: string;
    image_path: string;
  }  
  
const Car = (props: CarProps) => {
return (
    <div className="col-md-6 col-sm-12 col-12">
    <h3 className="text-center mb-4">{props.mark}</h3>  
    <div className="car-image-wrapper-order">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ferrari_Daytona_SP3_front_side_at_CF_2022.jpg/1200px-Ferrari_Daytona_SP3_front_side_at_CF_2022.jpg" alt="car"/>
    </div>

    <div className="car-description my-2">          
        <button className="car-status-button-order">{props.status}</button>

        <ul className="car-features my-2">
        <li><strong>Price:</strong> {props.price}$ per hour, available discounts</li>
        <li><strong>Transmission:</strong>{props.transmission}</li>
        </ul>
    </div>
    </div>
)
}

  export default Car;
  