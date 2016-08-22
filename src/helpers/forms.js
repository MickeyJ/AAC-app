
export const regexEmail = /^([A-Za-z\._\-0-9])*[@]([A-Za-z\._\-0-9])*[\.]([A-Za-z]{2,4})$/;

function addClass(target, elClasses, className){
  if(elClasses.indexOf(className) === -1){
    elClasses.push(className);
    target.className = elClasses.join(' ');
  }
}

function clearClassName(target, className){
  return target.filter(x => x !== className)
}


export function errorCount(obj){
  var size = 0, key;
  for (key in obj) if(obj.hasOwnProperty(key)) size++;
  return size;
}

export class Validate{
  constructor(){
    this.errors = {};
  }
  check(condition, target, value, n){
    let elClassNames = target.className.split(' ');

    if(condition) {
      if(!this.errors[n]){
        this.errors[n] = {id: n, value: value}
      }
      if(elClassNames.indexOf('valid-input') > -1){
        elClassNames = clearClassName(elClassNames, 'valid-input');
      }
      addClass(target, elClassNames, 'invalid-input');
    }

    if(!condition) {
      delete this.errors[n];
      // this.input = clearInvalid(this.input, n);

      if(elClassNames.indexOf('invalid-input') > -1){
        elClassNames = clearClassName(elClassNames, 'invalid-input');
      }
      addClass(target, elClassNames, 'valid-input');
    }
    else if(value.length < 1) {
      delete this.errors[n];
      elClassNames = clearClassName(elClassNames, 'invalid-input');
      elClassNames = clearClassName(elClassNames, 'valid-input');
      target.className = elClassNames.join(' ');
    }
    console.log(this.errors);
  }
  length(target, value, minLength, n){
    this.check(value.length < minLength, target, value, n);
  }
  regex(target, value, regex, n){
    this.check(regex.test(value) == false, target, value, n);
  }
}