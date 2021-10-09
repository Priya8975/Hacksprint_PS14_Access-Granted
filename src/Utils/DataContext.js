import React, { useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

import { useAuth } from "./AuthContext";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState({});
  const [products, setproducts] = useState({});
  const [displayProducts, setDisplayProducts] = useState([]);
  const { user } = useAuth();
  const db = getFirestore();

  const getUsersData = async () => {
    if (user) {
      const tempData = {};
      let docsnap = await getDoc(doc(db, "userData", user.uid));
      if (docsnap.exists()) tempData["user"] = docsnap.data();
      else tempData["user"] = {};

      docsnap = await getDoc(doc(db, "userCart", user.uid));
      if (docsnap.exists()) tempData["cart"] = docsnap.data();
      else tempData["cart"] = {};

      docsnap = await getDoc(doc(db, "userOrders", user.uid));
      if (docsnap.exists()) tempData["orders"] = docsnap.data();
      else tempData["orders"] = {};

      docsnap = await getDoc(doc(db, "userWishlist", user.uid));
      if (docsnap.exists()) tempData["wishlist"] = docsnap.data();
      else tempData["wishlist"] = {};
      setData({ ...data, ...tempData });
    } else {
      setData({ ...data, user: {}, cart: {}, wishlist: {} });
    }
  };

  useEffect(() => {
    getUsersData();
  }, [user]);

  useEffect(() => {
    const getProducts = async () => {
      let tempProducts = {};
      let docsnap = await getDocs(collection(db, "products"));
      docsnap.forEach((doc) => {
        tempProducts[doc.id] = doc.data();
      });
      setproducts({ ...products, ...tempProducts });
      setDisplayProducts(Object.keys(tempProducts));
    };
    getProducts();
  }, []);

  const setCart = async (tempCart) => {
    await setDoc(doc(db, "userCart", user.uid), tempCart);
    getUsersData();
  };

  const setOrders = async (tempOrders) => {
    await setDoc(doc(db, "userOrders", user.uid), tempOrders);
    getUsersData();
  };


  useEffect(()=>{
    console.log(data);
  },[data])

  const addToCart = (id, type) => {
    let tempCart = { ...data["cart"] };
    if (!tempCart.items) tempCart.items = {};
    if (type == 0) {
      // Buy
      let productId = "Buy-" + id;
      if (productId in tempCart.items) return;
      else {
        tempCart.items[productId] = {
          name: products[id].name,
          price: products[id].buyPrice,
          quantity: 1,
          type:"Buy",
          cost: products[id].buyPrice,
        };

        if (!tempCart["total"]) tempCart["total"] = 0;
        tempCart["total"] = tempCart["total"] + Number(products[id].buyPrice);
        if (!tempCart["quantity"]) tempCart["quantity"] = 0;
        tempCart["quantity"] = tempCart["quantity"] + 1;
      }
    } else if (type == 1) {
      // rent
      let productId = "Rent-" + id;
      if (productId in tempCart.items) return;
      else {
        tempCart.items[productId] = {
          name: products[id].name,
          price: products[id].rentPrice,
          quantity: 1,
          type:"Rent",
          cost: products[id].rentPrice,
        };

        if (!tempCart["total"]) tempCart["total"] = 0;
        tempCart["total"] = tempCart["total"] + Number(products[id].rentPrice);
        if (!tempCart["quantity"]) tempCart["quantity"] = 0;
        tempCart["quantity"] = tempCart["quantity"] + 1;
      }
    }
    setCart(tempCart);
  };

  const removeFromCart=(id)=>{
    let tempCart = { ...data["cart"] };
    if (!tempCart.items || !tempCart.items[id]) return;

    tempCart.total = Number(tempCart.total) - Number(tempCart.items[id].cost);
    tempCart.quantity = Number(tempCart.quantity) - Number(tempCart.items[id].quantity);
    
    delete tempCart.items[id]
    setCart(tempCart);
  }

  const clearCart = ()=>{
    let tempCart = { ...data["cart"] };
    if (!tempCart.items) return;

    tempCart.total = 0;
    tempCart.quantity = 0;
    delete tempCart.items
    setCart(tempCart);
  }

 const setWishlist = async (tempWishlist)=>{
  await setDoc(doc(db, "userWishlist", user.uid), tempWishlist);
  getUsersData();
 }
  const addToWishlist = (id)=>{
    let tempWishlist = { ...data["wishlist"] };
    if(id in tempWishlist) return;
    tempWishlist[id] = { 
      name: products[id].name,
      rentPrice: products[id].rentPrice,
      buyPrice: products[id].buyPrice,
      img: products[id].img
    }
    setWishlist(tempWishlist);
  }

  const removeFromWishlist = (id)=>{
    let tempWishlist = { ...data["wishlist"] };
    if(!tempWishlist[id]) return;
    delete tempWishlist[id];
    setWishlist(tempWishlist);
  }

  const clearWishlist = ()=>{
    setWishlist({});
  }


  const addToOrders = async ()=>{
    const tempOrders = {...data.orders};
    const orderId = "Order-" + (Object.keys(data.orders).length+1);
    tempOrders[orderId] = {...data.cart};
    await clearCart();
    await setOrders(tempOrders);
  }

  const value = {
    data,
    products,
    addToCart,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    addToOrders,
    displayProducts,
    setDisplayProducts
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
