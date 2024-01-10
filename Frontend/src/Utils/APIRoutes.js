export const host = "http://localhost:8000";

export const userDetailsRoute = `${host}/userDetails`;
export const userLoginRoute = `${host}/user/login`;
export const getAllUsersRoute = `${host}/getUserDetails`;
export const getUserDetailsRoute = (id) => `${host}/get/user/details/${id}`;
