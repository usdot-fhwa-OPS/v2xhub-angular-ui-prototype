export interface PluginMessage {
    id: number,
    type: string,
    subtype: string,
    count: number,
    lastTimestamp: string,
    averageInterval: number
}
