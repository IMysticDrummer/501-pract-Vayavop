'use strict';

import { NotificationController}  from "./NotificationControler/NotificationController.js";
import { AdsController } from "./adsList/AdsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  const advertisements=new AdsController(document.querySelector('#advertisements'));

  const notificationElement=new NotificationController(document.querySelector("#notification"));
});