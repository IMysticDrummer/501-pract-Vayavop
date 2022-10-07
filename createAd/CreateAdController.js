'use strict';

import { createApiAd } from "/jsmodules/advertisementProvider.js";
import { pubSub } from "../jsmodules/pubSub.js";
import { Advertisement } from "../Advertisement/Advertisement.js";

export class CreateAdController {
  /**
   * Advertisements create controller
   * @param {document.element} nodeElemnt 
   */
  constructor(nodeElemnt){
    this.createAdFormElement=nodeElemnt;

    this.subscribeToEvents();
  };

  subscribeToEvents(){
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE,'');
    
    this.createAdFormElement.addEventListener('submit', (event) => {
      event.preventDefault();

      pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');
      this.createAdvertisement();
    });
  };

  /**
   * Ask the advertisement creation.
   * Return error if it's not possible
   * @returns 
   */
  async createAdvertisement() {
    const formData = new FormData(this.createAdFormElement);
    let adObject;
    try {
      adObject=new Advertisement(
        formData.get('articleInput'),
        formData.get('descriptionInput'),
        parseFloat(formData.get('priceInput')),
        formData.get('selling'),
        formData.get('photoInput')
      );
      
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `Error de datos-> ${error}`);
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE,'');
      return;
    }

    try {
      await createApiAd(adObject);
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_OK, "Advertisement created. Redirecting main window");
      setTimeout(()=>window.location="/", 1500);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Fail creating advertisement");
    }
    
  };
};