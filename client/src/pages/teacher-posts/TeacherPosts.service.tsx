import {post, get, put, del, postFile, putFile} from "../../common/http";

export const addTeacherPost = (formData: any) => {
    return post("/teacher-posts/add", formData);
};

export const getTeacherPosts = (payload: any) => {
    return post("/teacher-posts/getall", payload);
};

export const getTeacherPostsByUserId = (id:any) => {
    return get(`/teacher-posts/get/${id}`);
};

export const getTeacherPostsWiseUserById = (id:any) => {
    return get(`/teacher-posts/get-teacher-posts-wise-user/${id}`);
};

export const updateTeacherPosts = ( id:any, payload:any) => {
    return putFile(`/teacher-posts/update-teacher-posts/${id}`, payload);
};

export const deleteTeacherPostsById = (id:any) => {
    return del(`/teacher-posts/delete/${id}`);
};

export const UpdateCourseStatus = (id:any, payload:any) => {
    return put(`/teacher-posts/update-teacher-posts-status/${id}`, payload);
};

export const getAllTeacherPosts = (payload: any) => {
    return post("/teacher-posts/getall", payload);
};