import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { fetch_data_with_error } from '../utils/error';
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from '../components/user/EditUser';

jest.mock('../utils/error', () => ({
  fetch_data_with_error: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

global.alert = jest.fn();

describe('UpdateUser', () => {
  const mockProps = {
    Username: 'testuser',
    Name: 'John',
    Surname: 'Doe',
    Email: 'test@example.com',
    Phone: '1234567890',
    DriverLicence: 'ABCD1234',
  };

  beforeEach(() => {
    (fetch_data_with_error as jest.Mock).mockResolvedValue({ status: 200 });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useNavigate as jest.Mock).mockClear(); 
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update user profile and navigate to user page when form is submitted', async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  
    await act(async () => {
      render(<UpdateUser {...mockProps} />);
    });
  
    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);
  
    expect(fetch_data_with_error).toHaveBeenCalledWith('/user/updateMe', 'PUT', {
      username: mockProps.Username,
      name: mockProps.Name,
      surname: mockProps.Surname,
      email: mockProps.Email,
      phone: mockProps.Phone,
      drive_license: mockProps.DriverLicence,
    });
  
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
  
    expect(navigate).toHaveBeenCalledWith('/user');

  });

      test('should display an error message when the API request fails', async () => {
        const errorMessage = 'API request failed';
        (fetch_data_with_error as jest.Mock).mockImplementation(() => {
            throw { code: 500, message: errorMessage };
        });

        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const alertMock = window.alert as jest.Mock;
        const saveButton = screen.getByText(/save changes/i);
        fireEvent.click(saveButton);

        expect(fetch_data_with_error).toHaveBeenCalledWith('/user/updateMe', 'PUT', {
            username: mockProps.Username,
            name: mockProps.Name,
            surname: mockProps.Surname,
            email: mockProps.Email,
            phone: mockProps.Phone,
            drive_license: mockProps.DriverLicence,
        });

        expect(useNavigate).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith('500' + errorMessage);
    });

  test('should display an error message when the phone number is not a valid integer', async () => {
    await act(async () => {
      render(<UpdateUser {...mockProps} />);
    });

    const navigateMock = useNavigate as jest.Mock;
    const alertMock = window.alert as jest.Mock;

    const phoneInput = screen.getByDisplayValue('1234567890');
    fireEvent.change(phoneInput, { target: { value: 'abc' } });

    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);

    expect(fetch_data_with_error).not.toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('400: "phone: [Not a valid integer.]}');
  });
  
  
    test('should update the username state when the username input changes', async () => {
        await act(async () => {
          render(<UpdateUser {...mockProps} />);
        });
    
        const usernameInput = screen.getByDisplayValue(mockProps.Username) as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    
        expect(usernameInput.value).toBe('newusername');
      });
    
    test('updates the name state when the name input changes', async () => {
        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const nameInput = screen.getByDisplayValue(mockProps.Name) as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'newname' } });

        expect(nameInput.value).toBe('newname');
    });

    test('updates the surname state when the surname input changes', async () => {
        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const surnameInput = screen.getByDisplayValue(mockProps.Surname) as HTMLInputElement;
        fireEvent.change(surnameInput, { target: { value: 'newsurname' } });

        expect(surnameInput.value).toBe('newsurname');
    });

    test('updates the email state when the email input changes', async () => {
        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const emailInput = screen.getByDisplayValue(mockProps.Email) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });

        expect(emailInput.value).toBe('newemail@example.com');
    });

    test('updates the phone state when the phone input changes', async () => {
        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const phoneInput = screen.getByDisplayValue(mockProps.Phone) as HTMLInputElement;
        fireEvent.change(phoneInput, { target: { value: '9876543210' } });

        expect(phoneInput.value).toBe('9876543210');
    });

    test('updates the driver license state when the driver license input changes', async () => {
        await act(async () => {
            render(<UpdateUser {...mockProps} />);
        });

        const driverLicenseInput = screen.getByDisplayValue(mockProps.DriverLicence) as HTMLInputElement;
        fireEvent.change(driverLicenseInput, { target: { value: 'EFGH5678' } });

        expect(driverLicenseInput.value).toBe('EFGH5678');
    });

      
      

  
});
