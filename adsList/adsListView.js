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
    <p>Autor: ${ad.handler}</p>
    <p>Article: ${ad.name}</p>
    <p>Description: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<p>Photo: ${ad.photo}</p>` : adView+=`<p>Sin foto</p>`
  ad.shell===true ? adView+=`<p>Selling</p>`: adView+=`<p>Searching</p>`;
  ad.shell===true ? adView+=`<p>Price: ${ad.price}</p>`: adView+=`<p>Budget: ${ad.price}</p>`;

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