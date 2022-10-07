'use strict';

import { CreateAdController } from "./CreateAdController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js";
import { pubSub } from "../jsmodules/pubSub.js";
import { Spinner } from "/Spinner/Spinner.js";

document.addEventListener('DOMContentLoaded', async () => {
  const spinnerContainer=document.querySelector('.spinnerContainer');
  const spinner=new Spinner(spinnerContainer); 
   
  const notificationElement=document.querySelector('.notification');
  const notificationController=new NotificationController(notificationElement);
  
  const createAdFormElement=document.querySelector('#createAdForm');
  try{
    await userIdentified();
  } catch (error) {
    createAdFormElement.innerHTML="";
    pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "You are not identified. Please login...");
    setTimeout(()=>{window.location="../UserIdentification"}, 1500);
    return;
  }
  
  const createAdController=new CreateAdController(createAdFormElement);

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