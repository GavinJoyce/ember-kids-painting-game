import Controller from '@ember/controller';

export default Controller.extend({
  color: 'blue',

  init() {
    this._super(...arguments);

    this.set('game', this.store.createRecord('game'));
  },

  actions: {
    changeCellColor(cell) {
      cell.set('color', this.color);
    },
    newGame() {
      this.game.pickRandomTemplate();
    }
  }
});
