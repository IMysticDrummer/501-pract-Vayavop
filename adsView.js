'use strict';

/**
 * This function returns an advertisement object in
 * a string containing that advertisement, but HTML
 * formatted
 * @param {Object} advertisement
 * @returns string HTML advertisement formatted
 */
export function adViewBuilder(ad){
  let adView=`
    <p>Autor: ${ad.handler}</p>
    <p>Artículo: ${ad.name}</p>
    <p>Descripción: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<p>Foto: ${ad.photo}</p>` : adView+=`<p>Sin foto</p>`
  ad.shell===true ? adView+=`<p>Se vende</p>`: adView+=`<p>Se busca</p>`;
  ad.shell===true ? adView+=`<p>Precio: ${ad.price}</p>`: adView+=`<p>Presupuesto: ${ad.price}</p>`;

  return adView;
}