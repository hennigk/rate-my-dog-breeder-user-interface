var reviewViewTpl = require('raw!./reviewTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');

var ReviewView = Backbone.View.extend({
    template: _.template( reviewViewTpl ),
    tagName: 'div',
    model: null,
    events: {},
    render: function() {
        this.$el.html( this.template({review: this.model}) );
        return this;
    }
});



module.exports = ReviewView;