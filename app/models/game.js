import DS from 'ember-data';
import { computed } from '@ember/object';

const TEMPLATES = [
  [ "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "green", "green", "blue", "purple", "purple", "purple", "purple", "purple", "purple", "blue", "green", "green", "blue", "purple", "orange", "orange", "orange", "orange", "purple", "blue", "green", "green", "blue", "purple", "pink", "pink", "pink", "pink", "purple", "blue", "green", "green", "blue", "purple", "yellow", "yellow", "yellow", "yellow", "purple", "blue", "green", "green", "blue", "purple", "black", "black", "black", "black", "purple", "blue", "green", "green", "blue", "purple", "purple", "purple", "purple", "purple", "purple", "blue", "green", "green", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green" ],
  [ "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red", "yellow", "red" ],
  [ "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "white", "white", "blue", "blue", "blue", "blue", "white", "blue", "blue", "blue", "blue", "white", "white", "blue", "blue", "blue", "white", "white", "blue", "blue", "black", "blue", "blue", "blue", "black", "blue", "blue", "blue", "blue", "blue", "black", "black", "black", "black", "black", "blue", "blue", "blue", "blue", "blue", "black", "yellow", "black", "yellow", "black", "blue", "blue", "blue", "blue", "blue", "black", "black", "black", "black", "black", "black", "black", "black", "blue", "green", "green", "black", "pink", "black", "black", "black", "black", "black", "green", "green", "green", "black", "black", "black", "black", "black", "black", "black", "green", "green", "green", "black", "green", "black", "green", "black", "green", "black", "black" ]
];

export default DS.Model.extend({
  templatePicture: DS.belongsTo('picture', { async: false }),
  playerPicture: DS.belongsTo('picture', { async: false }),

  init() {
    this._super(...arguments);

    this.set('templatePicture', this.store.createRecord('picture'));
    this.set('playerPicture', this.store.createRecord('picture'));

    this.pickRandomTemplate();
  },

  correctCellCount: computed('templatePicture.cells.@each.{color}', 'playerPicture.cells.@each.{color}', function() {
    let count = 0;

    for(let i=0; i<this.templatePicture.cells.length; i++) {
      if (this.templatePicture.cells.objectAt(i).color === this.playerPicture.cells.objectAt(i).color) {
        count++;
      }
    }

    return count;
  }),

  isComplete: computed.equal('correctCellCount', 100),

  pickRandomTemplate() {
    let randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    this.templatePicture.load(randomTemplate);
    this.playerPicture.clear();
  }
});
