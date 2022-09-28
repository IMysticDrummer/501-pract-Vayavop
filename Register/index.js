'use strict';

import { RegisterController } from "./RegisterController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js"

document.addEventListener('DOMContentLoaded', () => {
  const registerFormElement=document.querySelector('.registerForm');

  const registerController=new RegisterController(registerFormElement);

  const notificationElement=new NotificationController(document.querySelector("#notification"));
});