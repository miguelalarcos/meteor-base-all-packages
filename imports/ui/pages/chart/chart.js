import './chart.html';

import '../../components/spin/spin.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import c3 from 'c3';
import { callPromiseL } from '../../../lib/promise-call.js';

let loadingFlag = new ReactiveVar(false);

async function f(){    
  let data = await callPromiseL('data', loadingFlag);

  const chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: data,
        type: 'bar'
    }
  });
};

Template.App_chart.events({
    'click #generate_chart'(e, t){
        f();
    }
});

Template.App_chart.helpers({
    loading(){
        return loadingFlag.get();
    }
});