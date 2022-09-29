'use strict';

import { apiConnector } from "../apiConnector.js";

/**
 * Ask API to create an user
 * @param {string} username 
 * @param {string} password 
 */
export const createApiUser= async (username,password) => {
  const body={
    username,
    password
  };

  await apiConnector.post(apiConnector.endPoints.register,body);
};

/**
 * Ask API to log an user.
 * Return the token if everything's ok
 * @param {string} username 
 * @param {string} password 
 * @returns token
 */
export const loginApiUser= async (username,password) => {
  const body={
    username,
    password
  };

  const data=await apiConnector.post(apiConnector.endPoints.login,body);
  return data.accessToken;
};