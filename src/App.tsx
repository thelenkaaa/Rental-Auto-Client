import './App.css'
import Main from "./components/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import CarPage from "./components/order/CarPage";
import {LogIn} from "./components/auth/Login";
import {SignUp} from './components/auth/Signup';
import Parent from "./Parent";
import { UpdateUser } from './components/user/EditUser';

export default function App() {
  const childRoutes = [
    { path: "/main", element: <Main /> },
    { path: "/user", element: <User /> },
    { path: "/edit", element: <UpdateUser /> },
    { path: "/car", element: <CarPage /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Parent childRoutes={childRoutes} />} />
      </Routes>
    </BrowserRouter>
  );
}
