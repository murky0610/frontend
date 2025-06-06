/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RepositoryInterface } from '@/interface/repository.interface';
import { UserRegisterInterface, userRegisterSchema } from '@/schema/user-register.schema';
// Create an Axios instance with a predefined baseURL


//const baseURL = "https://core-five-orpin.vercel.app/api"

const apiClient = axios.create({
  baseURL: 'https://core-five-orpin.vercel.app/api/',
  withCredentials: true, // Include credentials with requests if needed
  headers: {
    "Content-Type": "application/json",
  },
});


// Login function utilizing the Axios instance
export const userLogin = async (email: any, password: any) => {
    try {
      const response = await apiClient.post('token/', {
        username: email,
        password: password,
      });
      console.log("this is the response data: ", response);


      return response.data.success;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  export const refreshToken = async () => {

    try {
      const response = await apiClient.post('token/refresh/')
      console.log("this is refresh token: ", response);
      return response.data.refreshed;
    } catch (error) {
      // Logout user if refresh fails
      //logout()
    }
  }
  
  export const userLogout = async () => {

    const response = await apiClient.post('logout/')
    return response.data;

  }
  export const userRegister = async (userData: UserRegisterInterface) => {
    try {
      const response = await apiClient.post('register/', 
        userData
      
    );

      console.log("this is the response data: ", response);

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  export const displayMyRepositories = async() =>{
    try {
      // Override the default withCredentials setting for this specific call
      // by passing a configuration object to the get method.
      const response = await apiClient.get('repositories', {
        withCredentials: false // Explicitly set to false for this request
      });
      return response.data;
    }
    catch(error){
      console.error('Fetching Repositories error: ', error);
      // Re-throw the error so the caller can handle it
      throw error;
    }
  }

export const addMyRepository = async (repository: Omit<RepositoryInterface, 'id' | 'user'>) => {
  try {
    const response = await apiClient.post('repositories/create', repository);
    console.log("this is the response: ", response);
    return response;
  } catch (error) {
    console.error('Adding Repositories error: ', error);
    throw error;
  }
};
export const editMyRepository = async (id: number, repository: Partial<RepositoryInterface>) => {
  try {
  
    const response = await apiClient.patch(`repositories/${id}`, repository);
    console.log("this is the edit response: ", response);
    return response.data;
  } catch (error) {
    console.error('Updating Repository error:', error);
    throw error;
  }
};

export const deleteMyRepository = async (id: number) => {
  try {
    const response = await apiClient.delete(`repositories/${id}`);
    console.log("Repository deleted:", response);
    return response.data;
  } catch (error) {
    console.error('Deleting Repository error:', error);
    throw error;
  }
};


export const displayUserRepositories = async(userId?: number) =>{

  try {
    const response = await apiClient.get(`users/${userId}/repositories`);
    return response.data;
  }
  catch(error){
    console.error('Fetching Repositories error: ', error);
    throw error;
  }
}

export const getCurrentUser = async() =>{
  try{

   const response = await apiClient.get(`users/me`);
    return response.data;
  }
  catch(error){
    console.error('Error: ', error);
    throw error;
  }
}

export const editCurrentUser = async(firstName:string, lastName:string, email:string, userId: any) =>{
  try{
    const numericUserId = Number(userId);
    const response = await apiClient.patch(`users/edit-current-user/${numericUserId}`,{
      first_name: firstName,
      last_name:lastName,
      email,
    });
    console.log("thisi the server response: ", response);

  }
  catch(error){
    console.error('Error: ', error);
    throw error;
  }
}

export const getAllUsers = async() => {
  try{
    const response = await apiClient.get(`users/`);
    console.log("data from all users: ", response);
    return response.data;
  }
  catch(error){
    console.error('Get All Users error: ', error);
    throw error;
  }
}
// export const editUserRepositories = async() =>{

//   try {
//     const response = await apiClient.get(`users/${id}/repositories/${respository_id}`);
//     return response.data;
//   }
//   catch(error){
//     console.error('Fetching Repositories error: ', error);
//     throw error;
//   }
// }