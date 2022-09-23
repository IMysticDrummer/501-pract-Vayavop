'use strict';

import { adsModel } from "./adsProvider.js";
import { adViewBuilder } from "./adsView.js";

export async function adsController(parentNode){
  
  try {
    const ads=await adsModel();
    
    for (const ad of ads) {
      //Create container
      const childElement=document.createElement('article');
      //Build the ad view in html
      const adView=adViewBuilder(ad);
      //Add the ad view to container
      childElement.innerHTML=adView;
      //Append the container to the parent node
      parentNode.appendChild(childElement);
    }

  } catch (error) {
    console.log(error);
  }
}
