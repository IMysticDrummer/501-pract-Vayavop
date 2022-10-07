'use strict';

import { adsListViewBuilder, adsNotFoundBuilder, paginationBuild } from "./adsListView.js";
import { pubSub } from "../jsmodules/pubSub.js";
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

  /**
   * Configure the search reset button to erase automatically the
   * advertisements filter
   */
  searchReset(){
    this.searchResetButton.addEventListener('click', ()=>{
      //Show spinner
      pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');
      this.parentNode.innerHTML='';
      this.searchElement.value='';
      this.page=1;
      this.loadAds();
    });
  };

  /**
   * Configure the search field, to launch automatically the
   * filtered advertisements request
   */
  searchEngine(){
    this.searchElement.addEventListener('input', ()=>{
      this.searchConcept=this.searchElement.value;
      this.page=1;
      //Show spinner
      pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');
      this.parentNode.innerHTML='';
      this.loadAds();
    });
  };

  /**
   * This function returns an object containing the keys to make the pagination (first, prev, next, last),
   * which cotains the page number, to make the request.
   * @param {string} links containing the pagination links response from advertisement provider
   * @returns Object{link-key: page number to request}
   */
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

  /**
   * Load the advertisements
   */
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
    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE,'');

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

  /**
   * Draw the pagination buttons
   */
  drawPagination(){
    const childElement=document.createElement('div');
    childElement.classList.add('pagination');
    const pagination=paginationBuild();
    childElement.innerHTML=pagination;
    this.parentNode.appendChild(childElement);
  };

  /**
   * Configure the pagination buttons. Use the 'id' html attribute to keep the page name related to the button.
   * For example... ```<button class="first" id="1">... ```
   * @param {Object} links containing the page number for each key (first, prev, next, last)
   */
  configPagination(links){
    const paginationElement=this.parentNode.querySelector('.pagination');

    const buttonList=paginationElement.querySelectorAll('button');

    buttonList.forEach((button)=>{
      if (button.classList.contains('first')) {
        button.setAttribute('id', links.first);
      };
      if (button.classList.contains('last')) {
        button.setAttribute('id', links.last);
      };
      if (button.classList.contains('prev')) {
        if (!links.hasOwnProperty('prev')) {
          button.setAttribute('disabled','');
        } else {
          button.setAttribute('id', links.prev);
        };
      };
      if (button.classList.contains('next')) {
        if (!links.hasOwnProperty('next')) {
          button.setAttribute('disabled','');
        } else {
          button.setAttribute('id', links.next);
        };
      };

      button.addEventListener('click', ()=>{
        this.page=button.getAttribute('id');
        pubSub.publish(pubSub.TOPICS.SPINNER_SHOW,'');
        this.parentNode.innerHTML='';
        this.loadAds();
      });
    });
  }
};

