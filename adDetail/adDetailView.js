'use strict';

/**
 * 
 * @param {advertisement objetc} ad 
 * @returns string containing html formatted advertisement
 */
export const buildAdDetailView=(ad) => {
  let adView=`
    <p class="authorParagraph">Autor: ${ad.user.username}</p>
    <p class="productParagraph">Product: ${ad.product}</p>
    <p class="descriptionParagraph">Description: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<img class="productImg" src="${ad.photo}"></img>` : adView+=`<p class="productImg" >Sin foto</p>`
  ad.sell===true ? adView+=`<p class="sellParagraph">Selling</p>`: adView+=`<p class="sellParagraph">Searching</p>`;
  ad.sell===true ? adView+=`<p class="priceParagraph">Price: ${ad.price}</p>`: adView+=`<p class="priceParagraph">Budget: ${ad.price}</p>`;

  return adView;
};
