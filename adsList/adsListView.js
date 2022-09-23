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
    <p>Artículo: ${ad.name}</p>
    <p>Descripción: ${ad.description}</p>
  `;
  ad.photo.length>0 ? adView+=`<p>Foto: ${ad.photo}</p>` : adView+=`<p>Sin foto</p>`
  ad.shell===true ? adView+=`<p>Se vende</p>`: adView+=`<p>Se busca</p>`;
  ad.shell===true ? adView+=`<p>Precio: ${ad.price}</p>`: adView+=`<p>Presupuesto: ${ad.price}</p>`;

  return adView;
}

export function adsNotFoundBuilder(){
  let adNotFound=`
    <h2>No se han encontrado anuncios</h2>
  `;
  return adNotFound;
}

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
}