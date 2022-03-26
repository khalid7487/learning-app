import {post} from "../common/http";

export const getDemoPaginationData = (payload:any) => {
    return post('/vehicletrip/home', payload)
};