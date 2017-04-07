// The dropdown options would come from a collection later

import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

const languageList = ['C', 'C++', 'Java', 'JavaScript', 'Python'];

Template.Edit_Profile_Page.helpers({
  planguages() {
    return _.map(languageList, function makeInstrumentObject(planguage) {
      return { label: planguage };
    });
  },
});
