'use strict';

import { pubSub } from "../pubSub.js";
import { getAdById, deleteApiAdById } from "/jsmodules/advertisementProvider.js";
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
      this.addEditButton(adId);
      this.addDeteleButton(adId);
    };
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
  };

  controlLoggedOwner(ad){
    const logged=localStorage.getItem('token');
    if (!logged) return false;
    const jwt=logged.split('.')[1];
    const jwtDecoded=JSON.parse(window.atob(jwt));
    const userJwtId=jwtDecoded.userId;
    if (userJwtId===ad.userId) {return true;};
    return false;
  };

  addEditButton(adId){
    const editButtonElement=document.createElement('button');
    editButtonElement.textContent='Edit this advertisement';
    this.adDetailViewContainer.appendChild(editButtonElement);
    editButtonElement.addEventListener('click', () => {
      window.location=`/editAd/index.html?id=${adId}`;
    });
  };

  addDeteleButton(adId){
    const deleteButtonElement=document.createElement('button');
    deleteButtonElement.textContent='Delete this advertisement';
    this.adDetailViewContainer.appendChild(deleteButtonElement);
    deleteButtonElement.addEventListener('click', () => {
      this.removeAdById(adId);
    });
  };

  async removeAdById(adId){
    const response=window.confirm('Really do you want to DELELTE this advertisement?!!');
    if (response) {
      try {
        await deleteApiAdById(adId);
        window.alert('This advertisement has been succesfully DELETED');
        window.location="/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'Error erasing this advertisement');
      };
    }
  };
};