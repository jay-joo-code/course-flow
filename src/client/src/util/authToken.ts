
export const getAuthToken = () => localStorage.getItem('authToken');

export const setAuthToken = token => localStorage.setItem('authToken', token);

export const resetAuthToken = () => localStorage.removeItem('authToken');