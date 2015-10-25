var resultsViewTpl = require('raw!./resultsTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');
var dataFunctions = require('../lib/data');
var SearchView = require('../views/search');

var ResultsView = Backbone.View.extend({
    template: _.template( resultsViewTpl ),
    tagName: 'div',
    model: null,
    events: {
        'click #next': 'getNext',
        'click #prev': 'getPrev',
        'click #search': 'showSearch',
    },
    showSearch: function(){
        dataFunctions.getBreeds()
        .then(function(breeds) {
        var searchView = new SearchView({
                model: breeds
            });
            $('#newSearch').html(searchView.render().el);
            $('#searchH2').hide();
            $(window).scrollTop
        });
    },
    getNext: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4, hist.lastIndexOf("/")));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var sort = hist.substring(hist.lastIndexOf("/"));
        var next = page + 1;
            $('#next').attr('href', '#/' + path + next + sort);
    },
    getPrev: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4, hist.lastIndexOf("/")));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var prev = page - 1;
        var sort = hist.substring(hist.lastIndexOf("/"));
        if (prev >= 0) {
            $('#prev').attr('href', '#/' + path + prev + sort);
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