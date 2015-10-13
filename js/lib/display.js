var dataFunctions = require('./data');
var SearchView = require('../views/search.js');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');


function displayBreeder(breederId) {
    dataFunctions(breederId).then(
        function(breeder) {
            $app.html(''); // Clear the #app div
            console.log(breeder.get('name'))
            // var breederTemplate = _.template( $(searchView).html() );
            var searchView = new SearchView ({breeder})
            // console.log(searchView)
            // console.log(breeder)
            $($app.html( searchView.render().el ));
        }
    );
}


displayBreeder(33)

module.exports = displayBreeder;