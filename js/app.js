var displayFunctions = require('./lib/display.js');
// Add foundation dynamic functionality on page
$(document).foundation();

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showSearch',
        'search/:prov/:breed/#:order/page:pageNum': 'showResults',
        'breeder/:id': 'showBreeder'
    },
    showSearch: displayFunctions.displaySearch,
    showBreeder: displayFunctions.displayBreeder,
    showResults: displayFunctions.displayResults,
//     initialize: function() {
//         this.routesHit = 0;
//     //keep count of number of routes handled by your application
//         Backbone.history.on('route', function() { this.routesHit++; }, this);
//     },

//     back: function() {
//         if(this.routesHit > 1) {
//         //more than one route hit -> user did not land to current page directly
//         window.history.back();
//     } 
//     else {
//       //otherwise go to the home page. Use replaceState if available so
//       //the navigation doesn't create an extra history entry
//       this.navigate('', {trigger:true, replace:true});
//     }
//   }
});

// });

var myRouter = new AppRouter();
Backbone.history.start();
