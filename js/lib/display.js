var dataFunctions = require('./data');
var BreederView = require('../views/breeder');
var SearchView = require('../views/search');
var ResultsView = require('../views/results');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');
var listLimit = 10;
var historyArray = [];

function displayBreeder(breederId) {
    dataFunctions.getBreeder(breederId).then(
        function(breeder) {
            $app.html(''); // Clear the #app div
            breeder.history = historyArray[historyArray.length - 1];
            // console.log(breeder.history);
            var breederView = new BreederView ({model: breeder});
            $($app.html( breederView.render().el ));
        }
    );
}

function displaySearch() {
    dataFunctions.getBreeds()
    .then( function(breeds) {
            var searchView = new SearchView ({model: breeds});
            $app.html(''); // Clear the #app div
            $($app.html( searchView.render().el ));
        }
    );
}


function displayResults(province, breed, order, pageNum){
        pageNum = +pageNum || 0
        // console.log(pageNum);
        dataFunctions.getSearchResults(province, breed, order, pageNum, 10)
        .then(function(results){
            var resultsView = new ResultsView ({model: results});
            $($app.html( resultsView.render().el ));
            historyArray.push(Backbone.history.getFragment())
        })
}


module.exports = {
    displayBreeder: displayBreeder,
    displaySearch: displaySearch,
    displayResults: displayResults
};