import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {

    try {
        const response = await axios.post('/workspaces', { name, description}, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in create workspace request', response);
        return response?.data?.data;

    } catch(error) {
        console.log('Error in create workspace request', error);
        throw error.response.data;
    }
};

export const fetchWorkspacesRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspaces', {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in fetch workspace request', response);
        return response?.data?.data || []; // Ensure it returns an array
    } catch (error) {
        console.log('Error in fetching workspace request', error);
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in fetching workspace details request', response);
        return response?.data?.data;
    } catch(error) {
        console.log('Error in fetching workspace details request', error);
        throw error.response.data;
    }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token}) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch(error) {
        console.log('Error in deleting workspace request', error);
        throw error.response.data;
    }
};

export const updateWorkspaceRequest = async ({ workspaceId, name, token}) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}`, { name }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch(error) {
        console.log('Error in updating workspace request', error);
        throw error.response.data;
    }
};