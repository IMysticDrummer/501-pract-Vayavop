'use strict';

import { apiConnector } from "/jsmodules/apiConnector.js";

/**
 * Ask API an advertisement paged list, and return it.
 * Make filter if it's demanded.
 * @param {string} searchConcept string containing searching pattern
 * @returns advertisementList
 */
 export const getAdsList=async (searchConcept, page) => {

  if (searchConcept) page=1;
  let endPoint=apiConnector.endPoints.getAdsList+`?_page=${page || 1}`;
  if (searchConcept) {endPoint+=`&product_like=${searchConcept}`};

  const response=await apiConnector.get(endPoint);
  return response;
};

/**
 * Ask API an advertisement, and return it
 * @param {integer} adId id of the advertisement
 * @returns advertisement
 */
export const getAdById=async (adId) => {
  return await apiConnector.get(`${apiConnector.endPoints.getAdsList}/${adId}?_expand=user`);
  
};

/**
 * Ask API **DELETE** an advertisement
 * @param {integer} adId id of the advertisement
 * @returns 
 */
export const deleteApiAdById=async (adId) => {
  return await apiConnector.delete(`${apiConnector.endPoints.getAdsList}/${adId}`);
};

/**
 * Ask API to create a new advertisement.
 * Data must be an object containing fields
 * and values
 * @param {object} data 
 * @returns 
 */
 export const createApiAd =async (data) => {

  return await apiConnector.post(apiConnector.endPoints.getAdsList, data);

};

/**
 * Ask API to update a new advertisement.
 * Data must be an object containing fields
 * and values
 * @param {number} adId
 * @param {object} data 
 * @returns 
 */
 export const updateApiAd =async (adId, data) => {

  return await apiConnector.put(`${apiConnector.endPoints.getAdsList}/${adId}`,data);

};

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