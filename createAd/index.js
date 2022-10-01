'use strict';

import { CreateAdController } from "./CreateAdController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js";

document.addEventListener('DOMContentLoaded',() => {
  const createAdFormElement=document.querySelector('#createAdForm');
  const notificationElement=document.querySelector('.notification');

  const createAdController=new CreateAdController(createAdFormElement);
  const notificationController=new NotificationController(notificationElement);
  
});