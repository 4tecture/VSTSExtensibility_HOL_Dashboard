import BuildRestClient = require("TFS/Build/RestClient");
import Contracts = require("TFS/Build/Contracts");

export class TrafficLightsWidgetConfiguration {
    widgetConfigurationContext = null;
    public CurrentProject = VSS.getWebContext().project.name;

    selectBuildDefinition: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selectBuildDefinition");
    
    constructor(public WidgetHelpers) {

    }

    public load(widgetSettings, widgetConfigurationContext) {
        this.widgetConfigurationContext = widgetConfigurationContext;

        this.initializeOptions(widgetSettings);

        this.selectBuildDefinition.addEventListener(
            "change",
            () => {
                this.widgetConfigurationContext.notify(this.WidgetHelpers.WidgetEvent.ConfigurationChange,
                    this.WidgetHelpers.WidgetEvent.Args(this.getCustomSettings()));
            });
        
        return this.WidgetHelpers.WidgetStatusHelper.Success();
    }

    public initializeOptions(widgetSettings) {
        // todo: load the build definitions
    }

    public getCustomSettings() {
        return {
            data: JSON.stringify({
                buildDefinition: this.selectBuildDefinition.value
            })
        };
    }

    public onSave() {
        // todo: save the settings from getCustomSettings helper implementation
    }
}


VSS.require(["TFS/Dashboards/WidgetHelpers"], (WidgetHelpers) => {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("BuildTrafficLightsWidget.Configuration", () => {
        var configuration = new TrafficLightsWidgetConfiguration(WidgetHelpers);
        return configuration;
    })

    VSS.notifyLoadSucceeded();
});
