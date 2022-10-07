'use strict';

export class Advertisement {

  /**
   * Create a new advertisement.
   * The constructor receive and validate the data.
   * This class provide the necessary methods to
   * change and validate any of the attributes after the
   * creation 
   * @param {string} product required
   * @param {string} description required
   * @param {float} price required
   * @param {string} sell required. Values "selling" || "searching"
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

  /**
   * Return an error if the required data is not provided
   * @param {any of advertisement data} data 
   * @param {string} parameterName 
   * @returns 
   */
  validateRequiredData(data, parameterName){
    if (!data) {
      throw new Error(`${parameterName} is required`);
    };
    return data;
  };

  /**
   * Return an error if the data is not a string
   * @param {string} stringData data to test
   * @param {string} parameterName 
   * @returns 
   */
  validateStringData(stringData, parameterName){
    if (typeof stringData !=='string') {
      throw new Error(`${parameterName} must be a string`);
    };
    return stringData;
  };

  /**
   * Return an error if the data is not a number
   * @param {number} numberData 
   * @param {string} parameterName 
   * @returns 
   */
  validateNumberData(numberData, parameterName){
    if (typeof numberData !=='number') {
      throw new Error(`${parameterName} must be a number`);
    };
    return numberData;
  };

  /**
   * Recives an valid string for the sell attibute.
   * Returns:
   *  - sellData==='selling' => true
   *  - false in other cases
   * @param {string} sellData selling || searching
   * @param {*} parameterName 
   * @returns 
   */
  validateSellData(sellData, parameterName){
    if (sellData !=='selling' && sellData !== 'searching') {
      throw new Error(`${parameterName} must be "selling" or "searching"`);
    };
    return sellData==='selling' ? true : false;
  };

  /**
   * Set the product attribute, after testing the data
   * @param {string} product 
   */
  setProduct(product) {
    try {
      this.product=this.validateStringData(this.validateRequiredData(product, 'Product'),'Product');
    } catch (error) {
      throw error;
    };
  };

  /**
   * Set the description attribute, after testing the data
   * @param {string} product 
   */
  setDescription(description) {
    try {
      this.description=this.validateStringData(this.validateRequiredData(description, 'Description'),'Description');
    } catch (error) {
      throw error;
    };
  };

  /**
   * Set the price attribute, after testing the data
   * @param {number} product 
   */
  setPrice(price) {
    try {
      this.price=this.validateNumberData(this.validateRequiredData(price, 'Price'),'Price');
    } catch (error) {
      throw error;
    };
  };

  /**
   * Set the sell attribute, after testing the data
   * @param {string} product 
   */
  setSell(sell) {
    try {
      this.sell=this.validateSellData(this.validateRequiredData(sell, 'Sell'),'Sell');
    } catch (error) {
      throw error;
    };
  };

  /**
   * Set the photo. attribute, after testing the data.
   * To show the photo, *product* must be an accesible URL
   * @param {string} product 
   */
  setPhoto(photo) {
    try {
      this.photo=this.validateStringData(photo, 'Photo');
    } catch (error) {
      throw error;
    };
  };
};