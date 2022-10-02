'use strict';

import { NotificationController}  from "./NotificationControler/NotificationController.js";
import { AdsController } from "./adsList/AdsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  const advertisements=new AdsController(document.querySelector('#advertisements'));

  const notificationElement=new NotificationController(document.querySelector("#notification"));
  
  const titleHeader=document.querySelector('#titleHeader');
  const titlePage=document.querySelector('title');
  titleHeader.innerHTML=titlePage.innerText;

  const createAdLink=document.querySelector('#createAd');
  if (!localStorage.getItem('token')){
    createAdLink.innerHTML="";
  };

  const prueba=document.createElement('link');
  prueba.rel="stylesheet";
  prueba.href="/";
  const head=document.querySelector('head');
  head.appendChild(prueba);

});