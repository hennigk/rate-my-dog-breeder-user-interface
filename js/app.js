var displayFunctions = require('./lib/display.js');
// Add foundation dynamic functionality on page
$(document).foundation();

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showSearch',
        'search/:prov/:breed/#/:order(/page:pageNum)': 'showResults',
        'breeder/:id': 'showBreeder'
    },
    
    showSearch: displayFunctions.displaySearch,
    showBreeder: displayFunctions.displayBreeder,
    showResults: displayFunctions.displayResults
});

var myRouter = new AppRouter();
Backbone.history.start();
