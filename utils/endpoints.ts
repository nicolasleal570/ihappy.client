let url = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    url = 'https://ihappy-psychologists.herokuapp.com' // URL de produccion
}

export const endpoint = `${url}/api`;

// AUTH API ROUTES
export const login = `${endpoint}/auth/login/`
export const signup = `${endpoint}/auth/register/`

// PROFILE USER
export const profile = `${endpoint}/users/profile/`
export const avatar = `${endpoint}/users/avatar/`


export const getUsers = `${endpoint}/users/`
export const getRoles = `${endpoint}/roles`

// EMAIL 

export const emails = `${endpoint}/emails/`