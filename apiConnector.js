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
   * @returns 
   */
  async get(endPoint) {
    let response;
    try {
      response=await fetch(`${this.baseURL}${endPoint}`,{method: 'GET'});
    } catch (error) {
      throw new Error('Fail to get data');
    };

    if (!response.ok) {throw new Error('There\'s no advertisements')};

    return response.json();
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

};

export const apiConnector=new APIConnector();