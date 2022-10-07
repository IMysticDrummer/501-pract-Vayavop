'use strict';

class APIConnector {
  constructor() {
    this.baseURL='http://localhost:8000';
    this.endPoints={
      getAdsList:'/api/advertisements',
      register:'/auth/register',
      login: '/auth/login'
    };
  };

  /**
   * Get:
   * - list of advertisements
   * - one advertisement (/advertisement/<id>)
   * @param {apiConnector.endPoint} endPoint 
   * @returns Object{data: ads in json, links: string containin pagination links}
   */
  async get(endPoint) {
    let response;
    let adsList;
    try {
      response=await fetch(`${this.baseURL}${endPoint}`,{method: 'GET'});
    } catch (error) {
      throw new Error('URL Error. Revise the direction');
    };

    if (response.status===404) {
      throw new Error(`Sorry... we can\'t find the page: ${this.baseURL}${endPoint}`);
    }

    if (!response.ok) {throw new Error('Sorry... we can\'t find advertisements')};

    try {
      adsList=await response.json();
    } catch (error) {
      throw new Error('Sorry. We have problems with data. Contact administrator');
    }
  
    const responseObjet={
      data:adsList,
      links:response.headers.get('link')
    }
    return responseObjet;
  };

  /**
   * Ask a POST request to API, passing
   * an object with data to transmit
   * Returns an JSON response or a
   * stringfied error
   * @param {apiConnector.endPoint} endPoint 
   * @param {object} data 
   * @returns JSON
   */
  async post(endPoint, data) {

    let response;

    try {
      response=await fetch(`${this.baseURL}${endPoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      throw new Error(error);
    }

    if (!response.ok) {
      const error={
        status: response.status,
        message: response.statusText
      };
      throw new Error(JSON.stringify(error));
    };

    return response.json();
  };

  /**
   * Ask a DELETE request to API, passing
   * an object with data to transmit
   * Returns an JSON response or a
   * stringfied error
   * @param {apiConnector.endPoint} endPoint 
   * @param {object} data 
   * @returns JSON
   */
  async delete(endPoint, data) {

    let response;

    try {
      response=await fetch(`${this.baseURL}${endPoint}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      throw new Error(error);
    }

    if (!response.ok) {
      const error={
        status: response.status,
        message: response.statusText
      };
      throw new Error(JSON.stringify(error));
    };

    return response.json();
  };

  /**
   * Ask a PUT request to API, passing
   * an object with data to transmit
   * Returns an JSON response or a
   * stringfied error
   * @param {apiConnector.endPoint} endPoint 
   * @param {object} data 
   * @returns JSON
  */
  async put(endPoint, data) {

    let response;

    try {
      response=await fetch(`${this.baseURL}${endPoint}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      throw new Error(error);
    }

    if (!response.ok) {
      const error={
        status: response.status,
        message: response.statusText
      };
      throw new Error(JSON.stringify(error));
    };

    return response.json();
  };

};



export const apiConnector=new APIConnector();