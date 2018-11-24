/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
const applicationModule = require("tns-core-modules/application");
const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");
let homeview;

function onNavigatingTo(args) {
    const page = args.object;
    if(!page.bindingContext) {
      homeview = new HomeViewModel();
      page.bindingContext = homeview;
    }
}

exports.onNavigatingTo = onNavigatingTo;

exports.onPageLoaded = function (args) {
  if(homeview && !homeview.mapbox){
    homeview.addMap(args);
  }
};

exports.onNavigatedTo = function() {
  if(homeview){
    homeview.addMap();
  }
};

exports.onNavigatingFrom = function(args) {
  if(homeview){
    homeview.removeMap();
  }
};

exports.fabTap = function (args) {
  frameModule.topmost().navigate({
    moduleName: "second/second-page",
    transition: {
      name: "fade"
    },
    clearHistory: false
  });
};

applicationModule.on(applicationModule.resumeEvent, function (args) {
  if(homeview){
    try {
      homeview.addMap();
    } catch (e) {
      console.info("ERROR ADDING ", e)
    }
  }
});
