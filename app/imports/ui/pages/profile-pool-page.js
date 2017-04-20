import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { OS } from '../../api/os/OSCollection.js';
import { languageList, timeList } from './edit-profile-page';

Template.Profile_Pool_Page.helpers({
  osystems() {
    return _.map(OS.findAll(),
        function makeOSObject(os) {
          return {
            label: os.name,
          };
        });
  },
  planguages() {
    return _.map(languageList, function makeInstrumentObject(planguage) {
      return { label: planguage };
    });
  },
  times() {
    return _.map(timeList, function makeInstrumentObject(time) {
      return { label: time };
    });
  },
});
