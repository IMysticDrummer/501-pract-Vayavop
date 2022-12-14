'use strict';

import { updateApiAd,getAdById } from "/jsmodules/advertisementProvider.js";
import { pubSub } from "../jsmodules/pubSub.js";
import { Advertisement } from "../Advertisement/Advertisement.js";
import { controlLoggedOwner } from "../jsmodules/controlLoggedOwner.js";

export class EditAdController {
  /**
   * Advertisements create controller
   * @param {document.element} nodeElemnt 
   */
  constructor(nodeElemnt){
    this.editAdFormElement=nodeElemnt;

    this.subscribeToEvents();
  };

  /**
   * Show the advertisement detail.
   * Show a notification if advertisement doesn't exits.
   * Exit to main page if user<>owner
   * @param {Advertisement objetc} adId 
  */
  async showAd(adId){
    pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');

    this.adId=adId;
    let ad;
    try {
      const adObjet=await getAdById(adId);
      ad=adObjet.data;
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Advertisement doesn't exist");
      return;
    };


    if (!controlLoggedOwner(ad)) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "You are not the owner of this adevertisement");
      setTimeout(()=>{window.location='/';},1000);
      return;
    };

    this.fillEditForm(ad);
    
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE,'');
  };

  /**
   * Fill the edit form field with the advertisement data
   * @param {Advertisement expanded} ad 
   */
  fillEditForm(ad){
    const articleInput=this.editAdFormElement.querySelector('#articleInput');
    const descriptionInput=this.editAdFormElement.querySelector('.descriptionInput');
    const photoInput=this.editAdFormElement.querySelector('#photoInput');
    const priceInput=this.editAdFormElement.querySelector('#priceInput');
    const sellRadioInput=this.editAdFormElement.querySelector('#selling');
    const searchRadioInput=this.editAdFormElement.querySelector('#searching');

    articleInput.value=ad.product;
    descriptionInput.value=ad.description;
    photoInput.value=ad.photo;
    priceInput.value=ad.price;
    if (ad.sell) {
      sellRadioInput.setAttribute('checked','');
    } else {
      searchRadioInput.setAttribute('checked','');
    };
  };

  subscribeToEvents(){
    this.editAdFormElement.addEventListener('submit', (event) => {
      event.preventDefault();

      pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');
      this.editAdvertisement();
    });
  };

  /**
   * Request the advertisement update. Returns an error if it's not possible
   * @returns 
   */
  async editAdvertisement() {
    const formData = new FormData(this.editAdFormElement);
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
      await updateApiAd(this.adId, adObject);
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_OK, "Advertisement updated. Redirecting main window");
      setTimeout(()=>window.location="/", 1500);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, "Fail updating advertisement");
    }
    
  };
};