import DS from 'ember-data';

export default DS.Model.extend({
  color: DS.attr('string', { defaultValue: 'white' })
});
