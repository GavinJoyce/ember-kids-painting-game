import Controller from '@ember/controller';

export default Controller.extend({
  color: 'black',

  actions: {
    changeCellColor(cell) {
      cell.set('color', this.color);
    }
  }
});
