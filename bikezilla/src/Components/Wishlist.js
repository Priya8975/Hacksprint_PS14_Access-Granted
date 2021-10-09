import React from "react";
import { useData } from "../Utils/DataContext";

export default function Wishlist() {
  const { data, removeFromWishlist, clearWishlist } = useData();

  const onRemove = (id) => () => {
    removeFromWishlist(id);
  };
  return (
    <div className="container wishlist">
      {(data.wishlist && (Object.keys(data.wishlist).length>0)) ? (
        <>
          <table>
            {Object.keys(data.wishlist).map((id) => (
              <tr>
                <td>
                  <img src={data.wishlist[id].img} />
                  {data.wishlist[id].name}
                </td>
                <td>Buy @ ₹{data.wishlist[id].buyPrice}</td>
                <td>Rent @ ₹{data.wishlist[id].rentPrice}/month</td>
                <td>
                  <button onClick={onRemove(id)}>Remove</button>
                </td>
              </tr>
            ))}
          </table>

          <button className="standalone red" onClick={clearWishlist}>Clear Wishlist</button>
        </>
      ) : (
        <>
          <h1>Your Wishlist is empty</h1>
        </>
      )}
    </div>
  );
}
