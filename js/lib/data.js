var Backbone = require('backbone');

var API_URL = "https://rate-my-dog-breeder-hennigk.c9.io/api";

var breederModel = Backbone.Model.extend({
    urlRoot: API_URL + '/breeders',
    validate: function() {
    }
});

breederModel.includeFilter = JSON.stringify({
    include: ['addresses','breeds','litters']
});


function getBreeder(breederId) {
    var breeder = new breederModel({id: breederId});
    return breeder.fetch({data: {filter: breederModel.includeFilter}}).then(
        function() {
            // console.log(breeder.get('name'));
            return breeder;
        }
    );
}

module.exports = getBreeder;