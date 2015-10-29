var featuredBreederTpl = require('raw!./featuredBreederTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');

var featuredBreederView = Backbone.View.extend({
    template: _.template(featuredBreederTpl),
    tagName: 'div',
    model: null,
    events: {},
    render: function() {
        this.$el.html(this.template({topBreeders: this.model}));
        return this;
    }
});

module.exports = featuredBreederView;