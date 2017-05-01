import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { OS } from '../../api/os/OSCollection.js';

Template.Add_Request.helpers({
  osystems() {
    return _.map(OS.findAll(),
        function makeOSObject(os) {
          return {
            label: os.name,
          };
        });
  },
});
