let url = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    url = '' // URL de produccion
}

export const endpoint = `${url}/api`;

// AUTH API ROUTES
export const login = `${endpoint}/auth/login/`


export const getUsers = `${endpoint}/users/`
