import React from 'react'
import "./CarsButtons.css"

export const AvailButton = () => {
  return (
    <div className="my-4 d-flex justify-content-center">
        <button className="car-status-button mx-2">available</button>
        <button className="car-status-button mx-2">unavailable</button>
    </div>
  )
}