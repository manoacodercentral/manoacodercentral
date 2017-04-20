import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const OS = new Mongo.Collection('OS');

/**
 * Create the schema for OS
 */
export const OSSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
  },
});

OS.attachSchema(OSSchema);
