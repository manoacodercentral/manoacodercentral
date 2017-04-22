import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { OS } from '../../api/os/OSCollection.js';
import { ProgrammingLanguages } from '../../api/programming-language/ProgrammingLanguageCollection.js';

export const timeList = ['Less than an hour', '1-3', '4-6', '7-9',
  '10-12', '13-15', '16-18', '19-21', '22-24', '25-27', '28-30', '31-33', '34 or more'];

Template.Edit_Profile_Page.helpers({
  planguages() {
    return _.map(ProgrammingLanguages.findAll(), function makePLangObject(planguage) {
      return { label: planguage.name };
    });
  },
  osystems() {
    return _.map(OS.findAll(),
        function makeOSObject(os) {
          return { label: os.name };
        });
  },
  times() {
    return _.map(timeList, function makeTimeObject(time) {
      return { label: time };
    });
  },
});
