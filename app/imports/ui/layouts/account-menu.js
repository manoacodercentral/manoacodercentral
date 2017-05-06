import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Account_Menu.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
