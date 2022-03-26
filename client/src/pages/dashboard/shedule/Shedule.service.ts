import {post, get, put, del, postFile, putFile} from "../../../common/http";

export const gets = (payload: any) => {
    return post("/schedule/getall", payload);
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getSchduleById = (id:any) => {
    return get(`/schedule/get/${id}`);
};


export const create = (formData: any) => {
    return postFile("/vehicletrip/add", formData);
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

export const UpdateScheduleStatus = (id:any, payload:any) => {
    return put(`/schedule/update-status/${id}`, payload);
};

export const UpdateSchedule = (id:any, payload:any) => {
    return putFile(`/schedule/update-schedule/${id}`, payload);
};
