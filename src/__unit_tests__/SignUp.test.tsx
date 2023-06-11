import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SignUp } from '../components/auth/Signup';
import { useNavigate } from 'react-router-dom';
import { fetch_data_with_error } from '../utils/error';

import { BrowserRouter } from "react-router-dom";

jest.mock('../utils/error', () => ({
  fetch_data_with_error: jest.fn(),
}));

describe("Signup form", () => {

  let originalAlert:any;

  beforeAll(() => {
    originalAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = originalAlert;
  });

  test("should return user data with correct values when submitted", async () => {


    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const nameInput = screen.getByTestId("name-input");
    const surnameInput = screen.getByTestId("surname-input");
    const phoneInput = screen.getByTestId("phone-input");
    const driverLicenceInput = screen.getByTestId("driver-licence-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(nameInput, { target: { value: "John" } });
      fireEvent.change(surnameInput, { target: { value: "Doe" } });
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });
      fireEvent.change(driverLicenceInput, { target: { value: "ABC123" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(submitButton);
    });

    expect(fetch_data_with_error).toHaveBeenCalledWith(
      "/user/user",
      "POST",
      {
        username: "testuser",
        password: "password",
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        phone: "1234567890",
        drive_license: "ABC123"
      },
      false
    );
  });






















//   test('displays an alert with error message when response status is not 200', async () => {
//     (fetch_data_with_error as jest.Mock).mockResolvedValue({ status: 400, statusText: 'Bad Request' });

//     render(
//       <BrowserRouter>
//         <SignUp />
//       </BrowserRouter>
//     );

//     const submitButton = screen.getByText('Sign up');

//     act(() => {
//       fireEvent.click(submitButton);
//     });

//     // Check that an alert is displayed with the error message
//     expect(window.alert).toHaveBeenCalledTimes(0);
//   });

//   test("navigates to '/login' when response status is 200", async () => {
//     // Mock the fetch_data_with_error function
//     (fetch_data_with_error as jest.Mock).mockResolvedValue({ status: 200 });

//     // Mock the navigate function from react-router-dom
//     const mockNavigate = jest.fn();
//     jest.mock('react-router-dom', () => ({
//       useNavigate: () => mockNavigate,
//     }));

//     render(
//       <BrowserRouter>
//         <SignUp />
//       </BrowserRouter>
//     );

//     const submitButton = screen.getByText('Sign up');

//     act(() => {
//       fireEvent.click(submitButton);
//     });

//     expect(mockNavigate).toHaveBeenCalledTimes(0);
//   });

});
