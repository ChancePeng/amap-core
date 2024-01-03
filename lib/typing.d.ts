/// <reference types="amap-js-api" />
export type CoverType = AMap.Overlay | AMap.Layer | AMap.VectorOverlay | AMap.OverlayDOM | AMap.VectorLayer;
export type RecordType<T = any> = Record<string, T>;
export interface Context {
    map?: AMap.Map;
}
interface CoverOption {
    id?: string;
    theme?: string;
}
type CoverProps<T = any> = CoverOption & T;
type Cover = CoverType & {
    destroy: () => void;
    setTheme: (key: string) => void;
    id: string;
};
export type CoverInstance = Cover;
export interface GroupOptions {
    id?: string;
}
export interface OverlayGroup extends AMap.OverlayGroup {
    destroy: () => void;
    setTheme: (key: string) => void;
    setFitView: () => void;
    findOverLays: (callback: (cover: Cover, index?: number) => boolean) => [OverlayGroup, OverlayGroup];
}
export interface LayerGroup extends AMap.LayerGroup {
    destroy: () => void;
    setTheme: (key: string) => void;
    setFitView: () => void;
    findLayers: (callback: (cover: Cover, index?: number) => boolean) => [LayerGroup, LayerGroup];
}
export type CoverGroup = LayerGroup | OverlayGroup;
export interface MapInstance {
    /**
     * 获取地图实例
     * @returns {AMap.Map}
     */
    getMap: () => AMap.Map;
    /**
     * 设置当前 store 的map实例
     * @param {AMap.Map} map
     */
    setMap: (map: AMap.Map) => void;
    /**
     * 创建封装后的遮罩
     * @param Constructor 遮罩构造器
     * @param opts 遮罩参数
     * @returns {Cover} 封装后的遮罩
     */
    create: <T extends CoverType, P = any>(Constructor: new (opts?: RecordType) => T, opts?: CoverProps<P>) => Cover;
    /**
     * 创建遮罩并添加到地图上
     * @param Constructor 遮罩构造器
     * @param opts  遮罩参数
     * @returns {Cover} 封装后的遮罩
     */
    add: <T extends CoverType, P = any>(Constructor: new (opts?: RecordType) => T, opts?: CoverProps<P>) => Cover;
    /**
     * 移除遮罩（并销毁）在地图上将消失
     * @param key 遮罩的key
     */
    remove: (key: string) => void;
    /**
     * 获取遮罩
     * @param key 遮罩的key
     * @returns
     */
    get: <T extends Cover>(key: string) => T | undefined;
    /**
     * 居中遮罩
     * @param {string | AMap.Overlay | AMap.Layer | AMap.Layer[]}key 遮罩的key 或者是
     * @returns
     */
    setFitView: (key: string | CoverType | CoverType[]) => void;
    /**
     * 获取主题
     * @param key 主题key
     * @returns {RecordType} 主题
     */
    getTheme: (key?: string) => RecordType;
    /**
     * 设置主题
     * @param key 主题key
     * @param value 主题值
     */
    setTheme: (key: string, value: any) => void;
    /**
     * 清空主题
     * @param key
     * @returns
     */
    clearTheme: (key?: string) => void;
    /**
     * 获取临时数据
     * @param key
     * @returns
     */
    getExtData: <T = any>(key: string) => T | undefined;
    /**
     * 设置临时数据
     * @param key
     * @param value
     * @returns
     */
    setExtData: (key: string, value: any) => void;
    /**
     * 清空临时数据
     */
    clearExtData: (key?: string) => void;
    /**
     * 创建遮罩分组
     * @param overlays
     * @param opts
     * @returns
     */
    createOverLayGroup: <T extends (AMap.VectorOverlay | AMap.OverlayDOM)>(overlays: T[], opts?: GroupOptions) => OverlayGroup;
    /**
     * 创建遮罩分组
     * @param layers
     * @param opts
     * @returns
     */
    createLayerGroup: <T extends AMap.Layer>(layers: T[], opts?: GroupOptions) => LayerGroup;
    /**
     * 获取遮罩分组
     * @param key
     * @returns
     */
    getGroup: <T extends CoverGroup>(key: string) => T | undefined;
    /**
     * 删除分组
     * @param key
     * @returns
     */
    removeGroup: (key: string) => void;
}
export {};
