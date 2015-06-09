import Ember from 'ember';

export default Ember.View.extend({
  templateName: '_file_load_view',
  in_progress: false,
  error: false,
  progress_style: "width:1%;",
  actions: {
    delete_file: function() {
      return this.get('context').destroyRecord().then((function(_this) {
        return function() {
          return _this.get('controller.model').reload().then(function() {
            return _this.get('view').rebuildAttachment();
          });
        };
      })(this));
    }
  },
  file_name: (function() {
    return this.get('context.file_name');
  }).property('context'),
  src: (function() {
    return "/admin/china_goods/" + (this.get('context.doc_id') || this.get('controller.model.id')) + '/' + this._thumb();
  }).property('context'),
  file_size: (function() {
    var size;
    size = this._bytesToSize(this.get('context.length'));
    return " (" + size + ")";
  }).property('context'),
  _bytesToSize: function(bytes) {
    var i, sizes;
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  },
  _mb_size: function() {
    return this.get('context').size / (1024 * 1024);
  },
  _thumb: function() {
    var exec, fileNames;
    fileNames = this.get('context.file_name').split('.');
    exec = fileNames.pop();
    return fileNames.join(".") + '_thumb.' + exec;
  }
});
