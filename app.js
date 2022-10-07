'use strict';

import { Spinner } from "/Spinner/Spinner.js";
import { NotificationController}  from "./NotificationControler/NotificationController.js";
import { AdsController } from "./adsList/AdsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  const spinnerContainer=document.querySelector('.spinnerContainer');
  const spinner=new Spinner(spinnerContainer);

  const advertisements=new AdsController(
    document.querySelector('#advertisements'),
    document.querySelector('.searchContainer')
  );

  const notificationElement=new NotificationController(document.querySelector("#notification"));
  
  const titleHeader=document.querySelector('#titleHeader');
  const titlePage=document.querySelector('title');
  titleHeader.innerHTML=titlePage.innerText;

  const createAdLink=document.querySelector('#createAd');
  if (!localStorage.getItem('token')){
    createAdLink.innerHTML="";
  };
});