import {post, get, put, del, postFile, putFile} from "../../common/http";

export const addUsersPost = (formData: any) => {
    return post("/user-posts/add", formData);
};

export const getUserPosts = (payload: any) => {
    return post("/user-posts/getall", payload);
};
export const getuserPostsByUserId = (id:any) => {
    return get(`/user-posts/get/${id}`);
};

export const updateUserPosts = (id:any, payload:any) => {
    return putFile(`/user-posts/update-user-posts/${id}`, payload);
};

export const deleteUserPostsById = (id:any) => {
    return del(`/user-posts/delete/${id}`);
};

export const getAllUserPosts = (payload: any) => {
    return post(`/user-posts/getall`, payload);
};

export const getUserPostsWiseUserById = (id:any) => {
    return get(`/user-posts/get-user-posts-wise-user/${id}`);
};


export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getVehicleById = (id:any) => {
    return get(`/course/get/${id}`);
};

export const getCourseWiseStudentById = (id:any) => {
    return get(`/course-enrol/couse-wise-student/${id}`);
};

export const create = (formData: any) => {
    return post("/api/v1/scripts", formData);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const UpdateCourseStatus = (id:any, payload:any) => {
    return put(`/course/update-status/${id}`, payload);
};