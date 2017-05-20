// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import { Decimal} from 'decimal.js';

export const Links = new Mongo.Collection('links');

export const schema = {
    title: function(val){
      val = val && new Decimal(val).toNumber();
      return (_.isNumber(val) && val > 3) || 'title debe ser un número mayor de 3';
    }
}