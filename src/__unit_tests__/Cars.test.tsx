import { render, screen, fireEvent, act } from '@testing-library/react';
import { Cars } from '../components/main/Cars';
import { carImageMap } from '../components/main/CarInstance';
import CarInstance from '../components/main/CarInstance';
import { fetch_data } from '../utils/api';
import { useNavigate } from 'react-router-dom';

jest.mock('../utils/api', () => ({
  fetch_data: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Cars', () => {
  const mockCars = [
    {
      car_id: 1,
      mark: 'Car 1',
      category: 'Category 1',
      price: 100,
      transmission: 'Automatic',
      status: 'Available',
      image_path: 'image1.jpeg',
    },
    {
      car_id: 2,
      mark: 'Car 2',
      category: 'Category 2',
      price: 200,
      transmission: 'Manual',
      status: 'Unavailable',
      image_path: 'image2.jpeg',
    },
  ];

  beforeEach(() => {
    (fetch_data as jest.Mock).mockResolvedValue(mockCars);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display car details in the CarInstance component', async () => {
    await act(async () => {
        render(<CarInstance strMark="Car 1" strPrice="100" carId={1} strImagePath="image1.jpeg" />);
    });

    const carName = screen.getByText('Car 1');
    const carPrice = screen.getByText('100$/day');
    const carImage = screen.getByAltText('Car 1');

    expect(carName).toBeInTheDocument();
    expect(carPrice).toBeInTheDocument();
    expect(carImage).toHaveAttribute('src', carImageMap[1]);
  });

  test('should render the Cars component with car instances', async () => {
    await act(async () => {
        render(<Cars />);
      });
  
      const carInstances = await screen.findAllByTestId('car-instance');
      expect(carInstances.length).toBe(mockCars.length);
    });
  
  test('should navigate to a specific car page when clicked', async () => {
    (useNavigate as jest.Mock).mockReturnValue((args:any) => {
      expect(args).toBe('/car?car_id=1');
    });

    await act(async () => {
        render(<CarInstance strMark="Car 1" strPrice="100" carId={1} strImagePath="image1.jpeg" />);
    });
  
    const carInstance = screen.getByTestId('car-instance');
    fireEvent.click(carInstance);
  
    expect(useNavigate).toHaveBeenCalledTimes(1);
  });

  test('should fetch cars data and render car instances', async () => {
    await act(async () => {
        render(<Cars />);
      });

    expect(fetch_data).toHaveBeenCalledWith('/car/getAll', 'GET');
    expect(screen.getByText(/Car 1/)).toBeInTheDocument();
    expect(screen.getByText(/Car 2/)).toBeInTheDocument();
    
  });
  
});
