'use strict';

import { AdDetailController } from "./AdDetailController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js";
import { Spinner } from "../Spinner/Spinner.js";

document.addEventListener('DOMContentLoaded', () => {
  const spinnerContainer=document.querySelector('.spinnerContainer');
  const spinnerController=new Spinner(spinnerContainer);
  
  const adDetailViewContainer=document.querySelector('.adViewContainer');
  const notificationContainer=document.querySelector('.notification');

  const params=new URLSearchParams(location.search);
  const adId=params.get('id');
  
  const notificationController=new NotificationController(notificationContainer);
  const adDetailController=new AdDetailController(adDetailViewContainer);
  adDetailController.showAd(adId);

  const titleHeader=document.querySelector('#titleHeader');
  const titlePage=document.querySelector('title');
  titleHeader.innerHTML=titlePage.innerText;
});