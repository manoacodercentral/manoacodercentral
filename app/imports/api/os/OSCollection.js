import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

class OSCollection extends BaseCollection {

  /**
   * Creates the OS collection.
   */
  constructor() {
    super('OS', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new OS.
   * @example
   * OS.define({ name: 'Ubuntu' });
   * @param { Object } description Object with keys name.
   * Name must be previously undefined.
   * @throws {Meteor.Error} If the OS definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another OS`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the OS name corresponding to the passed interest docID.
   * @param osID An interest docID.
   * @returns { String } An OS name.
   * @throws { Meteor.Error} If the OS docID cannot be found.
   */
  findName(osID) {
    this.assertDefined(osID);
    return this.findDoc(osID).name;
  }

  /**
   * Returns a list of OS names corresponding to the passed list of OS docIDs.
   * @param osIDs A list of OS docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(osIDs) {
    return osIDs.map(osID => this.findName(osID));
  }

  /**
   * Throws an error if the passed name is not a defined OS name.
   * @param name The name of an OS.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all OS names.
   * @param names An array of (hopefully) OS names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed OS name, or throws an error if it cannot be found.
   * @param { String } name An OS name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an OS.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of OS names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of OS names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an OS name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the OS docID in a format acceptable to define().
   * @param docID The docID of an OS.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return { name };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OS = new OSCollection();
