/// <reference types="amap-js-api" />
import { MapInstance } from './typing';
declare class MapStore {
    private covers;
    private themes;
    private context;
    private extData;
    private coverGroups;
    constructor(map?: AMap.Map);
    private get map();
    getMap: () => MapInstance;
    private setMap;
    private getMapInstance;
    private create;
    private add;
    private get;
    private remove;
    private getTheme;
    private setTheme;
    private clearTheme;
    private getExtData;
    private setExtData;
    private clearExtData;
    private setFitView;
    private createOverLayGroup;
    private createLayerGroup;
    private getGroup;
    private removeGroup;
}
export default MapStore;
export * from './typing';
