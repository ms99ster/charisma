/**
 * Created by wl98336 on 3/28/2015.
 */
var CharismaRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "dashboard": "dashboard",
    "ui": "ui",
    "form": "form",
    "chart": "chart",
    "typography": "typography",
    "gallery": "gallery",
    "table": "table",
    "calendar": "calendar",
    "grid": "grid",
    "tour": "tour",
    "icon": "icon",
    "error": "error",
    "login": "login",
    "*notFound": "notFound"
  },
  home: function(){
    this.navigate("dashboard",{trigger:true});
  }
});
