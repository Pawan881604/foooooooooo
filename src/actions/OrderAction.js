import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  All_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  ORDER_SHIPPING_INFO_REQUEST,
  ORDER_SHIPPING_INFO_SUCCESS,
  ORDER_SHIPPING_INFO_FAIL,
  ORDER_DETAILS_INFO_REQUEST,
  ORDER_DETAILS_INFO_SUCCESS,
  ORDER_DETAILS_INFO_FAIL,
} from "../constants/OrderConstants";

import axios from "axios";
import { server_url } from "../utils/Url";

export const createOrder =
  (order, payment_mode) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
      const order_details = JSON.stringify(order);
      const formData = new FormData();
      formData.append("order_details", order_details);
      formData.append("payment_mode", payment_mode);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `${server_url()}/api/v1/order/new`,
        formData,
        config
      );

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data.Order });
    } catch (err) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getMyorders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const { data } = await axios.get(`${server_url()}/api/v1/orders/me`, {
      withCredentials: true,
    });
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.Orders,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`${server_url()}/api/v1/order/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getAdminOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/admin/order/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//-----------------admin

export const getAllorders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });
    const { data } = await axios.get(`${server_url()}/api/v1/admin/orders`, {
      withCredentials: true,
    });
    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.Orders,
    });
  } catch (err) {
    dispatch({
      type: All_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateOrder =
  (
    id,
    status,
    name,
    address,
    city,
    pinCode,
    country,
    state,
    email,
    phoneNo,
    productId,
    order_info_uuid
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
      const formData = new FormData();
      formData.append("status", status);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("pinCode", pinCode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("email", email);
      formData.append("phoneNo", phoneNo);
      formData.append("link", productId);
      formData.append("order_info_uuid", order_info_uuid);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${server_url()}/api/v1/admin/order/${id}`,
        formData,
        config
      );
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(
      `${server_url()}/api/v1/admin/order/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const order_shipping_info = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_SHIPPING_INFO_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/order/shipping-info/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: ORDER_SHIPPING_INFO_SUCCESS, payload: data.shipping });
  } catch (err) {
    dispatch({
      type: ORDER_SHIPPING_INFO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const order_details_info = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_INFO_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/order/order-details-info/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: ORDER_DETAILS_INFO_SUCCESS, payload: data.order_details });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_INFO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
