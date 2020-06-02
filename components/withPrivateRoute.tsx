
import React from 'react';
import Router from 'next/router';
import { loginCheck } from '../store/actions/authAction';

const login = '/login?redirected=true'; // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = () => {
  return loginCheck(); // change null to { isAdmin: true } for test it.
};

export default  WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  
  

  return hocComponent;
};