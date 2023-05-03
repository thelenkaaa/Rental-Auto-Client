import Order from './Order'
import CarInfo from './CarInfo'

const CarPage = () => {
  return (
    <div>
        <div className="car-container my-4">
            <div className="row row-cols-2 gy-4">
                <CarInfo />
                <Order />
            </div>
        </div>
    </div>
  )
}

export default CarPage