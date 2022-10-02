'use strict';

import { createApiAd } from "./createAdProvider.js";
import { pubSub } from "../pubSub.js";

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
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
    this.createAdFormElement.addEventListener('submit', (event) => {
      event.preventDefault();

      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.createAdvertisement();
    });
  };

  async createAdvertisement() {
    const formData = new FormData(this.createAdFormElement);
    const adObject={
      product: formData.get('articleInput'),
      description: formData.get('descriptionInput'),
      photo: formData.get('photoInput'),
      price: parseFloat(formData.get('priceInput')),
      sell: formData.get('selling')==="true"
    };

    try {
      //TODO data validation
      
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `Error de datos: ${error}`);
    }

    try {
      await createApiAd(adObject);
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_OK, "Advertisement created. Redirecting main window");
      setTimeout(()=>window.location="/", 1500);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Fail creating advertisement");
    }
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
  };
};