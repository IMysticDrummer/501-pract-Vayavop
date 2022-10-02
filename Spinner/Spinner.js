'use strict';

import { pubSub } from "../pubSub.js";

export class Spinner {
  constructor(nodeElement){
    this.spinnerContainer=nodeElement;
    this.spinnerContainer.innerHTML=this.spinnerBuild();
    this.spinnerElement=this.spinnerContainer.querySelector('.spinner');
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    pubSub.subscribe(pubSub.TOPICS.SPINNER_HIDE_SHOW, ()=>{
      this.hide_showSpinner();
    });

    pubSub.subscribe(pubSub.TOPICS.SPINNER_DELETE, ()=>{
      this.deleteSpinner();
    });
  };

  spinnerBuild(){
    let spinner=`
      <div class="spinner">
        <div></div>
        <div></div><div></div><div></div>
        <div></div><div></div><div></div>
        <div></div>
      </div>
    `;
  
    return spinner;
  };

  hide_showSpinner(){
    this.spinnerElement.classList.toggle('hide');
  };

  deleteSpinner(){
    this.createHeadLink.outerHTML='';
    this.spinnerContainer.innerHTML='';
  }
};