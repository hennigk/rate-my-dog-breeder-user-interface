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
        var $searchName = $('#searchName').val();
        // console.log($searchName);
        if ($searchName) {
            $('a').attr('href', '#/inputsearch/' + $searchName + '/#name/page0');
        }
        else {
           $('a').attr('href', '#/search/' + $province + '/' + $breed + '/#name/page0'); 
        }
    },
    render: function() {
        this.$el.html( this.template({breeds: this.model}) );
        return this;
    }
});

module.exports = searchView;