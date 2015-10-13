var displaySearch = require('./lib/display.js');
// Add foundation dynamic functionality on page
$(document).foundation();

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        'home': 'showSearch',
        // 'breedlisting(/page:pageNum)': 'showBreeds',
        // 'breederlisting/:id': 'showBreeders'
    },
    
    showSearch: displaySearch
    // showBreeds: displayFunctions.displayAddressBook,
    // showBreeders: displayFunctions.displayEntry
});

var myRouter = new AppRouter();
Backbone.history.start();
