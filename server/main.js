// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  data(){
    return [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
        ]
  }
});

Accounts.config({
  forbidClientAccountCreation: true
});