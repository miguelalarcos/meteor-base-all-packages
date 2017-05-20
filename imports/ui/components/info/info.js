import { Links } from '/imports/api/links/links.js';
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
      Meteor.call('links.insert', aux.title, aux.url);      
      tmpl.form.doc({});
    }
});

Forms.mixin(Template.info, {
  schema : {
    title: function(val){
      val = val && new Decimal(val).toNumber();
      return (_.isNumber(val) && val > 3) || 'title debe ser un número mayor de 3';
    }
  }
});