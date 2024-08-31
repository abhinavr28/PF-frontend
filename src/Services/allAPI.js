
import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"


// register API
export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/register`,user,"")
}

// login api

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/login`,user,"")
}

// add project api

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/addprojects`,reqBody,reqHeader)
}
// get home projects api

export const getHomeProjectsAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/homeprojects`,"","")
}
// getAllUserProject api
export const getAllUserProjectsAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/alluserprojects?search=${searchKey}`,"",reqHeader)
}

// get user projects api
export const getUserProjectsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/userprojects`,"",reqHeader)
}
// edituserpeojectAPI
export const editUserProjectsAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/edit/${id}`,reqBody,reqHeader)
}

// deleteProjectsApi

export const deleteUserProjectsAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/remove/${id}`,{},reqHeader)
}