/// <reference path='../node_modules/vss-web-extension-sdk/typings/VSS.d.ts' />
/// <reference path="trafficlightscollection.ts" />
import TrafficLights = require("./TrafficLightsCollection");

function GetSettings(widgetSettings) {
    var config = JSON.parse(widgetSettings.customSettings.data);
    if (config != null) {
        if (config.buildDefinition != null) {
            return config;
        }
        return null;
    }
}

function RenderTrafficLights(WidgetHelpers, widgetSettings) {
    // todo: get all the settings and instantiate the TrafficLightsCollection. If there is no configuration at all, print some message.    
}


VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetStyles();
    VSS.register("BuildTrafficLightsWidget", function () {
        return {
            load: function (widgetSettings) {
                RenderTrafficLights(WidgetHelpers, widgetSettings);
                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            reload: function (widgetSettings) {
                RenderTrafficLights(WidgetHelpers, widgetSettings);
                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        };
    });
    VSS.notifyLoadSucceeded();
});