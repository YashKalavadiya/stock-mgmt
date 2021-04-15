import {
  DECREMENT_PRODUCT_STOCK,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  INCREMENT_PRODUCT_STOCK,
  NEW_PRODUCT_STOCK,
  SET_SEARCH_ITEMS,
} from "./productTypes";
import firebase from "firebase";
import "firebase/firestore";
export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: products,
  };
};

export const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const incrementStock = (
  products,
  productIdx,
  searchedItems,
  searchedItemIdx,
  newVal
) => {
  products[productIdx].quantity = parseInt(newVal);
  searchedItems[searchedItemIdx].quantity = parseInt(newVal);
  return {
    type: INCREMENT_PRODUCT_STOCK,
    payload: products,
    searchedItems: searchedItems,
  };
};

export const decrementStock = (
  products,
  productIdx,
  searchedItems,
  searchedItemIdx,
  newVal
) => {
  products[productIdx].quantity = parseInt(newVal);
  searchedItems[searchedItemIdx].quantity = parseInt(newVal);
  return {
    type: DECREMENT_PRODUCT_STOCK,
    payload: products,
    searchedItems: searchedItems,
  };
};

export const setNewProductStock = (
  products,
  productIdx,
  searchedItems,
  searchedItemIdx,
  newVal
) => {
  products[productIdx].quantity = parseInt(newVal);
  searchedItems[searchedItemIdx].quantity = parseInt(newVal);
  return {
    type: NEW_PRODUCT_STOCK,
    payload: products,
    searchedItems: searchedItems,
  };
};

export const setNewSearchItems = (items) => {
  return {
    type: SET_SEARCH_ITEMS,
    payload: items,
  };
};

export const searchItem = (item, allItems) => {
  // let foundItems = [];
  // allItems.forEach((d,i) => {
  //   if(d.productName.toUpperCase().indexOf(item.toUpperCase()) > -1 || d.productId.toUpperCase().indexOf(item.toUpperCase()) > -1){
  //     foundItems.push(d);
  //   }
  // })
  let foundItems = allItems.filter((d) => {
    if (
      d.productName.toUpperCase().indexOf(item) > -1 ||
      d.productId.toUpperCase().indexOf(item) > -1
    ) {
      return true;
    }
    return false;
  });
  return foundItems;
};

export const fetchProducts = async (dispatch, userId) => {
  dispatch(fetchProductsRequest());
  const dbRef = firebase
    .firestore()
    .collection(userId)
    .orderBy("createdAt", "asc");
  const snapshot = await dbRef.get();
  let products = [];
  snapshot.forEach((data) => {
    products.push(data.data());
  });
  if (snapshot.empty) {
    dispatch(fetchProductFailure("No Products found"));
  } else {
    dispatch(fetchProductsSuccess(products));
  }
};
