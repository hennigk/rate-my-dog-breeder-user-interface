var searchViewTpl = require('raw!./searchTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');

var searchView = Backbone.View.extend({
    template: _.template(searchViewTpl),
    tagName: 'div',
    model: null,
    events: {
        'click #searchButton': 'submitSearch',
        'keyup #searchName': 'submitSearchEnter',
    },
    submitSearch: function() {
        var $province = $(".province").val();
        var $breed = $(".breed").val();
        var $searchName = $('#searchName').val();
        
        if ($searchName) {
            Backbone.history.navigate('#/inputsearch/' + $searchName + '/page0/name/ASC');
        }
        else {
            Backbone.history.navigate('#/search/' + $province + '/' + $breed + '/page0/name/ASC');
        }
    },
    submitSearchEnter: function(evt) {
        if (evt.keyCode === 13) {
            var $province = $(".province").val();
            var $breed = $(".breed").val();
            var $searchName = $('#searchName').val();
            if ($searchName) {
                // alert("hello")
                // window.location('https://rate-my-dog-breeder-user-interface-hennigk.c9.io/);
                Backbone.history.navigate('#/inputsearch/' + $searchName + '/page0/name/ASC');
                // $('a').attr('href', '#/inputsearch/' + $searchName + '/#name/page0');
            }
        }
    },
    render: function() {
        this.$el.html(this.template({
            breeds: this.model
        }));
        return this;
    }
});

module.exports = searchView;