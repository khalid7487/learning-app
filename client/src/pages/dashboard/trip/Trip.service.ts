import {post, get, put, del, postFile, putFile} from "../../../common/http";

export const gets = (payload: any) => {
    return post("/vehicletrip/getall", payload);
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getTripById = (id:any) => {
    return get(`/vehicletrip/get/${id}`);
};


export const create = (formData: any) => {
    return postFile("/schedule/add", formData);
};

export const update = (formData: any) => {
    return put(`/api/v1/scripts`, formData);
};

export const deleteItemById = (id:any) => {
    return del(`/vehicletrip/delete/${id}`);
};

export const userWiseVehicleTrip = (id:any) => {
    return get(`/vehicle/get-user-wise-vehicle-and-trips/${id}`);
};


export const download = (payload:any) => {
    return post(`/print`, payload);
};

export const UpdateTripStatus = (id:any, payload:any) => {
    return put(`/vehicletrip/update-status/${id}`, payload);
};

export const UpdateTrip = (id:any, payload:any) => {
    return putFile(`/vehicletrip/update/${id}`, payload);
};
