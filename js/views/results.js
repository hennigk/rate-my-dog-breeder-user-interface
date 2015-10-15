var resultsViewTpl = require('raw!./resultsTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var dataFunctions = require("../lib/data");
var $app = $('#app');

var ResultsView = Backbone.View.extend({
    template: _.template( resultsViewTpl ),
    tagName: 'div',
    model: null,
    events: {},
    render: function() {
        this.$el.html( this.template({results: this.model}) );
        return this;
    }
});



module.exports = ResultsView;