'use strict';

/**
 * 
 * @param {advertisement objetc} ad 
 * @returns string containing html formatted advertisement
 */
export const buildAdDetailView=(ad) => {
  let adView=`
    <p>Autor: ${ad.user.username}</p>
    <p>Product: ${ad.product}</p>
    <p>Description: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<p>Photo: ${ad.photo}</p>` : adView+=`<p>No photo</p>`
  ad.sell===true ? adView+=`<p>Selling</p>`: adView+=`<p>Searching</p>`;
  ad.sell===true ? adView+=`<p>Price: ${ad.price}</p>`: adView+=`<p>Budget: ${ad.price}</p>`;

  return adView;
};
