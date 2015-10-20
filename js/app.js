var displayFunctions = require('./lib/display.js');

$(document).foundation();

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showSearch',
        'search/:prov/:breed/page:pageNum/:order': 'showResults',
        'inputsearch/:name/page:pageNum/:order': 'showTextResults',
        'breeder/:id': 'showBreeder',
        'breeder/:id/review': 'showAddReviewForm'
    },
    showSearch: displayFunctions.displaySearch,
    showBreeder: displayFunctions.displayBreeder,
    showResults: displayFunctions.displayResults,
    showTextResults: displayFunctions.displayTextResults,
    showAddReviewForm: displayFunctions.displayReviewForm,
});


var myRouter = new AppRouter();
Backbone.history.start();
