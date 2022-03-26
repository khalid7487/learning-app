import {post, get, put, del} from "../../../common/http";

export const gets = () => {
    return get("/api/v1/scripts");
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getScriptById = (id:any) => {
    return get(`/api/v1/scripts/${id}`);
};


export const create = (formData: any) => {
    return post("/api/v1/scripts", formData);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const deleteItemById = (id:any) => {
    return del(`/api/v1/scripts/${id}`);
};

export const download = (payload:any) => {
    return post(`/print`, payload);
};
