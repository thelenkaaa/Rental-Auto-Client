import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { fetch_data } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import User from '../components/user/User';

jest.mock('../utils/api', () => ({
  fetch_data: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('User', () => {
  const mockUser = {
    username: 'testuser',
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@example.com',
    phone: '1234567890',
    drive_license: 'ABCD1234',
  };

  beforeEach(() => {
    (fetch_data as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch user data and render user info', async () => {
    await act(async () => {
      render(<User />);
    });

    expect(fetch_data).toHaveBeenCalledWith('/user/me', 'GET', null, true);

    expect(screen.getByText(/Username:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.first_name)).toBeInTheDocument();

    expect(screen.getByText(/Surname:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.last_name)).toBeInTheDocument();

    expect(screen.getByText(/Email:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();

    expect(screen.getByText(/Driver Licence:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.drive_license)).toBeInTheDocument();

  });

  test('should delete user profile and navigate to login page when delete button is clicked', async () => {
    (useNavigate as jest.Mock).mockReturnValue((...args: any[]) => {
      expect(args[0]).toBe('/login');
    });
  
    await act(async () => {
      render(<User />);
    });
  
    const deleteButton = screen.getByText(/delete profile/i);
    fireEvent.click(deleteButton);
  
    expect(fetch_data).toHaveBeenCalledWith('/user/deleteMe', 'DELETE');
    expect(useNavigate).toHaveBeenCalledTimes(2);
  });
  
  test('should navigate to edit profile page when edit button is clicked', async () => {
    (useNavigate as jest.Mock).mockReturnValue((...args: any[]) => {
      expect(args[0]).toBe('/edit');
    });
  
    await act(async () => {
      render(<User />);
    });
  
    const editButton = screen.getByText(/edit profile/i);
    fireEvent.click(editButton);
  
    expect(useNavigate).toHaveBeenCalledTimes(2);
  });
  

  

});
