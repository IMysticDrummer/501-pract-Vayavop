'use strict';

import { apiConnector } from "../apiConnector.js";

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
 * Ask API an advertisement, and return it
 * @param {integer} adId id of the advertisement
 * @returns advertisement
 */
 export const getAdById=async (adId) => {
  return await apiConnector.get(`${apiConnector.endPoints.getAdsList}/${adId}?_expand=user`);
  
};