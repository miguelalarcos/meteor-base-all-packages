import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsCommon } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Session } from 'meteor/session';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/chart/chart.js';
import '../../ui/pages/login/login.js';

// Set up all routes in the app
/*FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});
*/
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
/*
FlowRouter.route('/chart', {
  name: 'App.chart',
  action() {
    BlazeLayout.render('App_body', { main: 'App_chart' });
  },
});
*/
//

const exposed = FlowRouter.group({});

exposed.route('/login',{
 name: 'login',
 action(){
   BlazeLayout.render('login');
  }
});

const loggedIn = FlowRouter.group({
 triggersEnter: [ () => {
   if(!Meteor.loggingIn() && !Meteor.userId()){
     let route = FlowRouter.current();
     if(route.route.name != 'login'){
       Session.set('redirectAfterLogin', route.path);
     }
     FlowRouter.go('login');
   }
 }]
});

Accounts.onLogin(()=>{
  let redirect = Session.get('redirectAfterLogin');
  if(redirect && redirect != '/login'){
      FlowRouter.go(redirect);
    }
});

loggedIn.route('/',{
 name: 'home',
 action: ()=>BlazeLayout.render('App_body', { main: 'App_home' })
});

loggedIn.route('/chart',{
 name: 'chart',
 action: ()=>BlazeLayout.render('App_body', { main: 'App_chart' })
});

loggedIn.route('/logout',{
 name: 'logout',
 action: () => {
     Meteor.logout(()=> FlowRouter.go(FlowRouter.path('login')))
    }
});

FlowRouter.wait();

Tracker.autorun(()=>{
  if(Roles.subscription.ready() && !FlowRouter._initialized)
     FlowRouter.initialize();
});