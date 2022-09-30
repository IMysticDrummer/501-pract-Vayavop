'use strict';

import { apiConnector } from "../apiConnector.js";

export const getAdvertisement=async (adId) => {

  return await apiConnector.get(`${apiConnector.endPoints.getAdsList}/${adId}`);
  
};