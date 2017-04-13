import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { languageList, osList, timeList } from './edit-profile-page';

Template.Profile_Pool_Page.helpers({
  planguages() {
    return _.map(languageList, function makeInstrumentObject(planguage) {
      return { label: planguage };
    });
  },
  osystems() {
    return _.map(osList, function makeInstrumentObject(os) {
      return { label: os };
    });
  },
  times() {
    return _.map(timeList, function makeInstrumentObject(time) {
      return { label: time };
    });
  },
});
