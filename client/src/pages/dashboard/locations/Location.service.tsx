import {post, get, put, del, postFile, putFile} from "../../../common/http";

export const gets = (payload: any) => {
    return post("/location/getall", payload);
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getVehicleByUserId = (id:any) => {
    return get(`/vehicle/get-user-vehicle/${id}`);
};

export const getLocationById = (id:any) => {
    return get(`/location/get/${id}`);
};


export const create = (formData: any) => {
    return post("/api/v1/scripts", formData);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const deleteItemById = (id:any) => {
    return del(`/location/delete/${id}`);
};

export const download = (payload:any) => {
    return post(`/print`, payload);
};

export const addVehicle = (payload:any) => {
    return postFile(`/location/add`, payload);
};

export const updateLocation = ( id:any, payload:any) => {
    return putFile(`/location/update/${id}`, payload);
};