import {post, get, put, del} from "../../../common/http";

export const gets = (payload: any) => {
    return post("/orders/all", payload);
};

export const getUser = () => {
    return get("/auth/me");
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getScriptById = (id:any) => {
    return get(`/api/v1/scripts/${id}`);
};
export const getUserById = (id:any) => {
    return get(`/auth/get-user-by-id/${id}`);
};


export const create = (formData: any) => {
    return post("/orders/addorders", formData);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const deleteItemById = (id:any) => {
    return del(`/orders/deletebyid/${id}`);
};

export const download = (payload:any) => {
    return post(`/print`, payload);
};

export const UpdateOrderStatus = (id:any, payload:any) => {
    return put(`/orders/update-status/${id}`, payload);
};

