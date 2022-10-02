'use strict';

export class Advertisement {

  /**
   * Create a new advertisement.
   * The constructor receive and validate the data.
   * This class provide the methods necessary methods to
   * change and validate any of the attributes after the
   * creation 
   * @param {string} product required
   * @param {string} description required
   * @param {float} price required
   * @param {boolean} sell required
   * @param {string} photo optional
   * @return {Object} advertisement
   */
  constructor(product,description,price,sell,photo){
    try {
      this.setProduct(product);
      this.setDescription(description);
      this.setPrice(price);
      this.setSell(sell);
      this.setPhoto(photo);
      return {
        product:this.product,
        description: this.description,
        price: this.price,
        sell: this.sell,
        photo: this.photo
      };
    } catch (error) {
      throw error;
    };

  };

  validateRequiredData(data, parameterName){
    if (!data) {
      throw new Error(`${parameterName} is required`);
    };
    return data;
  };

  validateStringData(stringData, parameterName){
    if (typeof stringData !=='string') {
      throw new Error(`${parameterName} must be a string`);
    };
    return stringData;
  };

  validateNumberData(numberData, parameterName){
    if (typeof numberData !=='number') {
      throw new Error(`${parameterName} must be a number`);
    };
    return numberData;
  };

  validateBooleanData(booleanData, parameterName){
    if (typeof booleanData !=='boolean') {
      throw new Error(`${parameterName} must be a boolean`);
    };
    return booleanData;
  };

  setProduct(product) {
    try {
      this.product=this.validateStringData(this.validateRequiredData(product, 'Product'));
    } catch (error) {
      throw error;
    };
  };

  setDescription(description) {
    try {
      this.description=this.validateStringData(this.validateRequiredData(description, 'Description'));
    } catch (error) {
      throw error;
    };
  };

  setPrice(price) {
    try {
      this.price=this.validateNumberData(this.validateRequiredData(price, 'Price'));
    } catch (error) {
      throw error;
    };
  };

  setSell(sell) {
    try {
      this.sell=this.validateBooleanData(this.validateRequiredData(sell, 'Sell'));
    } catch (error) {
      throw error;
    };
  };

  setPhoto(photo) {
    try {
      this.photo=this.validateStringData(photo, 'Photo');
    } catch (error) {
      throw error;
    };
  };
};