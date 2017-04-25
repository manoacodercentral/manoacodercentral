import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { OS } from '../../api/os/OSCollection.js';
import { ProgrammingLanguages } from '../../api/programming-language/ProgrammingLanguageCollection.js';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const timeList = ['Less than an hour', '1-3', '4-6', '7-9',
  '10-12', '13-15', '16-18', '19-21', '22-24', '25-27', '28-30', '31-33', '34 or more'];

Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Edit_Profile_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  osystems() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const os = profile.osystems;
    return profile && _.map(OS.findAll(),
            function makeOSObject(osystems) {
              return { label: os.name, selected: _.contains(os, osystems.name) };
            });
  },
  planguages() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const planguages = profile.planguages;
    return profile && _.map(ProgrammingLanguages.findAll(),
            function makeOSObject(languages) {
              return { label: planguages.name, selected: _.contains(planguages, languages.name) };
            });
  },
  times() {
    return _.map(timeList, function makeTimeObject(time) {
      return { label: time };
    });
  },
});


Template.Edit_Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const github = event.target.Github.value;
    const bio = event.target.Bio.value;
    const selectedPLanguages = _.filter(event.target.ProgrammingLanguages.selectedOptions, (option) => option.selected);
    const languages = _.map(selectedPLanguages, (option) => option.value);
    const selectedOSystems = _.filter(event.target.OS.selectedOptions, (option) => option.selected);
    const oSystems = _.map(selectedOSystems, (option) => option.value);
    const isBusy = event.target.IsBusy.value;
    const organizationName = event.target.Organization.value;

    const updatedProfileData = {
      username,
      isBusy,
      firstName,
      lastName,
      bio,
      github,
      organizationName,
      languages,
      oSystems,
    };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(updatedProfileData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: updatedProfileData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
