'use strict';

import { pubSub } from "../pubSub.js";
import { getAdvertisement } from "./adDetailProvider.js";
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
    try {
      const ad=await getAdvertisement(adId);
      this.adDetailViewContainer.innerHTML=buildAdDetailView(ad);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Advertisement doesn't exist");
    };
  };
};