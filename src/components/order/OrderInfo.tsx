import { useState } from 'react'
import { fetch_data_with_error } from "../../utils/error";


const OrderInfo = () => {

  let car_id = getCarIdFromUrlParams()

  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [amount_days, setAmountDays] = useState();
  const [color, setColor] = useState();
  const [renttime, setRent] = useState()

  function getCarIdFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('car_id');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      const response = await fetch_data_with_error('/rental', 'POST', {
        car_id: car_id,
        country: country,
        city: city,
        address: address,
        amount_days: amount_days,
        color: color,
        renttime: renttime
      }, true);
      if (response.status !== 200) {
        alert(response.statusText)
      }
      else{
        alert("Successful order!")
      }
    } catch (error: any) {
        alert(error.message)
  }
  };

  return (
    <div className="order-form col-md-6 col-sm-12 col-12">
            <h3 className="text-center">Rent Now</h3>

            <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Country:</label>
                    <input type="text" 
                    className="form-control"
                    id="Country" 
                    placeholder="Enter your country"
                    value={country}
                    onChange={(event:any) => setCountry(event.target.value)}
                    required/>
                </div>
                <div className="form-grou my-2">
                    <label htmlFor="email">City:</label>
                    <input type="text" 
                    className="form-control" 
                    id="City"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(event:any) => setCity(event.target.value)} 
                    required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="phone">Address:</label>
                    <input type="tel" 
                    className="form-control" 
                    id="address" 
                    placeholder="Enter your adress" 
                    value={address}
                    onChange={(event:any) => setAddress(event.target.value)}
                    required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="phone">Amout of days:</label>
                    <input type="tel" 
                    className="form-control" 
                    id="amount_days"
                    placeholder="Enter amount" 
                    value={amount_days}
                    onChange={(event:any) => setAmountDays(event.target.value)}
                    required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="credit-card">Color</label>
                    <input type="text" 
                    className="form-control" 
                    id="color"
                    placeholder="Enter color of car" 
                    value={color}
                    onChange={(event:any) => setColor(event.target.value)}
                    required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="credit-card">Rent Time</label>
                    <input type="text" 
                    className="form-control" 
                    id="color"
                    placeholder="Enter date" 
                    value={renttime}
                    onChange={(event:any) => setRent(event.target.value)}
                    required/>
                </div>

                <button type="submit" className="custom-button my-2">order now</button>
            </form>
    </div>
  );
};

export default OrderInfo