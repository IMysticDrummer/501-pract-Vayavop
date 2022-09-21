'use strict';

import { adsController } from "./adsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  adsController(document.querySelector('#advertisements'));
});