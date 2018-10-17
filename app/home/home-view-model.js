const observableModule = require("tns-core-modules/data/observable");
const { Mapbox, MapboxView, MapboxMarker, MapboxCluster, MapStyle, LatLng}= require("nativescript-mapbox");
const applicationModule = require("tns-core-modules/application");
const frameModule = require("ui/frame");
const View = require("ui/core/view");

function saveAllSettings(args) {
  //Save your settings with "application-settings"
  //Remove mapview from parent view
  const mymapview = frameModule.topmost().getViewById("mymapview");
  if(mymapview){  //sometimes on creating the app with the tns run android mymapview is undefined
    mymapview.removeChildren();
  }
}
applicationModule.on(applicationModule.suspendEvent, saveAllSettings);
applicationModule.on(applicationModule.exitEvent, saveAllSettings);

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
      mapbox: null,
      addMap: function (args) {
        const self = this;
        self.mapbox = new MapboxView();
        self.mapbox.accessToken = "<add your mapbox key here>";
        self.mapbox.mapStyle = "streets";
        self.mapbox.height = "100%";
        self.mapbox.width = "100%";
        self.mapbox.latitude = 48.201881;
        self.mapbox.longitude = 15.634800;
        self.mapbox.zoomLevel = 8;
        self.mapbox.showUserLocation = true;
        self.mapbox.disableRotation = "true";
        self.mapbox.disableTilt = "true";
        self.mapbox.hideLogo = "false";
        self.mapbox.addEventListener("mapReady", self.onMapReady, this);
        //Only load view from args if page is initial created. On resume page only gets redrawn, so we can access it with frameModule.topmost();
        if (args) {
          let myMapview = View.getViewById(args.object, "mymapview");
          myMapview.removeChildren();
          myMapview.addChild(self.mapbox);
        } else {
          try {
            let myMapview = frameModule.topmost().getViewById("mymapview");
            myMapview.addChild(self.mapbox);
          } catch (e) {
            console.info("mapview", e)
          }
        }
      },
      onMapReady : function (args) {
        //load your settings and apply changes to the mapview...
      }
    });

    return viewModel;
}

module.exports = HomeViewModel;
