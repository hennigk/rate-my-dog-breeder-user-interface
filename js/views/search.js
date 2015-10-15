var searchViewTpl = require('raw!./searchTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');

var searchView = Backbone.View.extend({
    template: _.template( searchViewTpl ),
    tagName: 'div',
    model: null,
    events: {
        'click #searchButton': 'submitSearch',
    },
    submitSearch: function(evt) {
        var $province = $(".province").val();
        var $breed = $(".breed").val();
        $('a').attr('href', '#/search/' + $province + '/' + $breed + '/name');
    },
    render: function() {
        this.$el.html( this.template({breeds: this.model}) );
        return this;
    }
});

module.exports = searchView;