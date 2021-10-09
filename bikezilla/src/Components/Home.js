import React from "react";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <div>
      <div className="banner">
        <h1>Welcome to Bikezilla!</h1>
        <p>We Keep you Riding</p>
        <button className="standalone"> Get Started </button>
      </div>

      <div className="container">
        <h1> Recommend Bikes</h1>
        <div className="row">
          <div className="col product">
            <img
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="bike"
            />
            <div className="row">
              <h3 className="col">Bike name</h3>
              <p className="col text-right"> $4567</p>
            </div>

            <button>View More</button>
          </div>
          <div className="col product">
            <img
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="bike"
            />
            <div className="row">
              <h3 className="col">Bike name</h3>
              <p className="col text-right"> $4567</p>
            </div>

            <button>View More</button>
          </div>

          <div className="col product">
            <img
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="bike"
            />
            <div className="row">
              <h3 className="col">Bike name</h3>
              <p className="col text-right"> $4567</p>
            </div>

            <button>View More</button>
          </div>
        </div>

        <button className="standalone">View More Bikes</button>
      </div>
    </div>
  );
}
