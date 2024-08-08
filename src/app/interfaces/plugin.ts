import { PluginConfiguration } from "./plugin-configuration"

export interface Plugin{
    id: number,
    description: string,
    version: string,
    enabled: string,
    path: string,
    exeName: string,
    manifest: string,
    maxMessageInterval: number,
    commandLineParamters: string,
    name: string,
    configuration: PluginConfiguration[]
}