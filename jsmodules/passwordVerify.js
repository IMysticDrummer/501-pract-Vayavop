'use strict';

const config={
  passwordMinLength: 6,
  regExp: new RegExp(/^[a-zA-Z0-9]*$/)
};

/**
   * Password validation conditions
   * - Password with 6 characters at least
   * - Password must be letters (normal or capital) and/or numbers.
   * 
   * In other case, throw an error
   */
 export function validatePassword(password) {
  //Password length. This would'nt be necessary because button is not going to
  //be activated until the password field contains the minimun characters.
  if (password.length<config.passwordMinLength) {
    throw new Error(`Password must be ${config.passwordMinLength}
     characters long at least`);
  }

  //Passwords must have letters and numbers
  if (!config.regExp.test(password)) {
    throw new Error(`Passwords must have only letters and numbers`);
  };
};

/**
 * Test password is equal to confirmation
 * @param {string} password 
 * @param {string} confirm 
 */
export function passwordEqualConfim(password,confirm) {
  if (password!==confirm) {
    throw new Error(`Password and confirmation must be equals`);
  };
};

/**
   * Control password <> username
   * Throw error if they are the same
   */
export function controlUserPasswordDifferents(password, user) {
  if (password===user) {
    throw new Error('User and Password must be differents');
  };
}

export function passwordMinLength(){
  return config.passwordMinLength;
};