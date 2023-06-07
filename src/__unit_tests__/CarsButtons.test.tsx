import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Cars } from '../components/main/Cars';
import { fetch_data } from '../utils/api';

jest.mock('../utils/api', () => ({
  fetch_data: jest.fn(),
}));

describe('Cars', () => {
  test('should fetch all cars', async () => {
    const mockCars = [
      {
        car_id: 1,
        mark: 'Ferrari',
        category: 'Sports',
        price: 100000,
        transmission: 'Automatic',
        status: 'available',
        image_path: 'image_path',
      },
    ];

    (fetch_data as jest.Mock).mockResolvedValue(mockCars);

    await act(async () => {
      render(
        <BrowserRouter>
          <Cars />
        </BrowserRouter>
      );
    });

    expect(fetch_data).toHaveBeenCalledWith('/car/getAll', 'GET');
    await screen.findByText('Ferrari');
  });

  test('should fetch cars by status "available"', async () => {
    const mockCars = [
      {
        car_id: 1,
        mark: 'Ferrari',
        category: 'Sports',
        price: 100000,
        transmission: 'Automatic',
        status: 'available',
        image_path: 'image_path',
      },
    ];

    (fetch_data as jest.Mock).mockResolvedValue(mockCars);

    await act(async () => {
      render(
        <BrowserRouter>
          <Cars />
        </BrowserRouter>
      );
    });

    const availableButton = screen.getByText('available');
    fireEvent.click(availableButton);

    expect(fetch_data).toHaveBeenCalledWith('/car/getByStatusAvail', 'GET');
    await screen.findByText('Ferrari');
  });

  test('should fetch cars by status "unavailable"', async () => {
    const mockCars = [
      {
        car_id: 2,
        mark: 'Lamborghini',
        category: 'Sports',
        price: 150000,
        transmission: 'Automatic',
        status: 'unavailable',
        image_path: 'image_path',
      },
    ];

    (fetch_data as jest.Mock).mockResolvedValue(mockCars);

    await act(async () => {
      render(
        <BrowserRouter>
          <Cars />
        </BrowserRouter>
      );
    });

    const unavailableButton = screen.getByText('unavailable');
    fireEvent.click(unavailableButton);

    expect(fetch_data).toHaveBeenCalledWith('/car/getByStatusUnavail', 'GET');
    await screen.findByText('Lamborghini');
  });

  

});
