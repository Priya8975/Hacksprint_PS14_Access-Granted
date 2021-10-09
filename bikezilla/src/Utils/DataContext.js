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
  const { user } = useAuth();
  const db = getFirestore();

  const getUsersData = async () => {
    const returnArray = [];
    if (user) {
      const tempData = {};
      let docsnap = await getDoc(doc(db, "userData", user.uid));
      if (docsnap.exists()) tempData["user"] = docsnap.data();
      else tempData["user"] = {};

      let unsub = onSnapshot(doc(db, "userCart", user.uid), (doc) => {
        tempData["cart"] = doc.data();
      });

      returnArray.push(unsub);
      unsub = onSnapshot(doc(db, "userWishlist", user.uid), (doc) => {
        tempData["wishlist"] = doc.data();
      });

      returnArray.push(unsub);
      setData({ ...data, ...tempData });
    } else {
      setData({ ...data, user: {}, cart: {}, wishlist: {} });
    }

    return returnArray;
  };

  useEffect(() => {
    return getUsersData();
  }, [user]);


  const getProducts = async () => {
    let tempdoc = { products: [] };
    let docsnap = await getDocs(collection(db, "products"));
    docsnap.forEach((doc) => {
      tempdoc.products.push({ ...doc.data, uid: doc.id });
    });
    setData({...data, ...tempdoc});
  };

  useEffect(() => {
    getProducts();
  }, []);


  const value = {
      data,
  }
  return (
    <DataContext.Provider value={value}>
      { children}
    </DataContext.Provider>
  );
}
