export let backendURL = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    backendURL = 'https://ihappy-api.herokuapp.com' // URL de produccion
}

export const endpoint = `${backendURL}/api`;

// AUTH API ROUTES
export const login = `${endpoint}/auth/login/`
export const signup = `${endpoint}/auth/register/`

// PROFILE USER
export const profile = `${endpoint}/users/profile/`
export const avatar = `${endpoint}/users/avatar/`
export const disable = (slug: string) => `${endpoint}/users/disable/${slug}`


export const getUsers = `${endpoint}/users/`
export const getDoctors = (limit?: Number) => `${endpoint}/users/doctors/?limit=${limit ? limit : ''}`
export const getPacients = `${endpoint}/users/pacients/`
export const getDoctorsBySpeciality = (name: String) => `${endpoint}/users/specialities/?name=${name}`
export const getCountDoctorsBySpeciality =  `${endpoint}/users/specialities/count`
export const getRoles = `${endpoint}/roles/`

export const getReviews = (slug: string) => `${endpoint}/reviews/${slug}`
export const sendReview = `${endpoint}/reviews/`

export const getSpecialty = `${endpoint}/specialities/`

export const getConversations = `${endpoint}/conversations/`
export const conversationStatus = (conversation:string) => `${endpoint}/conversations/?conversation=${conversation}`
export const getMessages = (conversation: string) => `${endpoint}/messages/?conversation=${conversation}`
export const postMessages =  `${endpoint}/messages/`

// EMAIL 
export const emails = `${endpoint}/emails/`
