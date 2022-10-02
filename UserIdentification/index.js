'use strict';

import { Spinner } from "/Spinner/Spinner.js";
import { UserIdController } from "./UserIdController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js"

document.addEventListener('DOMContentLoaded', () => {
  const spinnerContainer=document.querySelector('.spinnerContainer');
  const spinner=new Spinner(spinnerContainer);

  const registerFormElement=document.querySelector('.registerForm');

  const typeFunction=setTitlesAndFunction();
  const registerController=new UserIdController(registerFormElement, typeFunction);

  const notificationElement=new NotificationController(document.querySelector("#notification"));
});

/**
 * Get the *type* URL param, set titles
 * according the function selected and
 * return a string with the *type*
 * @returns string
 */
function setTitlesAndFunction() {
  const titlePage=document.querySelector('title');
  const titleHeader=document.querySelector('.titleHeader');
  const buttonSubmitForm=document.querySelector('.submit');
  const params=new URLSearchParams(location.search);
  const typeFunction=params.get('type');
  let title;

  typeFunction==="sign" ? title="SignUp" : title="Login";
  buttonSubmitForm.innerText=title;
  titlePage.innerText=title+" Page";
  titleHeader.innerHTML=title+" Page";
  return typeFunction;
};