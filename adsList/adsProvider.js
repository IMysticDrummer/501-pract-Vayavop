'use strict';

export async function getAds() {
  const URLAds='http://localhost:8000/api/advertisements';
  //Para probar error de URL
  //const URLAds='https://juanito-perez/api/advertisements';
  //Para probar error de no hay anuncios
  //const URLAds='http://localhost:8000/api/advertisement';
  let conectionResponse;
  let adsList;
  
  try {
    conectionResponse=await fetch(URLAds);
  } catch (error) {
    throw new Error('URL Error. Revise the direction');
  }

  if (!conectionResponse.ok) {
    throw new Error('Sorry... we can\'t find advertisements');
  }

  try {
    adsList=await conectionResponse.json();
  } catch (error) {
    throw new Error('Sorry. We have problems with data. Contact administrator');
  }
  return (adsList);
};