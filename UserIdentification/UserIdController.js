'use strict';

import { pubSub } from "../pubSub.js";
import { createApiUser, loginApiUser } from "./userIdProvider.js";

export class UserIdController {
  constructor(nodeElement, typeFunction) {
    this.config={
      passwordMinLength: 6
    };
    this.nodeElement=nodeElement;
    this.signup=typeFunction==="sign";
    this.passwordInputFieldElement=this.nodeElement.querySelector('#passwordInputField');
    this.confirmPassInputFieldElement=this.nodeElement.querySelector('#confirmPassInputField');
    this.userInputFieldElement=this.nodeElement.querySelector('#userInputField');

    pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');
    this.subscribeToEvents();

  };
  
  subscribeToEvents() {
    this.nodeElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');

      this.signup ? this.signupUser() : this.loginUser();
    });
    
    this.activateSubmitButton();
  };
  
  
  signupUser(){
    try {
      this.validatePassword();
      this.controlUserPasswordDifferents();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR,error);
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');
      return;
    };
    this.createUser();
  };

  /**
   * Password validation conditions
   * - Password with 6 characters at least
   * - Password must be letters (normal or capital) and/or numbers.
   * 
   * In other case, throw an error
   */
  validatePassword() {
    //Password length. This would'nt be necessary because button is not going to
    //be activated until the password field contains the minimun characters.
    if (this.passwordInputFieldElement.value.length<this.config.passwordMinLength) {
      throw new Error(`Password must be ${this.config.passwordMinLength}
       characters long at least`);
    }

    //Passwords must have letters and numbers
    const regExp = new RegExp(/^[a-zA-Z0-9]*$/);

    if (!regExp.test(this.passwordInputFieldElement.value)) {
      throw new Error(`Passwords must have only letters and numbers`);
    };

    if (this.passwordInputFieldElement.value!==this.confirmPassInputFieldElement.value) {
      throw new Error(`Password and confirmation must be equals`);
    };
  };

  /**
   * Control password <> username
   * Throw error if they are the same
   */
  controlUserPasswordDifferents() {
    if (this.passwordInputFieldElement.value===this.userInputFieldElement.value) {
      throw new Error('User and Password must be differents');
    };
  }

  /**
   * Submit button activate conditions:
   * - username field with characters
   * - password field with 6 characters at least
   */
  activateSubmitButton() {
    const buttonSubmitForm=this.nodeElement.querySelector('.submit');
    const inputFieldElements=Array.from(this.nodeElement.querySelectorAll('input'));

    inputFieldElements.forEach(inputFieldElement => {
      inputFieldElement.addEventListener('input', () => {
        if (inputFieldElements.every(inputElement => inputElement.value)
          && this.passwordInputFieldElement.value.length>=
          this.config.passwordMinLength
        ) {
          buttonSubmitForm.removeAttribute('disabled');
        } else {
          buttonSubmitForm.setAttribute('disabled','');
        }
      });
    });
  };

  /**
   * Ask user id provider to create an new user
   */
  async createUser(){
    try {
      await createApiUser(this.userInputFieldElement.value, this.passwordInputFieldElement.value);
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_OK, 'User created... login and redirection');
      this.loginUser();
    } catch (error) {
      const message=`Problem with user creation. Try another username`;
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR,`Problem with user creation. Try another username`);
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');
    }
    
  };
  
  /**
   * Ask user id provider to log in an user
   */
  async loginUser(){
    try {
      const jwt=await loginApiUser(this.userInputFieldElement.value, this.passwordInputFieldElement.value)
      localStorage.setItem('token',jwt);
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_OK,`Login Ok. Redirecting main page..`);
      setTimeout(()=>{window.location='/'},1500);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR,`Impossible to loggin. Check your credentials`);
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');
    }
  };
};