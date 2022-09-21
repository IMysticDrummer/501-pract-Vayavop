'use strict';

export async function adsModel() {
  const ads=[
    {
      handler: "Pericote",
      name: "televisor de 15\"",
      photo: "televisor.jpg",
      description: "televisor de 15\" con TDT (todo el deporte\
        tachado), 2 entradas HDMI (había dos mal indicadas) y\
         mando a distancia (con palo selfie).\nMarca LJ (Lorenzo\
          José). Seminuevo",
      price: 50,
      shell: true
    },
    {
      handler: "Audaz",
      name: "bicileta",
      photo: "bici.jpg",
      description: "Bicicleta de montaña. Sólo usada dos veces. La segunda caída por un barranco.\nLa bicicleta está\
      prácticamente nueva, salvo por las ruedas hechas un ocho y el cuadro partido",
      price: 125,
      shell: true
    },
    {
      handler: "Casero",
      name: "batamanta",
      photo: "",
      description: "Busco batamanta tamaño XXXL para meterme debajo 7 veces y dejar espacio a mi pareja. Se agradecería\
      que fuese calentita, pero que no se hagan bolillas",
      price: 40,
      shell: false
    }
  ];
  return new Promise((resolve, reject)=>{
    setTimeout(resolve(ads),2000);
  });
}