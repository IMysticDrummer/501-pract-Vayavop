'use strict';

import { controlUserPasswordDifferents, passwordEqualConfim, passwordMinLength, validatePassword } from "../jsmodules/passwordVerify.js";
import { pubSub } from "../pubSub.js";
import { createApiUser, loginApiUser } from "/jsmodules/advertisementProvider.js";

export class UserIdController {
  constructor(nodeElement, typeFunction) {

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
      validatePassword(this.passwordInputFieldElement.value);
      passwordEqualConfim(this.passwordInputFieldElement.value, this.confirmPassInputFieldElement.value);
      controlUserPasswordDifferents(
        this.passwordInputFieldElement.value,
        this.userInputFieldElement.value
      );
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR,error);
      pubSub.publish(pubSub.TOPICS.SPINNER_HIDE_SHOW, '');
      return;
    };
    this.createUser();
  };

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
          passwordMinLength()
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