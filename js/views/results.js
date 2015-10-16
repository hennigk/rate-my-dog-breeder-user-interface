var resultsViewTpl = require('raw!./resultsTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var dataFunctions = require("../lib/data");
var $app = $('#app');

var ResultsView = Backbone.View.extend({
    template: _.template( resultsViewTpl ),
    tagName: 'div',
    model: null,
    events: {
        'click #next': 'getNext',
        'click #prev': 'getPrev',
    },
    getNext: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var next = page + 1;
            $('#next').attr('href', '#/' + path + next);
    },
    getPrev: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var prev = page - 1;
        if (prev >= 0) {
            $('#prev').attr('href', '#/' + path + prev);
        }
        else {
            $('#prev').removeAttr("href");
        }
    },
    render: function() {
        this.$el.html( this.template({results: this.model}) );
        return this;
    }
});



module.exports = ResultsView;