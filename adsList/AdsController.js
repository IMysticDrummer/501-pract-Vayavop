'use strict';

import { adsListViewBuilder, adsNotFoundBuilder, paginationBuild } from "./adsListView.js";
import { pubSub } from "../pubSub.js";
import { getAdsList } from "../jsmodules/advertisementProvider.js";

export class AdsController {

  constructor(parentNode, searchContainer, page) {
    this.parentNode=parentNode;
    this.searchContainer=searchContainer;
    this.searchElement=searchContainer.querySelector('.searchField');
    this.searchResetButton=searchContainer.querySelector('button');
    this.page=page;
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
      this.loadAds();
    });
  };

  searchEngine(){
    this.searchElement.addEventListener('input', ()=>{
      const searchConcept=this.searchElement.value;
      //Show spinner
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds(searchConcept);
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

  async loadAds(searchConcept){

    //getting advertisements and quit spinner
    let ads;
    let links;
    try {
      ads=await getAdsList(searchConcept, this.page);
      if (ads.links) {
        links=this.extractLinks(ads.links);
      };
      ads=ads.data;
    } catch (error) {
      //pubsub to notify
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, error);
    }
    //Hide spinner
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW,'');

    //Show results
    if (!ads) {this.showAdsNotFound();};
    if (ads) {
      if (links) {this.drawPagination(links);};
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

};

