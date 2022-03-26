import {post, get, put, del, postFile, putFile} from "../../../common/http";

export const gets = (payload: any) => {
    return post("/course/getall", payload);
};

export const getPaginate = (name:any, page: number, size: number) => {
    return get(`/api/v1/scripts/pagination?title=${name}&page=${page}&size=${size}`);
};

export const getVehicleByUserId = (id:any) => {
    return get(`/vehicle/get-user-vehicle/${id}`);
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

export const deleteItemById = (id:any) => {
    
    return del(`/course/delete/${id}`);
};

export const download = (payload:any) => {
    return post(`/print`, payload);
};

export const addCourse = (payload:any) => {
    return postFile(`/course/add`, payload);
};

export const updateVehicle = ( id:any, payload:any) => {
    return putFile(`/course/update-course/${id}`, payload);
};

export const UpdateCourseStatus = (id:any, payload:any) => {
    return put(`/course/update-status/${id}`, payload);
};