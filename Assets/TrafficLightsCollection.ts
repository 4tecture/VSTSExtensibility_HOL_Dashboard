﻿/// <reference path='../node_modules/vss-web-extension-sdk/typings/VSS.d.ts' />
import Contracts = require("TFS/Build/Contracts");
import BuildRestClient = require("TFS/Build/RestClient");
import TrafficLight = require("./TrafficLight");

export class TrafficLightsCollection {

    projectname: string;
    buildDefinitionId: number;
    buildDefinitionName: string;
    numberOfBuilds: number;
    trafficLightsElement: HTMLElement;
    builds: Contracts.Build[];
    trafficLights: TrafficLight.TrafficLight[];
    timerToken: number;

    constructor(projectname: string, builddefinition: number, numberofbuilds: number, element: HTMLElement) {
        this.projectname = projectname
        this.buildDefinitionId = builddefinition;
        this.numberOfBuilds = numberofbuilds;
        this.trafficLightsElement = element;

        this.updateBuildState();
        this.timerToken = setInterval(() => {
            this.updateBuildState();
        }, 5000);
    }

    public updateBuildState() {
        // todo: implement the restful communication to get the build states
    }

    private renderLights() {

        if (this.builds != null && this.builds.length > 0) {
            if (this.trafficLights == null || this.trafficLights.length != this.builds.length) {
                while (this.trafficLightsElement.hasChildNodes()) {
                    this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
                }
                this.trafficLights = [];
                for (var i = 0; i < this.builds.length; i++) {
                    var tlDiv = document.createElement("div");
                    tlDiv.classList.add("trafficlight");
                    this.trafficLightsElement.appendChild(tlDiv);
                    this.trafficLights[i] = new TrafficLight.TrafficLight(tlDiv);
                    this.trafficLights[i].UpdateBuildState(this.builds[i]);
                }
            }
            else {
                for (var i = 0; i < this.builds.length; i++) {
                    this.trafficLights[i].UpdateBuildState(this.builds[i]);
                }
            }

        }
        else {
            this.trafficLights = null;
            var paragraph = document.createElement("p");
            paragraph.innerHTML = "No builds available";
            while (this.trafficLightsElement.hasChildNodes()) {
                this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
            }
            this.trafficLightsElement.appendChild(paragraph);
        }
    }
}