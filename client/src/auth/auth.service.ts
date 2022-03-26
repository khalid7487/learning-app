import {del, get, post, postFile, put, putFile} from "../common/http";

export const getUsers = (payload: any) => {
    return post("/auth/user-info", payload);
};

export const getUser = () => {
    return get("/auth/me");
};
export const getUserById = (id:any) => {
    return get(`/auth/get-user-by-id/${id}`);
};

export const getUserSchduleById = (id:any) => {
    return get(`/users/get-user-wise-schdule/${id}`);
};


export const getRoleById = (id:any) => {
    return get(`/auth/get-role-by-id/${id}`);
};

export const addUser = (payload:any) => {
    return postFile(`/vehicle/add`, payload);
};


export const getUserByIdUsernameEmailPhoneNid = (username:any) => {
    return get(`/users/user-by-id-username-email-phone-nid?username=${username}`);
};

export const getAllRoles = () => {
    return get("/auth/roles");
};

export const registrationUser = async (formData: any) => {
    return postFile(`/auth/register`, formData);
};

export const deleteUserById = (id: any) => {
    return del(`/auth/deletebyid/${id}`);
};

export const updateUser = ( id:any, payload:any) => {
    return putFile(`/auth/update-profile/${id}`, payload);
};

export const updateRole = ( id:any, payload:any) => {
    return putFile(`/auth/update-roles/${id}`, payload);
};

export const updateImageUser = ( id:any, payload:any) => {
    return putFile(`/auth/update-profile-image/${id}`, payload);
};

export const UpdateUserStatus = (id:any, payload:any) => {
    return put(`/auth/update-status/${id}`, payload);
};