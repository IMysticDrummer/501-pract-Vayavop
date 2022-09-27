'use strict';

import { getAds } from "./adsProvider.js";
import { adsListViewBuilder, adsNotFoundBuilder, spinnerBuild } from "./adsListView.js";
import { pubSub } from "../pubSub.js";

export class AdsController {

  constructor(parentNode) {
    this.parentNode=parentNode;
    this.loadAds();
  };

  async loadAds(){
    //spinner
    const spinner=this.drawSpinner();

    //getting advertisements and quit spinner
    let ads;
    try {
      ads=await getAds();
    } catch (error) {
      //pubsub to notify
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, error);
    }
    spinner.classList.toggle('hide');

    //Show results
    if (!ads) {this.showAdsNotFound();};
    if (ads) {this.drawAds(ads);};
  };
  
  /**
   * Show *Advertisements not found* advise
   */
  showAdsNotFound(){
    const divElement=document.createElement('div');
    this.parentNode.appendChild(divElement);
    divElement.outerHTML=adsNotFoundBuilder();

  };

  /**
   * Draw the advertisements list received
   * @param {JSON} ads array of advertisements
   */
  drawAds(ads){
    for (const ad of ads) {
      //Create container
      const childElement=document.createElement('article');
      //Build the ad view in html
      const adView=adsListViewBuilder(ad);
      //Add the ad view to container
      childElement.innerHTML=adView;
      //Append the container to the parent node
      this.parentNode.appendChild(childElement);
    }
  };

  /**
   * Draw and return de spinner element
   * @returns document element pointing the spinner
   */
  drawSpinner(){
    this.parentNode.innerHTML=spinnerBuild();
    return document.querySelector('.spinner');
  };
};

