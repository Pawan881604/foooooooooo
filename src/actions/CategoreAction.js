import axios from "axios";
import {
  ALL_CATEGORIE_ERRORS,
  ALL_CATEGORIE_REQUEST,
  ALL_CATEGORIE_SUCCESS,
  GET_SINGLE_PRODUCT_CAT_FAIL,
  GET_SINGLE_PRODUCT_CAT_REQUEST,
  GET_SINGLE_PRODUCT_CAT_SUCCESS,
  NEW_CATEGORIE_FAIL,
  NEW_CATEGORIE_REQUEST,
  NEW_CATEGORIE_SUCCESS,
  SINGLE_SUB_CATEGORIE_FAIL,
  SINGLE_SUB_CATEGORIE_REQUEST,
  SINGLE_SUB_CATEGORIE_SUCCESS,
  STATUS_CATEGORIE_FAIL,
  STATUS_CATEGORIE_REQUEST,
  STATUS_CATEGORIE_SUCCESS,
  STATUS_SUB_CATEGORIE_FAIL,
  STATUS_SUB_CATEGORIE_REQUEST,
  STATUS_SUB_CATEGORIE_SUCCESS,
  UPDATE_PARENT_CATEGORIE_FAIL,
  UPDATE_PARENT_CATEGORIE_REQUEST,
  UPDATE_PARENT_CATEGORIE_SUCCESS,
  UPDATE_SUB_CATEGORIE_FAIL,
  UPDATE_SUB_CATEGORIE_REQUEST,
  UPDATE_SUB_CATEGORIE_SUCCESS,
} from "../constants/CategoreConstants";
import { server_url } from "../utils/Url";

export const CreateNewCategore =
  (
    name,
    slug,
    title,
    checkedItems,
    subcheckedItems,
    description,
    seotitle,
    keyword,
    metadec
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("parent", checkedItems);
      formData.append("description", description);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (checkedItems.length === 0) {
        const { data } = await axios.post(
          `${server_url()}/api/v1/create/categore`,
          formData,
          config
        );
        dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.post(
          `${server_url()}/api/v1/create/sub-categore`,
          formData,
          config
        );
        dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIE_REQUEST });
    const { data } = await axios.get(`${server_url()}/api/v1/all-categore`, {
      withCredentials: true,
    });
    dispatch({ type: ALL_CATEGORIE_SUCCESS, payload: data.allCategores });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

//--------------------------- sub cat

export const CreateNewSubCategore =
  (name, slug, title, parent, description) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("parent", parent);
      formData.append("description", description);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server_url()}/api/v1/create/sub-categore`,
        formData,
        config
      );
      dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

// ------STATUS--------------

export const StausCategory = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_CATEGORIE_REQUEST });

    const formdata = new FormData();
    formdata.append("status", status);
    const config = {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = axios.put(
      `${server_url()}/api/v1/update/category-status/${id}`,
      formdata,
      config
    );
    dispatch({ type: STATUS_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATUS_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const StausSubCategory = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_SUB_CATEGORIE_REQUEST });
    const formdata = new FormData();
    formdata.append("status", status);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = axios.put(
      `${server_url()}/api/v1/update/sub-category-status/${id}`,
      formdata,
      config
    );
    dispatch({ type: STATUS_SUB_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATUS_SUB_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleParentCat = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_CAT_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/product/all-parent-category/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GET_SINGLE_PRODUCT_CAT_SUCCESS,
      payload: data.parentcategory,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_CAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateParentCategory =
  (
    id,
    name,
    slug,
    title,
    description,
    parent,
    seotitle,
    keyword,
    metadec,
    metalink
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PARENT_CATEGORIE_REQUEST });
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("slug", slug);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("parent", parent);
      formdata.append("seotitle", seotitle);
      formdata.append("keyword", keyword);
      formdata.append("metadec", metadec);
      formdata.append("metalink", metalink);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = axios.put(
        `${server_url()}/api/v1/update/parent-category/${id}`,
        formdata,
        config
      );
      dispatch({ type: UPDATE_PARENT_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PARENT_CATEGORIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//----------------single Sub Categoryp---------------------------

export const SingleSubCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_SUB_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/product/all-sub-category/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: SINGLE_SUB_CATEGORIE_SUCCESS, payload: data.subcategory });
  } catch (error) {
    dispatch({
      type: SINGLE_SUB_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-----------UPDATE SUB CATEGORY------------------

export const UpdateSubCategoryAction =
  (
    id,
    name,
    slug,
    parent,
    title,
    description,
    seotitle,
    keyword,
    metadec,
    metalink,
    productsubcatid
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SUB_CATEGORIE_REQUEST });
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("slug", slug);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("parent", parent);
      formdata.append("seotitle", seotitle);
      formdata.append("keyword", keyword);
      formdata.append("metadec", metadec);
      formdata.append("metalink", metalink);
      formdata.append("productsubcatid", productsubcatid);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${server_url()}/api/v1//update/sub-category/${id}`,
        formdata,
        config
      );
      dispatch({ type: UPDATE_SUB_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SUB_CATEGORIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ALL_CATEGORIE_ERRORS });
};
