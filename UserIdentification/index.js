'use strict';

import { UserIdController } from "./UserIdController.js";
import { NotificationController } from "../NotificationControler/NotificationController.js"

document.addEventListener('DOMContentLoaded', () => {
  const registerFormElement=document.querySelector('.registerForm');

  const registerController=new UserIdController(registerFormElement);

  const notificationElement=new NotificationController(document.querySelector("#notification"));
});