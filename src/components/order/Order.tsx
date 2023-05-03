import React from 'react'

const Order = (props:any) => {
  return (
    <div className="order-form col-md-6 col-sm-12 col-12">
            <h3 className="text-center">Rent Now</h3>

            <form className="order-form">
                <div className="form-group my-2">
                    <label htmlFor="name">Country:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your country" required/>
                </div>
                <div className="form-grou my-2">
                    <label htmlFor="email">City:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your city" required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="phone">Address:</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter your adress" required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="phone">Amout of days to rent:</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter amount" required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="credit-card">Color</label>
                    <textarea className="form-control" id="credit-card" placeholder="Enter color of the car" required></textarea>
                </div>

                <button type="submit" className="custom-button my-2">order now</button>
            </form>
  </div>
  )
}

export default Order