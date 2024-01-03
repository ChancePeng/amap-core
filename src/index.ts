import { v4 as uuidv4 } from 'uuid'
import { MapInstance, RecordType, Context, CoverInstance, LayerGroup } from './typing'

class MapStore {
  private covers: RecordType<CoverInstance>;
  private themes: RecordType;
  private context: Context;
  private extData: RecordType;
  private coverGroups: RecordType;
  constructor(map?: AMap.Map) {
    this.covers = {};
    this.themes = {};
    this.context = {
      map
    };
    this.extData = {};
    this.coverGroups = {};
  }

  private get map(): AMap.Map {
    if (this.context.map) {
      return this.context.map
    }
    throw new Error('AMap.Map is not defined')
  }
  getMap = (): MapInstance => {
    return {
      getMap: this.getMapInstance,
      setMap: this.setMap,
      create: this.create,
      add: this.add,
      get: this.get,
      remove: this.remove,
      setFitView: this.setFitView,
      getTheme: this.getTheme,
      setTheme: this.setTheme,
      clearTheme: this.clearTheme,
      getExtData: this.getExtData,
      setExtData: this.setExtData,
      clearExtData: this.clearExtData,
      createLayerGroup: this.createLayerGroup,
      createOverLayGroup: this.createOverLayGroup,
      getGroup: this.getGroup,
      removeGroup: this.removeGroup,
    }
  }

  private setMap: MapInstance['setMap'] = (map) => {
    this.context.map = map
  }
  private getMapInstance = () => {
    return this.map
  }

  private create: MapInstance['create'] = (Constructor, opts) => {
    const { id = uuidv4(), theme, ...fields } = opts || {};
    const style = this.getTheme(theme);
    const covers = this.covers;
    const getTheme = this.getTheme;
    // @ts-ignore
    class Cover extends Constructor {
      destroy() {
        super.destroy();
        delete covers[id];
      }
      setTheme(key: string) {
        const style = getTheme(key)
        super.setOptions({
          ...style
        })
      }
      get id() {
        return id
      }
    }
    const cover = new Cover({
      ...style,
      ...fields
    });
    this.covers[id] = cover as CoverInstance;
    return cover as CoverInstance;
  }

  private add: MapInstance['add'] = (Constructor, opts) => {
    const cover = this.create(Constructor, opts);
    this.map.add(cover as AMap.Overlay);
    return cover;
  }

  private get = <T extends CoverInstance>(key: string) => {
    return this.covers[key] as (T | undefined);
  }


  private remove: MapInstance['remove'] = (key) => {
    const cover = this.get(key);
    if (cover) {
      // @ts-ignore
      cover?.destroy();
    }
  }

  private getTheme: MapInstance['getTheme'] = (key) => {
    if (key) {
      return this.themes[key]
    }
    return {}
  }
  private setTheme: MapInstance['setTheme'] = (key, value) => {
    this.themes[key] = value
  }

  private clearTheme: MapInstance['clearTheme'] = (key) => {
    if (key) {
      delete this.themes[key]
    } else {
      this.themes = {}
    }
  }

  private getExtData: MapInstance['getExtData'] = (key) => {
    return this.extData[key]
  }

  private setExtData: MapInstance['setExtData'] = (key, value) => {
    this.extData[key] = value
  }

  private clearExtData: MapInstance['clearExtData'] = (key) => {
    if (key) {
      delete this.extData[key]
    } else {
      this.extData = {}
    }
  }
  private setFitView: MapInstance['setFitView'] = (key) => {
    if (typeof key === 'string') {
      const cover = this.get(key);
      if (cover) {
        // @ts-ignore
        this.map.setFitView(cover)
      }
    } else {
      // @ts-ignore
      this.map.setFitView(key)
    }
  }

  private createOverLayGroup: MapInstance['createOverLayGroup'] = (overlays, opts) => {
    const { id } = opts || {};
    const remove = this.remove;
    const setFitView = this.setFitView;
    const createOverLayGroup = this.createOverLayGroup;
    class CoverGroup extends AMap.OverlayGroup {
      destroy() {
        this.getOverlays().forEach((cover: CoverInstance) => {
          this.removeOverlay(cover as AMap.OverlayDOM)
          remove(cover.id)
        })
      }
      setTheme(key: string) {
        this.getOverlays().forEach((cover: CoverInstance) => {
          cover.setTheme(key)
        })
      }
      setFitView() {
        setFitView(this.getOverlays())
      }
      findOverLays(callback: (cover: CoverInstance, index?: number) => boolean) {
        const overlays = this.getOverlays();
        const result = createOverLayGroup([]);
        const filter = createOverLayGroup([]);
        overlays.forEach((cover: CoverInstance, index: number) => {
          const bool = callback(cover, index);
          if (bool) {
            result.addOverlay(cover as AMap.VectorOverlay)
          } else {
            filter.addOverlay(cover as AMap.VectorOverlay)
          }
        })
        return [
          result,
          filter
        ] as [CoverGroup, CoverGroup]
      }
    };
    const coverGroup = new CoverGroup(overlays);
    if (id) {
      this.coverGroups[id] = coverGroup;
    }
    return coverGroup;
  }


  private createLayerGroup: MapInstance['createLayerGroup'] = (layers, opts) => {
    const { id } = opts || {}
    const remove = this.remove;
    const setFitView = this.setFitView;
    const createLayerGroup = this.createLayerGroup;
    class CoverGroup extends AMap.LayerGroup {
      destroy() {
        this.getLayers().forEach((cover: CoverInstance) => {
          this.removeLayer(cover as AMap.Layer)
          remove(cover.id);
        })
      }
      setTheme(key: string) {
        this.getLayers().forEach((cover: CoverInstance) => {
          cover.setTheme(key)
        })
      }
      setFitView() {
        setFitView(this.getLayers())
      }
      findLayers(callback: (cover: CoverInstance, index?: number) => boolean) {
        const overlays = this.getLayers();
        const result = createLayerGroup([]);
        const filter = createLayerGroup([]);
        overlays.forEach((cover: CoverInstance, index: number) => {
          const bool = callback(cover, index);
          if (bool) {
            result.addLayer(cover as AMap.Layer)
          } else {
            filter.addLayer(cover as AMap.Layer)
          }
        })
        return [
          result,
          filter
        ] as [LayerGroup, LayerGroup]
      }
    }
    const coverGroup = new CoverGroup(layers);
    if (id) {
      this.coverGroups[id] = coverGroup;
    }
    return coverGroup
  }

  private getGroup: MapInstance['getGroup'] = (key) => {
    return this.coverGroups[key]
  }

  private removeGroup: MapInstance['removeGroup'] = (key) => {
    const coverGroup = this.getGroup(key);
    coverGroup?.destroy();
    delete this.coverGroups[key];
  }
}

export default MapStore;

export * from './typing'