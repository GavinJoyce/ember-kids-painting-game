import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  cells: DS.hasMany('cell', { async: false }),

  init() {
    this._super(...arguments);

    for(let i=0; i<100; i++) {
      this.cells.createRecord();
    }
  },

  load(template) {
    for(let i=0; i<template.length; i++) {
      let cell = this.cells.objectAt(i);
      cell.set('color', template[i]);
    }
  },

  clear() {
    this.cells.setEach('color', 'white');
  },

  serialized: computed.mapBy('cells', 'color'),
  asJson: computed('serialized.[]', function() {
    return JSON.stringify(this.serialized, null, 2);
  })
});
