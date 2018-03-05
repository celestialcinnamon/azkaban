'use strict'

 class UserInterface {
  constructor(){ }
  
  showIndeterminateProgress(indeterminateSpinner){
      indeterminateSpinner.classList.add('js-spin');
      return indeterminateSpinner;
  }
  
  hideIndeterminateProgress(indeterminateSpinner){
    indeterminateSpinner.classList.remove('js-spin');
    return indeterminateSpinner;
  }
  
  toggleIndeterminateProgress(indeterminateSpinner){
    indeterminateSpinner.classList.toggle('js-spin');
    return indeterminateSpinner;
  }
}

module.exports = UserInterface;
