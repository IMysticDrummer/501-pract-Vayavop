'use strict';

export class CreateAdController {
  constructor(nodeElemnt){
    this.createAdForm=nodeElemnt;
  };

  subscribeToEvents(){
    this.createAdForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(this.createAdForm)
      const adObject={
        articleInputValue: formData.get('articleInput'),
        descriptionInputValue: formData.get('descriptionInput'),
        photoInputValue: formData.get('photoInput'),
        priceInputValue: formData.get('priceInput'),
        sellingInputValue: formData.get('selling')==="true"
      };

      try {
        //TODO data validation
        
      } catch (error) {
        //TODO error notification
      }

      try {
        //TODO Send ad function
          //TODO Create a provider
            //TODO Modification apiConnection.post adding bearer token
      } catch (error) {
        //TODO error notification
      }

    });
  };
};