var dataFunctions = require('./data');
var BreederView = require('../views/breeder');
var SearchView = require('../views/search');
var ResultsView = require('../views/results');
var ReviewView = require('../views/review');
var HomeView = require('../views/home');
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
            var breederView = new BreederView({
                model: breeder
            });
            $($app.html(breederView.render().el));
            $(document).foundation('clearing', 'reflow');
            navSearch();
        }
    );
}

function displaySearch() {
    dataFunctions.getBreeds()
        .then(function(breeds) {
            var homeView = new HomeView({});
            $app.html('');
            $($app.html(homeView.render().el));
            var $appSearch = $('#appSearch');
            $('#findBreeder').attr('href', '#homeSearch');
            navSearch();
            var searchView = new SearchView({
                model: breeds
            });
            $($appSearch.html(searchView.render().el));
        });
}


function displayResults(province, breed, pageNum, order, sort) {
    pageNum = +pageNum || 0;
    // console.log(pageNum);
    dataFunctions.getSearchResults(province, breed, pageNum, order, listLimit, sort)
        .then(function(results) {
            historyArray.push(Backbone.history.getFragment());
            var resultsView = new ResultsView({
                model: results
            });
            $app.html('');
            $($app.html(resultsView.render().el));
             var currentHeader = document.getElementById(order);
            $(document).foundation('equalizer', 'reflow');
            $('hr').css('margin-top', '0px');
            navSearch();
            if (sort === 'DESC') {
                $(currentHeader).attr('src', './images/tables/sort-down.gif');
            }
            if (sort === 'ASC') {
                $(currentHeader).attr('src', './images/tables/sort-up.gif');
                $(currentHeader).parent('a').attr('href', '#/' + Backbone.history.getFragment().substring(0, Backbone.history.getFragment().lastIndexOf('/')) + '/DESC')
            }
        });
}

function displayTextResults(searchName, pageNum, order, sort) {
    pageNum = +pageNum || 0;
    dataFunctions.getTextSearchResults(searchName, pageNum, order, listLimit, sort)
        .then(function(results) {
            // console.log(results)
            historyArray.push(Backbone.history.getFragment());
            // console.log(historyArray);
            var resultsView = new ResultsView({
                model: results
            });
            // console.log(resultsView)
            $app.html('');
            $($app.html(resultsView.render().el));
            $(document).foundation('equalizer', 'reflow');
            navSearch();
        });
}


function displayReviewForm() {
    var breeds;
    dataFunctions.getBreeds()
        .then(function(breedList) {
            breeds = breedList
            var history = Backbone.history.getFragment()
            var breederId = history.substring(history.indexOf("breeder/") + 8, history.lastIndexOf("/"));
            dataFunctions.getBreeder(breederId)
                .then(function(breederName) {
                    // console.log(breederName)
                    var reviewView = new ReviewView({
                        model: {
                            breeds: breeds,
                            breeder: breederName
                        }
                    });
                    $app.html('');
                    $($app.html(reviewView.render().el));
                    $(document).foundation('reveal', 'reflow');
                    navSearch();
                });
        });
}

function navSearch() {
    $("#navSearchButton").on('click', function(evt) {
        evt.preventDefault();
        var $searchName = $('#navSearchName').val();
        if ($searchName){
        // $('#navSearchButton').attr('href', '#/inputsearch/' + $searchName + '/page0/name/ASC');
            Backbone.history.navigate('#/inputsearch/' + $searchName + '/page0/name/ASC');
        }
    });
    $("#navSearchName").on('keyup', function(evt) {
        if (evt.keyCode === 13) {
            var $searchName = $('#navSearchName').val();
            Backbone.history.navigate('#/inputsearch/' + $searchName + '/page0/name/ASC');
        }
    });
}




module.exports = {
    displayBreeder: displayBreeder,
    displaySearch: displaySearch,
    displayResults: displayResults,
    displayTextResults: displayTextResults,
    displayReviewForm: displayReviewForm
};