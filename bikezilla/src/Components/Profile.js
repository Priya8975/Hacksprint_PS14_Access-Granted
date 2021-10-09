import React from "react";
import { useData } from "../Utils/DataContext";

export default function Profile() {

  const { data, products } = useData();
  console.log(data, products);
  return <div>
      Profile
      </div>;
}
