var breederModels = require('../lib/data.js');
var breederViewTpl = require('raw!./searchTemplate.ejs')
var _ = require('underscore');
var Backbone = require('backbone');

var breederView = Backbone.View.extend({
    template: _.template( breederViewTpl ),
    tagName: 'div',
    model: null,
    // events: {
    //     'click .editable': 'editSomething',
    //     'keyup .editing': 'saveSomething'
    // },
    // editSomething: function(evt) {
    //     var $this = $(evt.target);
    //     var origText = $this.text();
    //     $this.replaceWith($('<input class="editing">').attr('type', 'text').val(origText));
    // },
    // saveSomething: function(evt) {
    //     //  :)
    // },
    render: function() {
        this.$el.html( this.template({breeder: this.model}) );
        return this;
    }
});

module.exports = breederView;