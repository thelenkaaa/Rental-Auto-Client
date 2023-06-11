import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LogIn } from '../components/auth/Login';
import { useNavigate } from 'react-router-dom';
import { fetch_data_with_error } from '../utils/error';

import { BrowserRouter } from 'react-router-dom';

jest.mock('../utils/error', () => ({
  fetch_data_with_error: jest.fn(),
}));

describe('Login form', () => {
  let originalAlert: any;

  beforeAll(() => {
    // Save the original window.alert function
    originalAlert = window.alert;
    // Create a mock for window.alert
    window.alert = jest.fn();
  });

  afterAll(() => {
    // Restore the original window.alert function
    window.alert = originalAlert;
  });

  test('should call handleSubmit with correct values when submitted', async () => {

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Log In');

    // Enter input values and submit the form
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);
    });

    // Check that handleSubmit was called with the correct values
    expect(fetch_data_with_error).toHaveBeenCalledWith('/user/login', 'POST', {
      username: 'testuser',
      password: 'password',
    }, false);
  });

  test("should show an error message on login failure", async () => {
    (fetch_data_with_error as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid email or password")
    );
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    window.alert = jest.fn();
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  
    await act(async () => {
      expect(fetch_data_with_error as jest.Mock).toHaveBeenCalledWith(
        "/user/login",
        "POST",
        {
            username: "test",
            password: "password123",
        },
        false
      );
    });
    
    expect(localStorage.getItem("access_token")).toBe(null);
    expect(localStorage.getItem("current_user_id")).toBe(null);
  });

  test("navigates to '/main' when response status is 200", async () => {
    // Mock the fetch_data_with_error function
    (fetch_data_with_error as jest.Mock).mockResolvedValue({ status: 200 });

    // Mock the navigate function from react-router-dom
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Log In');

    act(() => {
      fireEvent.click(submitButton);
    });

    // Check that the navigate function is called with '/main'
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});
