// The dropdown options would come from a collection later

import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

export const languageList = ['C', 'C++', 'Java', 'JavaScript', 'Python'];
export const osList = ['Android', 'iOS', 'Linux', 'Mac OS X', 'Unix', 'Windows'];
export const timeList = ['Less than an hour', '1-3', '4-6', '7-9',
  '10-12', '13-15', '16-18', '19-21', '22-24', '25-27', '28-30', '31-33', '34 or more'];

Template.Edit_Profile_Page.helpers({
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