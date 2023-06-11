import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
import logInImage from "../main/img/log_in_icon.png"

export default function Header() {
    return (
      <header className="header-container border-bottom">
            <div className="container">
                <div className="row row-cols-2">

                    <div className="col d-flex justify-content-start">
                        <Link to="/main" className="btn logo-wrapper my-3">Rental Company YFV</Link>

                        {/* <p className="logo-wrapper my-3">Rental Company YFV</p> */}
                    </div>

                    <div className="col d-flex justify-content-end">
                        <Link to="/user" className="btn user-button d-flex justify-content-end align-items-center">
                            <img src={logInImage} width="45" height="45" alt="Log in"/>
                        </Link>

                    </div>
                </div>
            </div>
      </header>
    );
  }