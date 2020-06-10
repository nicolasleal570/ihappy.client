let url = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    url = 'https://ihappy-api.herokuapp.com' // URL de produccion
}

export const endpoint = `${url}/api`;

// AUTH API ROUTES
export const login = `${endpoint}/auth/login/`
export const signup = `${endpoint}/auth/register/`

// PROFILE USER
export const profile = `${endpoint}/users/profile/`
export const avatar = `${endpoint}/users/avatar/`

export const getUsers = `${endpoint}/users/`
export const getDoctors = (limit?: Number) => `${endpoint}/users/doctors/?limit=${limit ? limit : ''}`
export const getDoctorsBySpeciality = (name: String) => `${endpoint}/users/specialities/?name=${name}`
export const getRoles = `${endpoint}/roles/`

export const getReviews = (slug: string) => `${endpoint}/reviews/${slug}`
export const sendReview = `${endpoint}/reviews/`

export const getSpecialty = `${endpoint}/specialities/`


// EMAIL 

export const emails = `${endpoint}/emails/`
