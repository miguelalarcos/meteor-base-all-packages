// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links, schema } from './links.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { validateData } from '../../lib/validation.js';

const linksInsert = new ValidatedMethod({
  name: 'links.insert',

  validate({title, url}) {
    check({title, url}, {
      url: String,
      title: Number
    });
    validateData({title, url}, schema);
  },

  run({title, url}){
    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  }
});