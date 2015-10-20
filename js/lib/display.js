var dataFunctions = require('./data');
var BreederView = require('../views/breeder');
var SearchView = require('../views/search');
var ResultsView = require('../views/results');
var ReviewView = require('../views/review');
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


function displayResults(province, breed, pageNum, order){
        pageNum = +pageNum || 0;
        // console.log(pageNum);
        dataFunctions.getSearchResults(province, breed, pageNum, order, listLimit)
        .then(function(results){
            historyArray.push(Backbone.history.getFragment());
            var resultsView = new ResultsView ({model: results});
            $app.html('');
            $($app.html( resultsView.render().el ));
        });
}

function displayTextResults(searchName, pageNum, order){
    pageNum = +pageNum || 0;
    dataFunctions.getTextSearchResults(searchName, pageNum, order, listLimit)
    .then(function(results){
        // console.log(results)
        historyArray.push(Backbone.history.getFragment());
        // console.log(historyArray);
        var resultsView = new ResultsView ({model: results});
        // console.log(resultsView)
        $app.html('');
        $($app.html( resultsView.render().el ));
    });
}


function displayReviewForm(){
    var breeds;
    dataFunctions.getBreeds()
    .then( function(breedList) {
        breeds = breedList
        var history = Backbone.history.getFragment()
        var breederId = history.substring(history.indexOf("breeder/") + 8, history.lastIndexOf("/"));
        dataFunctions.getBreeder(breederId)
        .then(function(breederName){
            // console.log(breederName)
            var reviewView = new ReviewView ({model: {breeds: breeds, breeder: breederName}});
            $app.html('');
            $($app.html( reviewView.render().el ));    
        });
    });
}




module.exports = {
    displayBreeder: displayBreeder,
    displaySearch: displaySearch,
    displayResults: displayResults,
    displayTextResults: displayTextResults,
    displayReviewForm: displayReviewForm
};