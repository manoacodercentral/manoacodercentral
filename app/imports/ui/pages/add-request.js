/**
 * Created by jake on 4/11/17.
 */

import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { OS } from '../../api/os/OSCollection.js';

$('.ui.radio.checkbox')
    .checkbox()
;

Template.Add_Request.helpers({
  osystems() {
    return _.map(OS.find().fetch(),
        function makeOSObject(os) {
          return {
            label: os.name,
          };
        });
  },
});
