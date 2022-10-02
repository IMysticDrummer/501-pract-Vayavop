'use strict';

import { pubSub } from "../pubSub.js";
import { getAdById, eraseApiAdById } from "./adDetailProvider.js";
import { buildAdDetailView } from "./adDetailView.js";

export class AdDetailController {
  /**
   * Define an advertisement detail controller.
   *
   * @param {document.nodeElement} nodeElement 
   */
  constructor(nodeElement){
    this.adDetailViewContainer=nodeElement;
  };

  /**
   * Show the advertisement detail.
   * Show a notification if advertisement doesn't exits
   * @param {advertisement objetc} adId 
   */
  async showAd(adId){
    let ad;
    try {
      ad=await getAdById(adId);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Advertisement doesn't exist");
      return;
    };
    this.adDetailViewContainer.innerHTML=buildAdDetailView(ad);
    if (this.controlLoggedOwner(ad)) {
      this.addEraseButton(adId);
    };
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
  };

  controlLoggedOwner(ad){
    const logged=localStorage.getItem('token');
    const jwt=logged.split('.')[1];
    const jwtDecoded=JSON.parse(window.atob(jwt));
    const userJwtId=jwtDecoded.userId;
    if (userJwtId===ad.userId) {return true;};
    return false;
  };

  addEraseButton(adId){
    const eraseButtonElement=document.createElement('button');
    eraseButtonElement.textContent='Erase this advertisement';
    this.adDetailViewContainer.appendChild(eraseButtonElement);
    eraseButtonElement.addEventListener('click', () => {
      this.removeAdById(adId);
    });
  };

  async removeAdById(adId){
    const response=window.confirm('Really do you want to ERASE this advertisement?!!');
    if (response) {
      try {
        await eraseApiAdById(adId);
        window.alert('This advertisement has been succesfully ERASED');
        window.location="/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'Error erasing this advertisement');
      };
    }
  };
};