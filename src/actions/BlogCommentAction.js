import axios from "axios";
import {
  COMMENT_CLEAR_ERROR,
  CREATE_BLOG_COMMENT_FAILED,
  CREATE_BLOG_COMMENT_REQUEST,
  CREATE_BLOG_COMMENT_SUCCESS,
  GET_BLOG_COMMENT_FAILED,
  GET_BLOG_COMMENT_REQUEST,
  GET_BLOG_COMMENT_SUCCESS,
} from "../constants/BlogCommentConstant";
import { server_url } from "../utils/Url";

//--------------CREATE COMMENT-------------

export const CreateBlogCommentAction =
  (blogId, comment) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BLOG_COMMENT_REQUEST });
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("blogId", blogId);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server_url()}/api/v1/blog-comment`,
        formData,
        config
      );
      dispatch({ type: CREATE_BLOG_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_BLOG_COMMENT_FAILED,
        payload: error.response.data.message,
      });
    }
  };

//--------------------GET COMMENT-----------------------

export const GetBlogCommentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_COMMENT_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/get-blog-comment`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: GET_BLOG_COMMENT_SUCCESS, payload: data.commentdata });
  } catch (error) {
    dispatch({
      type: GET_BLOG_COMMENT_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const ClearError = () => async (dispatch) => {
  dispatch({ type: COMMENT_CLEAR_ERROR });
};
