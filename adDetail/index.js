'use strict';

import { AdDetailController } from "./AdDetailController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js";

document.addEventListener('DOMContentLoaded', () => {
  const adDetailViewContainer=document.querySelector('.adViewContainer');
  const notificationContainer=document.querySelector('.notification');

  const params=new URLSearchParams(location.search);
  const adId=params.get('id');
  
  const notificationController=new NotificationController(notificationContainer);
  const adDetailController=new AdDetailController(adDetailViewContainer);
  adDetailController.showAd(adId);
});