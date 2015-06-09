import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['loading'],

  drop: function(e) {
    var self = this;
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    this._makeCopy(files).forEach(function(file) {
      self.sendAction('action', file, self.get('model'));
    });
    return this.$().find("input[type=file]").val('');
  },
  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    return e.dataTransfer.dropEffect = 'copy';
  },
  dragLeave: function(e) {
    e.stopPropagation();
    return e.preventDefault();
  },
  dragEnter: function(e) {
    e.stopPropagation();
    return e.preventDefault();
  },

  actions: {
    openFileWindow: function() {
      this.$().find('input[type="file"]').click();
      return;
    },

    selectFile: function() {
      var files = this.$().find('input[type="file"]').get(0).files;
      var self = this;
      this._makeCopy(files).forEach(function(file) {
        self.sendAction('action', file, self.get('model'));
      });
      return this.$().find("input[type=file]").val('');
    }
  },

  _makeCopy: function(fileList) {
    var _i, _len;
    var results = [];
    for (_i = 0, _len = fileList.length; _i < _len; _i++) {
      var file = fileList[_i];
      results.push(file);
    }
    return results;
  },
  _yield: function(context, options, morph, blockArguments) {
    var get = Ember.get;
    var view = options.data.view;
    var parentView = this._parentView;
    var template = get(this, 'template');

    if (template) {
      Ember.assert("A Component must have a parent view in order to yield.", parentView);

      view.appendChild(Ember.View, {
        isVirtual: true,
        tagName: '',
        template: template,
        _blockArguments: blockArguments,
        _contextView: parentView,
        _morph: morph,
        context: get(view, 'context'),
        controller: get(view, 'controller')
      });
    }
  }
});
