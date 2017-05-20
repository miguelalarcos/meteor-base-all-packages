import { ValidationError } from 'meteor/mdg:validation-error';

export const validateData = (data, schema) => {  
  let errores = [];
  for(let key of Object.keys(schema)){
    if(schema[key](data[key]) != true){
      errores.push({name: key, type: 'error en la validacion'});
    }
  }
  if(errores.length > 0) throw new ValidationError(errores);
}