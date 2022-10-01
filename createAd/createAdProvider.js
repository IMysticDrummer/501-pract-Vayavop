'use strict';

import { apiConnector } from "../apiConnector.js";

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