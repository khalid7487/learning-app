import { post, get, put, del, postFile, putFile } from "../../../common/http";

export const gets = (payload: any) => {
    return post(`/news/all`, payload);
};

export const getPaginate = (name: any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getnewsById = (id: any) => {
    return get(`/news/getbyId/${id}`);
};


export const create = (payload: any) => {
    return postFile(`/news/add`, payload);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const deleteItemById = (id: any) => {
    return del(`/news/deletebyid/${id}`);
};

export const download = (payload: any) => {
    return post(`/print`, payload);
};
export const updateNews = ( id:any, payload:any) => {
    return putFile(`/news/update/${id}`, payload);
};