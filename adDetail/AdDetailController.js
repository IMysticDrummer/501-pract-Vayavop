'use strict';

import { pubSub } from "../jsmodules/pubSub.js";
import { getAdById, deleteApiAdById } from "/jsmodules/advertisementProvider.js";
import { buildAdDetailView } from "./adDetailView.js";
import { controlLoggedOwner } from "../jsmodules/controlLoggedOwner.js";

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
      const adObject=await getAdById(adId);
      ad=adObject.data;
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Advertisement doesn't exist");
      return;
    };
    this.adDetailViewContainer.innerHTML=buildAdDetailView(ad);
    if (controlLoggedOwner(ad)) {
      this.addEditButton(adId);
      this.addDeteleButton(adId);
    };
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE,'');
  };

  /**
   * Configure the edit advertisement button
   * @param {number} adId advertisement identification
   */
  addEditButton(adId){
    const editButtonElement=document.createElement('button');
    editButtonElement.textContent='Edit this advertisement';
    this.adDetailViewContainer.appendChild(editButtonElement);
    editButtonElement.addEventListener('click', () => {
      window.location=`/editAd/index.html?id=${adId}`;
    });
  };

  /**
   * Configure the delete advertisement button
   * @param {number} adId advertisement identification
   */
  addDeteleButton(adId){
    const deleteButtonElement=document.createElement('button');
    deleteButtonElement.textContent='Delete this advertisement';
    this.adDetailViewContainer.appendChild(deleteButtonElement);
    deleteButtonElement.addEventListener('click', () => {
      this.removeAdById(adId);
    });
  };

  /**
   * Makes the advertisement delete
   * @param {number} adId advertisement identification
   */
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