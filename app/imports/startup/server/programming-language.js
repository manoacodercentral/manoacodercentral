import { ProgrammingLanguages } from '../../api/programming-language/ProgrammingLanguageCollection.js';
import { _ } from 'meteor/underscore';

/**
 * A list of programming languages to pre-fill the Collection.
 * @type {*[]}
 */
const programmingLanguageSeeds = [
  { name: 'C' },
  { name: 'C++' },
  { name: 'Java' },
  { name: 'JavaScript' },
  { name: 'Prolog' },
  { name: 'Python' },
];

/**
 * Initialize the OS collection if empty with seed data.
 */
if (ProgrammingLanguages.find().count() === 0) {
  _.each(programmingLanguageSeeds, function seedStuffs(programmingLanguage) {
    ProgrammingLanguages.define(programmingLanguage);
  });
}
