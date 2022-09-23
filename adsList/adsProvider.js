'use strict';

export async function getAds() {
  const URLAds='http://localhost:8000/api/advertisements';
  //Para probar error de URL
  //const URLAds='https://juanito-perez/api/advertisements';
  let response;
  let ads;
  return new Promise(async (resolve, reject)=>{
    try {
      response=await fetch(URLAds);
    } catch (error) {
      //throw new Error('Error de dirección');
      reject('URL doesn\'t exist. Please verify the direction');
    }

    if (!response || !response.ok) {
      //throw new Error('Sorry... we can\'t find advertisements');
      reject('Sorry... we can\'t find advertisements');
    }

    try {
      ads=await response.json();
    } catch (error) {
      //throw new Error('Sorry. We have problems with data. Contact administrator');
      reject('Sorry. We have problems with data. Contact administrator');
    }
    resolve(ads);
  });
}