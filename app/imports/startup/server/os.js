import { OS } from '../../api/os/os.js';
import { _ } from 'meteor/underscore';

/**
 * A list of OS to pre-fill the Collection.
 * @type {*[]}
 */
const osSeeds = [
  { name: 'Android' },
  { name: 'iOS' },
  { name: 'Linux' },
  { name: 'Mac OS X' },
  { name: 'Unix' },
  { name: 'Windows' },
];

/**
 * Initialize the OS collection if empty with seed data.
 */
if (OS.find().count() === 0) {
  _.each(osSeeds, function seedStuffs(os) {
    OS.insert(os);
  });
}
