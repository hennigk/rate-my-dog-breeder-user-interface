var breederModels = require('../lib/data.js');
var breederViewTpl = require('raw!./breederTemplate.ejs')
var _ = require('underscore');
var Backbone = require('backbone');

var breederView = Backbone.View.extend({
    template: _.template( breederViewTpl ),
    tagName: 'div',
    model: null,
    render: function() {
        this.$el.html( this.template({breeder: this.model}) );
        return this;
    }
});

module.exports = breederView;