import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {FlowRouter } from 'meteor/kadira:flow-router';

import './menu.html';

Template.menu.onCreated(function () {
  this.path = new ReactiveVar('home');
});

Template.menu.events({
  'click .menu-menu'(event, instance) {
    instance.path.set($(event.target).attr('path'));
  },
  'click .menu-home'(event, instance){
    instance.path.set('home');
    FlowRouter.go('/');
  },
  'click .menu-action'(event, instance){
    FlowRouter.go($(event.target).attr('go'));
  }
});

const menu = [
  {path: 'home'},
  {path: 'home.a', type: 'menu', desc: 'A'},
  {path: 'home.a.1', type: 'action', go: '/chart', desc: 'A 1'},
  {path: 'home.b', type: 'action', go: '/home-b', desc: 'B'}
];

const fmenu = (path, menu) => {
  const l1 = path.split('.').length;
  let selected = [];
  menu.forEach(function(element) {
    let l2 = element.path.split('.').length;  
    if(element.path.startsWith(path) && l2 == (l1 +1)){
      selected.push(element);
    }
  });
  return selected;
}

Template.menu.helpers({
  menu_item(){
    return fmenu(Template.instance().path.get(), menu);
  }
});