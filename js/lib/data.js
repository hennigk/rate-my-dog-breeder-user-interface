var Backbone = require('backbone');

var config = {
    'hennigk.github.io': {
        API_URL: 'rate-my-dog-breeder.herokuapp.com/api'
    },
    'rate-my-dog-breeder-user-interface-hennigk.c9.io': {
        API_URL: 'https://rate-my-dog-breeder-hennigk.c9.io/api'
    }
}

var currentConfig = config[window.location.hostname];


// var API_URL;
// if (window.location.hostname === 'rate-my-dog-breeder-user-interface-hennigk.c9.io') {
//     API_URL = "https://rate-my-dog-breeder-hennigk.c9.io/api";
// }
// else if (window.location.hostname === 'hennigk.github.io') {
//     API_URL = "https://rate-my-dog-breeder.herokuapp.com/api";
// }




var BreederModel = Backbone.Model.extend({
    urlRoot: currentConfig.API_URL + '/breeders',
    validate: function() {}
});

BreederModel.includeFilter = JSON.stringify({
    include: ['addresses', 'breeds', 'litters', 'reviews']
});


function getBreeder(breederId) {
    var breeder = new BreederModel({
        id: breederId
    });
    return breeder.fetch({
        data: {
            filter: BreederModel.includeFilter
        }
    }).then(
        function() {
            return breeder;
        }
    );
}

function getBreederName(breederId) {
    var breeder = new BreederModel({
        id: breederId
    });
    return breeder.fetch({
        data: {
            filter: BreederModel
        }
    }).then(
        function() {
            return breeder;
        }
    );
}


function limitValidation(limit){
    if (!Number(limit)) {
        limit = 10;
    }
    return limit;
}

function pageValidation(page, limit){
    if (Number(page)) {
        page = page * limit;
    }
    else {
        page = 0;
    }
    return page;
}
function getSearchResults(province, breedId, page, order, limit) {
    limit = limitValidation(limit);
    page = pageValidation(page, limit);
    return $.get(currentConfig.API_URL + "/breeders/search?province=" + province + "&breed=" + breedId + "&order=" + order + "&page=" + page + '&limit=' + limit)
        .then(function(response) {
            return response;
        });
}

function getTextSearchResults(searchName, page, order, limit) {
    limit = limitValidation(limit);
    page = pageValidation(page, limit);
    return $.get(currentConfig.API_URL + "/breeders/inputsearch?name=" + searchName + "&order=" + order + "&page=" + page + '&limit=' + limit)
        .then(function(response) {
            // console.log(response);
            return response;
        });
}


function getBreeds() {
    return $.get(currentConfig.API_URL + "/breeds/?filter[order]=breedName%20ASC")
        .then(function(response) {
            return response;
        });
}

function postReview(reviewObj) {
    return $.ajax({
      type: "POST",
      url: currentConfig.API_URL + "/Reviews",
      data: reviewObj,
      dataType: "json"
    }).then(function(response) {
            return response;
        });
}

module.exports = {
    getBreeder: getBreeder,
    getBreederName: getBreederName,
    getBreeds: getBreeds,
    getSearchResults: getSearchResults,
    getTextSearchResults: getTextSearchResults,
    postReview: postReview
};