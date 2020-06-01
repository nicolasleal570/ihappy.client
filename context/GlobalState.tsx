import React from 'react';

import AppReducer from './AppReducer';


const user = {
    firstname: 'Gianluca',
    lastname: 'Di Bella'
}

const initialState = {
    user: user
}

// Create Context
export const GlobalContext = React.createContext(initialState);

// Provider Component
interface GlobalProviderProps { children: React.ReactChild | Array<React.ReactChild> }

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [state, dispatch]: any = React.useReducer(AppReducer, initialState);

    return (
        <GlobalContext.Provider value={{
            user: state.user
        }}>{children}</GlobalContext.Provider>
    )
}
