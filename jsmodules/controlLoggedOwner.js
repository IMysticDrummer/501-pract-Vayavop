'use strict';

/**
 * Returns true if the advertisment owns to the logged user
 * @param {advertisement} ad 
 * @returns true || false
 */
export function controlLoggedOwner(ad){
  const logged=localStorage.getItem('token');
  const jwt=logged.split('.')[1];
  const jwtDecoded=JSON.parse(window.atob(jwt));
  const userJwtId=jwtDecoded.userId;
  if (userJwtId===ad.userId) {return true;};
  return false;
};