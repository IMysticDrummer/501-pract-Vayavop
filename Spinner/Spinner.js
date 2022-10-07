'use strict';

import { pubSub } from "../jsmodules/pubSub.js";

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
    pubSub.subscribe(pubSub.TOPICS.SPINNER_HIDE, ()=>{
      this.hideSpinner();
    });
    pubSub.subscribe(pubSub.TOPICS.SPINNER_SHOW, ()=>{
      this.showSpinner();
    });

    pubSub.subscribe(pubSub.TOPICS.SPINNER_DELETE, ()=>{
      this.deleteSpinner();
    });
  };

  /**
   * 
   * @returns string containin html code for the spinner
   */
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

  /**
   * Toggle the spinner between hide and show
   */
  hide_showSpinner(){
    this.spinnerElement.classList.toggle('hide');
  };

  /**
   * Hide the spinner without delete it
   */
  hideSpinner(){
    this.spinnerElement.classList.add('hide');
  };
  /**
   * Show the spinner
   */
  showSpinner(){
    this.spinnerElement.classList.remove('hide');
  };

  /**
   * DELETE the spinner definitilly
   */
  deleteSpinner(){
    this.createHeadLink.outerHTML='';
    this.spinnerContainer.innerHTML='';
  }
};