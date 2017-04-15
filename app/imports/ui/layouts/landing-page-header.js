import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.LandingPageHeader.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });;
});

