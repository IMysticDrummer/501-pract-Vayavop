'use strict';

import { pubSub } from "../pubSub.js";

export class RegisterController {
  constructor(nodeElement) {
    this.config={
      passwordMinLength: 6
    };
    this.nodeElement=nodeElement;
    this.passwordInputFieldElement=this.nodeElement.querySelector('#passwordInputField');
    this.userInputFieldElement=this.nodeElement.querySelector('#userInputField');

    this.subscribeToEvents();
  };

  /**
   * Conditions:
   * - user and password fields must be provided
   * - password must be 6 characters long at least
   * - user and password can't be the same
   * -
   */
  subscribeToEvents() {
    this.nodeElement.addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        this.validatePassword();
        this.controlUserPasswordDifferents();
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR,error);
      }
      //this.createUser();
    });

    this.activateSubmitButton();

  };

  validatePassword() {
    //Password length
    if (this.passwordInputFieldElement.value.length<this.config.passwordMinLength) {
      throw new Error(`Password must be ${this.config.passwordMinLength}
       characters long at least`);
    }

    //Passwords must have letters and numbers
    const regExp = new RegExp(/^[a-zA-Z0-9]*$/);

    if (!regExp.test(this.passwordInputFieldElement.value)) {
      throw new Error(`Passwords must have only letters and numbers`);
    };
  };

  controlUserPasswordDifferents() {
    if (this.passwordInputFieldElement.value===this.userInputFieldElement.value) {
      throw new Error('User and Password must be differents');
    };
  }

  activateSubmitButton() {
    const buttonSubmitForm=this.nodeElement.querySelector('button');
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
};