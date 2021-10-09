import React from "react";
import { useData } from "../Utils/DataContext";
import { useHistory } from "react-router";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react/cjs/react.development";

export default function Products() {
  const { products } = useData();

  const [displayProducts, setDisplayProducts] = useState([]);
  const [filter, setFilter] = useState(["", ""]);


  useState(() => {
    setDisplayProducts(Object.keys(products));
  }, []);

  useState(() => {
    setDisplayProducts(Object.keys(products));
  }, [products]);

  const onAscending = () => {
    let tempArr = Object.keys(products).map((key) => ({
      id: key,
      price: products[key].buyPrice,
    }));
    tempArr.sort(function (a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    setDisplayProducts(tempArr.map((product) => product.id));
  };

  const onDescending = () => {
    let tempArr = Object.keys(products).map((key) => ({
      id: key,
      price: products[key].buyPrice,
    }));
    tempArr.sort(function (a, b) {
      return parseFloat(b.price) - parseFloat(a.price);
    });
    setDisplayProducts(tempArr.map((product) => product.id));
  };

  const onFilter = () => {
    let tempArr = Object.keys(products).map((key) => ({
      id: key,
      type: products[key].type,
      size: products[key].size,
    }));

    if (filter[0] != "")
      tempArr = tempArr.filter(
        (val) => val.type.toLowerCase() == filter[0].toLowerCase()
      );
    if (filter[1] != "")
      tempArr = tempArr.filter(
        (val) => val.size.toLowerCase() == filter[1].toLowerCase()
      );
    setDisplayProducts(tempArr.map((product) => product.id));
  };

  useEffect(() => {
    onFilter();
  }, filter);


  const history = useHistory();

  return (
    <div className="container">
      <Sidebar
        aesc={onAscending}
        desc={onDescending}
        setFilter={setFilter}
        filter={filter}
      />
      <div className="row">
        {displayProducts.length > 0 ? (
          <>
            {displayProducts.map((key) => (
              <div className="col product" key={key}>
                <img src={products[key].img} alt="bike" />
                <div className="row">
                  <h3 className="col">{products[key].name}</h3>
                  <p className="col text-right"> ₹{products[key].buyPrice}</p>
                </div>
                <button onClick={() => history.push(`/product/${key}`)}>
                  View More
                </button>
                <small>
                  {products[key].type} - {products[key].size}
                </small>
              </div>
            ))}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
}
