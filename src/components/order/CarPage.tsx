import OrderInfo from './OrderInfo';
import CarInfo from './CarInfo'

const CarPage = () => {


  
  // function CarDetails() {
  //   const [carId, setCarId] = useState<string | null>(null);
  
  //   useEffect(() => {
  //     const id = getCarIdFromUrlParams();
  //     if (id !== null) {
  //       setCarId(id);
  //     }
  //   }, []);
  
  //   if (carId === null) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <div>
  //       <h1>Car Details</h1>
  //       <p>Car ID: {carId}</p>
  //       {/* Render the rest of the car details here */}
  //     </div>
  //   );
  // }


  return (
    <div>
        <div className="car-container my-4">
            <div className="row row-cols-2 gy-4">
                <CarInfo />
                <OrderInfo />
            </div>
        </div>
    </div>
  )
}

export default CarPage