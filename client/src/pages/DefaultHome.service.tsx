import {  decodeToken, get, post, postFile } from "../common/http";

export const gets = (payload: any) => {
    return post(`/course/home`, payload);
};

export const getCourseById = (id:any) => {
    return get(`/course/get/${id}`);
};

export const enrolCourse = (payload: any) => {
    return post(`/course-enrol/add`, payload);
};


export const getTeacherById = (id:any) => {
    return get(`/course/get-course-wise-user/${id}`);
};

export const getPackageById = (id:any) => {
    return get(`/vehicle/vehicleId-wise-vehicletrips/${id}`);
};

export const getDecodeToken = () => {
    return decodeToken();
};

export const AddOrders = (payload: any) => {
    return post(`/orders/addorders`, payload);
};
export const AddPromo = (payload: any) => {
    return post(`/news/get-promo-by-code`, payload);
};

export const getAllPublicTeachers = (payload: any) => {
    return post(`/users/all-teachers`, payload);
};

export const getCountUser = () => {
    return get(`/auth/total-user`);
};

export const getCountDriver = () => {
    return get(`/auth/total-driver`);
};

export const getCountVehicles = () => {
    return get(`/vehicle/total-vechile`);
};

export const getCountTrip = () => {
    return get(`/vehicletrip/total-vechile-trip`);
};

export const getCountOrder = () => {
    return get(`/orders/total-orders`);
};

export const getServerTime = () => {
    return get(`/auth/server-time`);
};
export const getMemoryManagement = () => {
    return get(`/auth/memory-management`);
};

//vehicle
export const getTodayTotalVehicle = () => {
    return get(`/vehicle/today-vehicle`);
};

export const getPreviousDayTotalVehicle = () => {
    return get(`/vehicle/previous-day-vehicle`);
};

export const getPreviousWeekTotalVehicle = () => {
    return get(`/vehicle/previous-week-vehicle`);
};
export const getPreviousMonthTotalVehicle = () => {
    return get(`/vehicle/previous-month-vehicle`);
};

//trip
export const getTodayTotalVehicleTrip = () => {
    return get(`/vehicletrip/today-trip`);
};

export const getPreviousDayTotalVehicleTrip = () => {
    return get(`/vehicletrip/previous-day-trip`);
};

export const getPreviousWeekTotalVehicleTrip = () => {
    return get(`/vehicletrip/previous-week-trip`);
};
export const getPreviousMonthTotalVehicleTrip = () => {
    return get(`/vehicletrip/previous-month-trip`);
};

//orders
export const getTodayTotalOrders = () => {
    return get(`/orders/today-orders`);
};

export const getPreviousDayTotalOrders = () => {
    return get(`/orders/previous-day-orders`);
};

export const getPreviousWeekTotalOrders = () => {
    return get(`/orders/previous-week-orders`);
};
export const getPreviousMonthTotalOrders = () => {
    return get(`/orders/previous-month-orders`);
};

export const scheduleEnrol = (payload: any) => {
    return post("/schedule-enrol/add", payload);
};
