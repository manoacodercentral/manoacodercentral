import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

class ProgrammingLanguageCollection extends BaseCollection {

  /**
   * Creates the programming language collection.
   */
  constructor() {
    super('ProgrammingLanguage', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new programming language.
   * @example
   * ProgrammingLanguage.define({ name: 'Python' });
   * @param { Object } description Object with keys name.
   * Name must be previously undefined.
   * @throws {Meteor.Error} If the programming Language definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Programming Language`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the programming language name corresponding to the passed interest docID.
   * @param programmingLanguageID A programming language docID.
   * @returns { String } A programming language name.
   * @throws { Meteor.Error} If the programming language docID cannot be found.
   */
  findName(programmingLanguageID) {
    this.assertDefined(programmingLanguageID);
    return this.findDoc(programmingLanguageID).name;
  }

  /**
   * Returns a list of programming language names corresponding to the passed list of programming language docIDs.
   * @param programmingLanguageIDs A list of programming language docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(programmingLanguageIDs) {
    return programmingLanguageIDs.map(programmingLanguageID => this.findName(programmingLanguageID));
  }

  /**
   * Throws an error if the passed name is not a defined programming language name.
   * @param name The name of a programming language.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all programming language names.
   * @param names An array of (hopefully) programming language names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed programming language name, or throws an error if it cannot be found.
   * @param { String } name A programming language name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with a programming language.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of programming language names,
   * or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of programming language names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not a programming language name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the programming language docID in a format acceptable to define().
   * @param docID The docID of a programming language.
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
export const ProgrammingLanguages = new ProgrammingLanguageCollection();
