'use strict';

/**
 * This function returns an advertisement object in
 * a string containing that advertisement, but HTML
 * formatted
 * @param {Object} advertisement
 * @returns string HTML advertisement formatted
 */
export function adsListViewBuilder(ad){
  let adView=`
    <a href="../adDetail/index.html?id=${ad.id}">
    <p class="productParagraph">Product: ${ad.product}</p>
    <p class="descriptionParagraph">Description: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<img class="productImg" src="${ad.photo}"></img>` : adView+=`<p class="productImg" >Sin foto</p>`
  ad.sell===true ? adView+=`<p class="sellParagraph">Selling</p>`: adView+=`<p class="sellParagraph">Searching</p>`;
  ad.sell===true ? adView+=`<p class="priceParagraph">Price: ${ad.price}</p>`: adView+=`<p class="priceParagraph">Budget: ${ad.price}</p>`;

  adView+='</a>';
  return adView;
};

/**
 * 
 * @returns string html formatted containing "no se han encotrado anuncios"
 */
export function adsNotFoundBuilder(){
  let adNotFound=`
    <h2>Advertissements not found</h2>
  `;
  return adNotFound;
};

/**
 * 
 * @returns string containing html buttons, class names first, prev, next and last, to prepare paginations
 */
export function paginationBuild(){
  const pagination=`
    <button class="first"> first </button>
    <button class="prev"> prev </button>
    <button class="next"> next </button>
    <button class="last"> last </button>
  `;

  return pagination;
};