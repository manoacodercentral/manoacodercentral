import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { OS } from '../../api/os/OSCollection.js';
import { ProgrammingLanguages } from '../../api/programming-language/ProgrammingLanguageCollection.js';
import { timeList } from './edit-profile-page';

Template.Profile_Pool_Page.helpers({
  planguages() {
    return _.map(ProgrammingLanguages.findAll(), function makePLangObject(planguage) {
      return { label: planguage.name };
    });
  },
  osystems() {
    return _.map(OS.findAll(),
        function makeOSObject(os) {
          return {
            label: os.name,
          };
        });
  },
  times() {
    return _.map(timeList, function makeTimeObject(time) {
      return { label: time };
    });
  },
});
