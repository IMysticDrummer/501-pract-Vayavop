'use strict';

import { AdsController } from "./adsList/AdsController.js";

document.addEventListener('DOMContentLoaded',()=>{
  const advertisements=new AdsController(document.querySelector('#advertisements'));
});