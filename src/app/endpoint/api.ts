/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RepositoryInterface } from '@/interface/repository.interface';
// Create an Axios instance with a predefined baseURL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true, // Include credentials with requests if needed
  headers: {
    "Content-Type": "application/json", // Ensure JSON format
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

      //Store token for easy refresh token implementation
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      
      return response.data.success;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    
    try {
      const response = await apiClient.post('/token/refresh/', { 
        refresh: refreshToken 
      })
      
      localStorage.setItem('accessToken', response.data.access)
      return response.data.access
    } catch (error) {
      // Logout user if refresh fails
      //logout()
    }
  }
  
  // export const logout = async () => {

  //   const response = await apiClient.post('/logout')
  //   localStorage.removeItem('accessToken')
  //   localStorage.removeItem('refreshToken')
  //   return response.data

  // }
  export const userRegister = async ( email: string, password: string, role: string) => {
    try {
      const response = await apiClient.post('register/', {
        email, password, role
      }
    );
      console.log("this is the response data: ", response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

export const displayMyRepositories = async() =>{

  try {
    const response = await apiClient.get('repositories');
    return response.data;
  }
  catch(error){
    console.error('Fetching Repositories error: ', error);
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


export const displayUserRepositories = async() =>{

  try {
    const response = await apiClient.get(`users/${id}/repositories`);
    return response.data;
  }
  catch(error){
    console.error('Fetching Repositories error: ', error);
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