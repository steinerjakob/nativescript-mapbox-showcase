const observableModule = require("tns-core-modules/data/observable");
const { Mapbox, MapboxView, MapboxMarker, MapboxCluster, MapStyle, LatLng}= require("nativescript-mapbox");
const applicationModule = require("tns-core-modules/application");
const frameModule = require("ui/frame");
const View = require("ui/core/view");

let map;

async function saveAllSettings(args) {
  //Save your settings with "application-settings"
  //Remove mapview from parent view
  try {
    const mymapview = frameModule.topmost().getViewById("mymapview");
    if (mymapview) {  //sometimes on creating the app with the tns run android mymapview is undefined
      if (map) {
        await map.destroy();
        map = null;
      }
      mymapview.removeChildren();
    }
  } catch (e) {

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
        self.mapbox.accessToken = "pk.eyJ1Ijoic3RvYW5hIiwiYSI6ImNqOXB5OTRoejR2dGUyenF0YW9pZTMzb3IifQ.mVSNm3StOEgBpmqk1Pm6Bg";
        self.mapbox.mapStyle = "streets";
        self.mapbox.height = "100%";
        self.mapbox.width = "100%";
        self.mapbox.latitude = 47.748670;
        self.mapbox.longitude = 14.726023;
        self.mapbox.zoomLevel = 7;
        self.mapbox.showUserLocation = true;
        self.mapbox.disableRotation = "false";
        self.mapbox.disableTilt = "false";
        self.mapbox.hideLogo = "false";
        self.mapbox.hideAttribution = "false";
        self.mapbox.addEventListener("mapReady", self.onMapReady, this);
        map = self.mapbox;
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
        self.mapview = args.map;
      },
      removeMap : saveAllSettings
    });

    return viewModel;
}

module.exports = HomeViewModel;
