import { PluginConfiguration } from "./plugin-configuration"
export enum PluginState {
    Unkown = "Unknown",
    Started = "Started, waiting for connection...",
    Running = "Running",
    Stale = "Connection going stale",
    Stopped = "Stopped / Disconnected",


}
export class Plugin{
    id: number = 0;
    state: PluginState = PluginState.Stopped;
    description: string = ""
    version: string = "";
    enabled: string = "";
    path: string = "";
    exeName: string = "";
    manifest: string = "";
    maxMessageInterval: number = 0 ;
    commandLineParamters: string = "";
    name: string = ""; 
    configuration: PluginConfiguration[] = new Array();
}