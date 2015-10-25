var homeViewTpl = require('raw!./homeTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');

var homeView = Backbone.View.extend({
    template: _.template(homeViewTpl),
    tagName: 'div',
    model: null,
    events: {},
    render: function() {
        this.$el.html(this.template({}));
        return this;
    }
});

module.exports = homeView;