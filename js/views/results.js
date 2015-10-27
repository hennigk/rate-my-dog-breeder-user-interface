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
        // 'click .resultHeader a': 'switchSortImage'
    },
    // switchSortImage: function(evt){
    //     var $target = $(evt.target)
    //     if ($target.is('a')){
    //         $target = $target.children()
    //     }
    //     $('.resultHeader img').attr('src', './images/tables/sort-both.gif')
    //     $target.attr('src', './images/tables/sort-down.gif')
    // },
    showSearch: function(){
        dataFunctions.getBreeds()
        .then(function(breeds) {
        var searchView = new SearchView({
                model: breeds
            });
            $('#newSearch').html(searchView.render().el);
            $('#searchH2').hide();
            // $('section.searchLayout').addClass('searchResultsPage');
            window.scrollTo(0, $('.searchLayout').offset().top);
        });
    },
    getNext: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4, hist.indexOf("/", hist.indexOf("page"))));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var order = hist.substring(hist.indexOf("/", hist.indexOf("page")));
        var next = page + 1;
            $('#next').attr('href', '#/' + path + next + order);
    },
    getPrev: function(){
        var hist = Backbone.history.getFragment();
        var page = Number(hist.substring(hist.indexOf("page") + 4, hist.indexOf("/", hist.indexOf("page"))));
        var path = hist.substring(0, hist.indexOf("page") + 4);
        var prev = page - 1;
        var order = hist.substring(hist.indexOf("/", hist.indexOf("page")));
        if (prev >= 0) {
            $('#prev').attr('href', '#/' + path + prev + order);
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