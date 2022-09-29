'use strict';

class APIConnector {
  constructor() {
    this.baseURL='http://localhost:8000';
    this.endPoints={
      getTweetsList:'/advertisements',
      register:'/auth/register'
    };
  };

  async post(endPoint, data) {

    let response;

    try {
      response=await fetch(`${this.baseURL}${endPoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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