'use strict';

import { EditAdController } from "./EditAdController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js";
import { pubSub } from "../pubSub.js";
import { Spinner } from "/Spinner/Spinner.js";

document.addEventListener('DOMContentLoaded', async () => {
  const spinnerContainer=document.querySelector('.spinnerContainer');
  const spinner=new Spinner(spinnerContainer); 
   
  const notificationElement=document.querySelector('.notification');
  const notificationController=new NotificationController(notificationElement);
  
  const editAdFormElement=document.querySelector('#editAdForm');
  try{
    await userIdentified();
  } catch (error) {
    editAdFormElement.innerHTML="";
    pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "You are not identified. Please login...");
    setTimeout(()=>{window.location="../UserIdentification"}, 1500);
    return;
  }

  const params=new URLSearchParams(location.search);
  const adId=params.get('id');
  
  const editAdController=new EditAdController(editAdFormElement);
  editAdController.showAd(adId)

  const titleHeader=document.querySelector('#titleHeader');
  const titlePage=document.querySelector('title');
  titleHeader.innerHTML=titlePage.innerText;
  
});

function userIdentified() {
  const  tokenExist=localStorage.getItem('token');

  return new Promise ((resolve, reject) => {
    if (!tokenExist) {
      reject();
    } else {resolve();};
    return;
  });
}