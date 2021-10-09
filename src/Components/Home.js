import React from "react";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";

export default function Home() {

  const history = useHistory();
  return (
    <div>
      <div className="banner">
        <h1>Welcome to Bikezilla!</h1>
        <p>We Keep you Riding</p>
        <button onClick={()=>history.push("/products")}   className="standalone"> Get Started </button>
      </div>
    </div>
  );
}
