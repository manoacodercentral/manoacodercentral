import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

class requestCollection extends BaseCollection {

  constructor() {
    super('request', new SimpleSchema({
      projectType: { type: String },
      description: { type: String },
      month: { type: Integer },
      day: { type: Integer },
      year: { type: Integer },
      offer: { type: Integer },
      os: { type: String },
      license: { type: String },
      requestUser: { type: String},
    }));
  }
  define({ projectType, description, month, day, year, offer, os, license, requestUser }) {
    const checkPattern = {  projectType: String, description: String, month: Integer, day: Integer, year: Integer, offer: Integer, os: String, license: String, requestUser: String };
    check({ projectType, description, month, day, year, offer, os, license, requestUser }, checkPattern);

  }
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const projectType = doc.projectType;
    const description = doc.description;
    const month = doc.month;
    const day = doc.day;
    const year = doc.year;
    const offer = doc.offer;
    const os = doc.os;
    const license = doc.license;
    const requestUser= doc.requestUser;
    return { projectType, description, month, day, year, offer, os, license, requestUser };
  }

}

export const Request = new RequestCollection();
