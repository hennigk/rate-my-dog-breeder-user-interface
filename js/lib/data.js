var Backbone = require('backbone');

var API_URL = "https://rate-my-dog-breeder-hennigk.c9.io/api";


var BreederModel = Backbone.Model.extend({
    urlRoot: API_URL + '/breeders',
    validate: function() {
    }
});

BreederModel.includeFilter = JSON.stringify({
    include: ['addresses','breeds','litters']
});


function getBreeder(breederId) {
    var breeder = new BreederModel({id: breederId});
    return breeder.fetch({data: {filter: BreederModel.includeFilter}}).then(
        function() {
            return breeder;
        }
    );
}

function getSearchResults(province, breedId, order, page){
    return $.get(API_URL + "/breeders/search?province=" + province + "&breed=" + breedId + "&order=" + order + "&page=" + page)
    .then(function(response){
        return response;
    });
}

function getBreeds() {
    return $.get(API_URL + "/breeds/?filter[order]=breedName%20ASC")
    .then(function(response){
        return response;
    });
}



module.exports = {
   getBreeder: getBreeder,
   getBreeds: getBreeds,
   getSearchResults: getSearchResults
}; 