'use strict';

import { apiConnector } from "../apiConnector.js";

/**
 * Ask API an advertisement, and return it
 * @param {integer} adId id of the advertisement
 * @returns advertisement
 */
export const getAdById=async (adId) => {
  return await apiConnector.get(`${apiConnector.endPoints.getAdsList}/${adId}?_expand=user`);
  
};

/**
 * Ask API **ERASE/DELETE** an advertisement
 * @param {integer} adId id of the advertisement
 * @returns 
 */
export const eraseApiAdById=async (adId) => {
  return await apiConnector.delete(`${apiConnector.endPoints.getAdsList}/${adId}`);
};