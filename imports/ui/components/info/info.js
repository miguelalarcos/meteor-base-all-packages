import { Links, schema } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import './info.html';
import Decimal from 'decimal.js';
import { Forms } from 'meteor/useful:forms';

const money = (i)=>{i.inputmask('Regex', { 
    regex: "^[+-]?\\d+\\.\\d{0,2}$"
    });}

Template.info.onCreated(function () {
  this.subscribe('links.all');
});

Template.info.onRendered(function(){
  money(this.$('.numero'));
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
});

Template.info.events({
  'documentSubmit': function (e, tmpl, doc) {
      aux = Object.assign({}, doc, {title: new Decimal(doc.title).toNumber()});
      Meteor.call('links.insert', {title: aux.title, url: aux.url});      
      tmpl.form.doc({});
    }
});

Forms.mixin(Template.info, {
  schema : schema
});