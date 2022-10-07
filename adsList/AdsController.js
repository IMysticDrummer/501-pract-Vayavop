'use strict';

import { adsListViewBuilder, adsNotFoundBuilder, paginationBuild } from "./adsListView.js";
import { pubSub } from "../pubSub.js";
import { getAdsList } from "../jsmodules/advertisementProvider.js";

export class AdsController {

  constructor(parentNode, searchContainer) {
    this.parentNode=parentNode;
    this.searchContainer=searchContainer;
    this.searchElement=searchContainer.querySelector('.searchField');
    this.searchResetButton=searchContainer.querySelector('button');
    this.searchConcept='';
    this.page=1;

    this.subscribeToEvents();
    this.loadAds();
  };

  subscribeToEvents(){
    this.searchEngine();
    this.searchReset();
  };

  searchReset(){
    this.searchResetButton.addEventListener('click', ()=>{
      //Show spinner
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.searchElement.value='';
      this.page=1;
      this.loadAds();
    });
  };

  searchEngine(){
    this.searchElement.addEventListener('input', ()=>{
      this.searchConcept=this.searchElement.value;
      this.page=1;
      //Show spinner
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
  };

  extractLinks(links){
    const linksArray=links.split(',');
    let linkParts={};
    linksArray.forEach(linkElement => {
      const parts=linkElement.split(';');
      const linkObject={};
      const equalIndex=parts[0].trim().lastIndexOf('=');
      const pageNumber=parts[0].trim().slice(equalIndex+1,parts[0].trim().length-1);
      linkParts[parts[1].trim().slice(5,parts[1].trim().length-1)]=pageNumber;
    });
    return linkParts;
  };

  async loadAds(){

    //getting advertisements and quit spinner
    let ads;
    let links;
    try {
      const adsObject=await getAdsList(this.searchConcept, this.page);
      if (adsObject.links) {
        links=this.extractLinks(adsObject.links);
      };
      ads=adsObject.data;
    } catch (error) {
      //pubsub to notify
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, error);
    }
    //Hide spinner
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');

    //Show results
    if (!ads) {this.showAdsNotFound();};
    if (ads) {
      if (links) {
        this.drawPagination(links);
        this.configPagination(links);

      };
      this.drawAds(ads);
    };
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
      childElement.classList.add('adListItem');
      //Build the ad view in html
      const adView=adsListViewBuilder(ad);
      //Add the ad view to container
      childElement.innerHTML=adView;
      //Append the container to the parent node
      this.parentNode.appendChild(childElement);
    }
  };

  drawPagination(links){
    const childElement=document.createElement('div');
    childElement.classList.add('pagination');
    const pagination=paginationBuild(links);
    childElement.innerHTML=pagination;
    this.parentNode.appendChild(childElement);
  };

  configPagination(links){
    const paginationElement=this.parentNode.querySelector('.pagination');
    const buttonFirstElement=paginationElement.querySelector('.first');
    buttonFirstElement.setAttribute('id', links.first);
    const buttonLastElement=paginationElement.querySelector('.last');
    buttonLastElement.setAttribute('id', links.last);
    const buttonPrevElement=paginationElement.querySelector('.prev');
    const buttonNextElement=paginationElement.querySelector('.next');

    if (!links.hasOwnProperty('prev')) {
      buttonPrevElement.setAttribute('disabled','');
    } else {
      buttonPrevElement.setAttribute('id', links.prev);
    };
    if (!links.hasOwnProperty('next')) {
      buttonNextElement.setAttribute('disabled','');
    } else {
      buttonNextElement.setAttribute('id', links.next);
    };

    buttonFirstElement.addEventListener('click', ()=>{
      this.page=buttonFirstElement.getAttribute('id');
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
    buttonPrevElement.addEventListener('click', ()=>{
      this.page=buttonPrevElement.getAttribute('id');
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
    buttonNextElement.addEventListener('click', ()=>{
      this.page=buttonNextElement.getAttribute('id');
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
    buttonLastElement.addEventListener('click', ()=>{
      this.page=buttonLastElement.getAttribute('id');
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
  }
};

