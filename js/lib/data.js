var Backbone = require('backbone');

var API_URL = "https://rate-my-dog-breeder-hennigk.c9.io/api";


var BreederModel = Backbone.Model.extend({
    urlRoot: API_URL + '/breeders',
    validate: function() {}
});

BreederModel.includeFilter = JSON.stringify({
    include: ['addresses', 'breeds', 'litters']
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
function getSearchResults(province, breedId, order, page, limit) {
    limit = limitValidation(limit);
    page = pageValidation(page, limit);
    return $.get(API_URL + "/breeders/search?province=" + province + "&breed=" + breedId + "&order=" + order + "&page=" + page + '&limit=' + limit)
        .then(function(response) {
            return response;
        });
}

function getTextSearchResults(searchName, order, page, limit) {
    limit = limitValidation(limit);
    page = pageValidation(page, limit);
    return $.get(API_URL + "/breeders/inputsearch?name=" + searchName + "&order=" + order + "&page=" + page + '&limit=' + limit)
        .then(function(response) {
            console.log(response);
            return response;
        });
    // return $.get(API_URL + "/breeders/?filter[where][or][0][name][regexp]=" + searchName + "&filter[where][or][1][kennel][regexp]=" + searchName + "&filter[include]=breeds&filter[include]=addresses&filter[order]=" + order + "&filter[skip]=" + skip + '&filter[limit]=' + limit)
    //     .then(function(response){
    //         return filterResults(response)
    //     })
    //     .then(function(filteredResults) {
    //         var next = false;
    //         if (filteredResults.length > limit - 1) {
    //             next = true;
    //         }
    //     return {    
    //         page: skip,
    //         offset: limit - 1,
    //         limit: next,
    //         results: filteredResults
    //     }
    // })
}


function getBreeds() {
    return $.get(API_URL + "/breeds/?filter[order]=breedName%20ASC")
        .then(function(response) {
            return response;
        });
}



module.exports = {
    getBreeder: getBreeder,
    getBreederName: getBreederName,
    getBreeds: getBreeds,
    getSearchResults: getSearchResults,
    getTextSearchResults: getTextSearchResults
};