/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RepositoryInterface } from '@/interface/repository.interface';
import { UserRegisterInterface, userRegisterSchema } from '@/schema/user-register.schema';
import { ProvinceCommodityMap } from '@/interface/directory.inteface';
// Create an Axios instance with a predefined baseURL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true, // Include credentials with requests if needed
  headers: {
    'Content-Type': 'application/json', // Ensure JSON format
  },
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      // For example, redirect to login page or display an error message
      window.location.href = '/login';
    }

    console.log('error not authetincated', error);
    return Promise.reject(error);
  },
);

export const displayDirectories = async (): Promise<ProvinceCommodityMap> => {
  try {
    const response = await apiClient.get<ProvinceCommodityMap>('directories/sorted/');
    return response.data;
  } catch (err) {
    console.error('Error fetching owners by province:', err);
    throw err;
  }
};

export const displayCommoditiesInProvince = async () => {
  try {
    const response = await apiClient.get('directories/unique/');
    return response.data;
  } catch (err) {
    console.error('Error fetching owners by province:', err);
    throw err;
  }
};
// Login function utilizing the Axios instance
export const userLogin = async (email: any, password: any) => {
  try {
    const response = await apiClient.post('token/', {
      username: email,
      password: password,
    });
    console.log('this is the response data: ', response);

    return response.data.success;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/token/refresh/');
    console.log('this is refresh token: ', response);
    return response.data.refreshed;
  } catch (error) {
    // Logout user if refresh fails
    //logout()
  }
};

export const userLogout = async () => {
  const response = await apiClient.post('/logout/');
  return response.data;
};
export const userRegister = async (userData: UserRegisterInterface) => {
  try {
    const response = await apiClient.post('register/', userData);

    console.log('this is the response data: ', response);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const displayMyRepositories = async () => {
  try {
    // Override the default withCredentials setting for this specific call
    // by passing a configuration object to the get method.
    const response = await apiClient.get('repositories', {
      withCredentials: false, // Explicitly set to false for this request
    });
    return response.data;
  } catch (error) {
    console.error('Fetching Repositories error: ', error);
    // Re-throw the error so the caller can handle it
    throw error;
  }
};

export const addMyRepository = async (repository: Omit<RepositoryInterface, 'id' | 'user'>) => {
  try {
    const response = await apiClient.post('repositories/create', repository);
    console.log('this is the response: ', response);
    return response;
  } catch (error) {
    console.error('Adding Repositories error: ', error);
    throw error;
  }
};
export const editMyRepository = async (id: number, repository: Partial<RepositoryInterface>) => {
  try {
    const response = await apiClient.patch(`repositories/${id}`, repository);
    console.log('this is the edit response: ', response);
    return response.data;
  } catch (error) {
    console.error('Updating Repository error:', error);
    throw error;
  }
};

export const deleteMyRepository = async (id: number) => {
  try {
    const response = await apiClient.delete(`repositories/${id}`);
    console.log('Repository deleted:', response);
    return response.data;
  } catch (error) {
    console.error('Deleting Repository error:', error);
    throw error;
  }
};

export const displayUserRepositories = async (userId?: number) => {
  try {
    const response = await apiClient.get(`users/${userId}/repositories`);
    return response.data;
  } catch (error) {
    console.error('Fetching Repositories error: ', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`users/me`);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const editCurrentUser = async (
  firstName: string,
  lastName: string,
  email: string,
  userId: any,
) => {
  try {
    const numericUserId = Number(userId);
    const response = await apiClient.patch(`users/edit-current-user/${numericUserId}`, {
      first_name: firstName,
      last_name: lastName,
      email,
    });
    console.log('thisi the server response: ', response);
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(`users/`);
    console.log('data from all users: ', response);
    return response.data;
  } catch (error) {
    console.error('Get All Users error: ', error);
    throw error;
  }
};
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
