var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_uuid = require("uuid");
__reExport(src_exports, require("./typing"), module.exports);
var MapStore = class {
  constructor(map) {
    this.getMap = () => {
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
        removeGroup: this.removeGroup
      };
    };
    this.setMap = (map) => {
      this.context.map = map;
    };
    this.getMapInstance = () => {
      return this.map;
    };
    this.create = (Constructor, opts) => {
      const { id = (0, import_uuid.v4)(), theme, ...fields } = opts || {};
      const style = this.getTheme(theme);
      const covers = this.covers;
      const getTheme = this.getTheme;
      class Cover extends Constructor {
        destroy() {
          super.destroy();
          delete covers[id];
        }
        setTheme(key) {
          const style2 = getTheme(key);
          super.setOptions({
            ...style2
          });
        }
        get id() {
          return id;
        }
      }
      const cover = new Cover({
        ...style,
        ...fields
      });
      this.covers[id] = cover;
      return cover;
    };
    this.add = (Constructor, opts) => {
      const cover = this.create(Constructor, opts);
      this.map.add(cover);
      return cover;
    };
    this.get = (key) => {
      return this.covers[key];
    };
    this.remove = (key) => {
      const cover = this.get(key);
      if (cover) {
        cover == null ? void 0 : cover.destroy();
      }
    };
    this.getTheme = (key) => {
      if (key) {
        return this.themes[key];
      }
      return {};
    };
    this.setTheme = (key, value) => {
      this.themes[key] = value;
    };
    this.clearTheme = (key) => {
      if (key) {
        delete this.themes[key];
      } else {
        this.themes = {};
      }
    };
    this.getExtData = (key) => {
      return this.extData[key];
    };
    this.setExtData = (key, value) => {
      this.extData[key] = value;
    };
    this.clearExtData = (key) => {
      if (key) {
        delete this.extData[key];
      } else {
        this.extData = {};
      }
    };
    this.setFitView = (key) => {
      if (typeof key === "string") {
        const cover = this.get(key);
        if (cover) {
          this.map.setFitView(cover);
        }
      } else {
        this.map.setFitView(key);
      }
    };
    this.createOverLayGroup = (overlays, opts) => {
      const { id } = opts || {};
      const remove = this.remove;
      const setFitView = this.setFitView;
      const createOverLayGroup = this.createOverLayGroup;
      class CoverGroup extends AMap.OverlayGroup {
        destroy() {
          this.getOverlays().forEach((cover) => {
            this.removeOverlay(cover);
            remove(cover.id);
          });
        }
        setTheme(key) {
          this.getOverlays().forEach((cover) => {
            cover.setTheme(key);
          });
        }
        setFitView() {
          setFitView(this.getOverlays());
        }
        findOverLays(callback) {
          const overlays2 = this.getOverlays();
          const result = createOverLayGroup([]);
          const filter = createOverLayGroup([]);
          overlays2.forEach((cover, index) => {
            const bool = callback(cover, index);
            if (bool) {
              result.addOverlay(cover);
            } else {
              filter.addOverlay(cover);
            }
          });
          return [
            result,
            filter
          ];
        }
      }
      ;
      const coverGroup = new CoverGroup(overlays);
      if (id) {
        this.coverGroups[id] = coverGroup;
      }
      return coverGroup;
    };
    this.createLayerGroup = (layers, opts) => {
      const { id } = opts || {};
      const remove = this.remove;
      const setFitView = this.setFitView;
      const createLayerGroup = this.createLayerGroup;
      class CoverGroup extends AMap.LayerGroup {
        destroy() {
          this.getLayers().forEach((cover) => {
            this.removeLayer(cover);
            remove(cover.id);
          });
        }
        setTheme(key) {
          this.getLayers().forEach((cover) => {
            cover.setTheme(key);
          });
        }
        setFitView() {
          setFitView(this.getLayers());
        }
        findLayers(callback) {
          const overlays = this.getLayers();
          const result = createLayerGroup([]);
          const filter = createLayerGroup([]);
          overlays.forEach((cover, index) => {
            const bool = callback(cover, index);
            if (bool) {
              result.addLayer(cover);
            } else {
              filter.addLayer(cover);
            }
          });
          return [
            result,
            filter
          ];
        }
      }
      const coverGroup = new CoverGroup(layers);
      if (id) {
        this.coverGroups[id] = coverGroup;
      }
      return coverGroup;
    };
    this.getGroup = (key) => {
      return this.coverGroups[key];
    };
    this.removeGroup = (key) => {
      const coverGroup = this.getGroup(key);
      coverGroup == null ? void 0 : coverGroup.destroy();
      delete this.coverGroups[key];
    };
    this.covers = {};
    this.themes = {};
    this.context = {
      map
    };
    this.extData = {};
    this.coverGroups = {};
  }
  get map() {
    if (this.context.map) {
      return this.context.map;
    }
    throw new Error("AMap.Map is not defined");
  }
};
var src_default = MapStore;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./typing")
});
//# sourceMappingURL=index.js.map
