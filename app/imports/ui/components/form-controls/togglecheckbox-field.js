import { Template } from 'meteor/templating';

Template.Toggle_Checkbox_Field.onRendered(function onRendered() {
  this.$('.ui.checkbox').checkbox();
});
