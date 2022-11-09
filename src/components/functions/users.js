import axios from "axios";

export const listUser = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-status", value, {
    headers: {
      authtoken,
    },
  });

export const changeRole = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken,
    },
  });

export const removeUser = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });

export const resetPassword = async (authtoken, id, values) =>
  await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
    headers: {
      authtoken,
    },
  });

export const userCart = async (authtoken, cart) =>
  await axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });

export const emptyCart = async (authtoken) =>
  await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });

//save address
export const saveAddress = async (authtoken, addressId) =>
  await axios.post(
    process.env.REACT_APP_API + "/user/address",
    { addressId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getAddress = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/address", {
    headers: {
      authtoken,
    },
  });

//save order
export const saveOrder = async (authtoken, addressId) =>
  await axios.post(
    process.env.REACT_APP_API + "/user/order",
    { addressId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getOrders = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/orders", {
    headers: {
      authtoken,
    },
  });

export const readOrder = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/user/read-orders/" + id);

export const updateSlipOrder = async (id,slipImage) =>
  await axios.put(process.env.REACT_APP_API + "/user/slip-orders/" + id,{slipImage});

//wishlist
export const getWishlist = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  });

export const addToWishlist = async (authtoken, productId) =>
  await axios.post(
    process.env.REACT_APP_API + "/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const removeWishlist = async (authtoken, productId) =>
  await axios.put(
    process.env.REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
