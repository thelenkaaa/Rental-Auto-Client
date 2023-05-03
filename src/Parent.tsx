import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";

interface ChildRoutes {
    path: string;
    element: JSX.Element;
  }
  
  interface ParentProps {
    childRoutes: ChildRoutes[];
  }
  
  const Parent: React.FC<ParentProps> = ({ childRoutes }: ParentProps) => {
    return (
      <>
        <Header />
        <Routes>
        {childRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
        ))}
        </Routes>

        <Footer />
      </>
    );
  };
  
  
  export default Parent;
  