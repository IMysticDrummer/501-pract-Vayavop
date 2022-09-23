'use strict';

import { getAds } from "./adsProvider.js";
import { adsListViewBuilder, adsNotFoundBuilder, spinnerBuild } from "./adsListView.js";

export class AdsController {

  constructor(parentNode) {
    this.parentNode=parentNode;
    this.loadAds();
  };

  async loadAds(){
    const spinner=this.drawSpinner();
    let ads;

    //Get advertisements
    try {
      ads=await getAds();
    } catch (error) {
      alert(error);
    }
    spinner.classList.toggle('hide');

    //Show results
    if (!ads) {this.showAdsNotFound();};
    if (ads) {this.drawAds(ads);};
  };
  
  /**
   * Show "Advertisements not found" advise
   */
  showAdsNotFound(){
    const divElement=document.createElement('div');
    this.parentNode.appendChild(divElement);
    divElement.outerHTML=adsNotFoundBuilder();

  };

  /**
   * Draw the advertisement list received
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

