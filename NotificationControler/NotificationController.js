'use strict';

import { pubSub } from "../pubSub.js";
import { buildNotificationView } from "./notification-view.js";

/**
 * Notification controller.
 * 
 * Show a notification in our web page.
 * A document element must be provided to contain
 * the notification.
 * 
 * Returns the next html code:
 * <p>message</p>
 * <button class="notification-button-close">cerrar</button>
 *
*/
export class NotificationController{
  /**
   * **Notification controller.**
   * 
   * Show a notification in our web page.
   * A document element must be provided to contain
   * the notification.
   * 
   * Returns the next html code:
   *  ```HTML
   *   <p>message</p>
   *   <button class="notification-button-close">cerrar</button>
   * ```
   * 
   * @param {Document.Element} nodeElement 
   */
  constructor(nodeElement){
    this.notificationElement=nodeElement;

    this.subscribeToEvents();    
  }

  subscribeToEvents(){
    pubSub.subscribe(pubSub.TOPICS.NOTIFICATION_ERROR, (message) => {
      this.showNotification(message);
    });
  };

  /**
   * Show the notification, containing the message, and with
   * a close button
   * @param {string || error} message 
   */
  showNotification(message) {
    this.notificationElement.innerHTML=buildNotificationView(message);

    const closeButtonElement=this.notificationElement.querySelector('.notification-button-close');
    
    closeButtonElement.addEventListener('click', ()=>{
      this.notificationElement.innerHTML="";
    });
  }
}