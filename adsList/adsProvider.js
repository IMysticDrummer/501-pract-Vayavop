'use strict';

export async function adsModel() {
  let ads;
  return new Promise(async (resolve, reject)=>{
    ads=await fetch('http://localhost:8000/api/advertisements');
    resolve(ads.json());
  });
}