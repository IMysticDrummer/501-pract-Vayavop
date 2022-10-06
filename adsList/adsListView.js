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
 * @returns string html formmated to manage a spinner
 */
export function spinnerBuild(){
  let spinner=`
    <div class="spinner">
      <div></div>
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
      <div></div>
    </div>
  `;

  return spinner;
};

export function paginationBuild(links){
  let pagination=``;
  pagination+=`<a class="first"
   href="/index.html?_page=${links.first}">
    first 
   </a>`;
  if(links.prev) {
    pagination+=`<a class="prev href="/index.html?_page=${links.prev}"> prev </a>`;
  };
  if(links.next) {
    pagination+=`<a class="next" href="/index.html?_page=${links.next}"> next </a>`;
  };
  pagination+=`<a class="last" href="/index.html?_page=${links.last}"> last </a>`;

  return pagination;
};