'use strict';

import { adsController } from "./adsList/adsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  adsController(document.querySelector('#advertisements'));
});