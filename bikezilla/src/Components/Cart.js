import React from "react";
import { useData } from "../Utils/DataContext";

export default function Cart() {
  const { data, removeFromCart, clearCart } = useData();

  const onRemove = (id)=>()=>{
      removeFromCart(id);
  }
  return (
    <div className="container cart">
      {(data.cart && data.cart.total) ? (
        <>
          <h1 className="text-center"> Your Cart</h1>
          <table border-collapse="collapse">
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Cost</th>
              <th> Actions </th>
            </tr>
            {Object.keys(data["cart"]["items"]).map((id) => (
              <tr key={id}>
                <td>
                  {" "}
                  {data["cart"]["items"][id].name} (
                  {data["cart"]["items"][id].type}){" "}
                </td>
                <td> {data["cart"]["items"][id].quantity} </td>
                <td> {data["cart"]["items"][id].price} </td>
                <td> {data["cart"]["items"][id].cost} </td>
                <td> <button onClick={onRemove(id)} >Remove</button> </td>
              </tr>
            ))}

            <tr>
              <th> Total </th>
              <th> {data["cart"].quantity} </th>
              <th> - </th>
              <th> {data["cart"].total} </th>
              <th> <button onClick={clearCart}>Clear Cart</button></th>
            </tr>
          </table>
        </>
      ) : (
        <h1>Cart is empty</h1>
      )}
    </div>
  );
}
