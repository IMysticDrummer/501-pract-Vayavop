'use strict';

/**
 * HTML string containing:  
 * - **paragraph class "errorNotification"** if error
 * - **paragraph class "successNotification"** if it's successful
 * 
 * @param {string} message 
 * @param {boolean} success optionnel. True is it's an success message
 * @returns string html formatted
 */
export const buildNotificationView=(message,success)=>{
  if (success) {
    return `
      <p class="successNotification">${message}</p>
      <button class="notification-button-close">Close</button>
    `;
  }
  return `
      <p class="errorNotification">${message}</p>
      <button class="notification-button-close">Close</button>
    `;
};