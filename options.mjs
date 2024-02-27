import {
  RESOLUTIONS,
  storage_default
} from "./chunks/chunk-Z2IP2BVE.mjs";

// src/options.ts
var UI = (() => {
  const elements = {
    blockedList: document.getElementById("blocked-list"),
    enabled: document.getElementById("enabled"),
    resolution: document.getElementById("resolution"),
    counterShow: document.getElementById("counter-show"),
    counterPeriod: document.getElementById("counter-period")
  };
  elements.blockedList.placeholder = [
    "facebook.com",
    "instagram.com",
    "youtube.com",
    "!music.youtube.com",
    "twitter.com",
    "reddit.com",
    "!reddit.com/r/MachineLearning"
  ].join("\n");
  const booleanToString = (b) => b ? "YES" : "NO";
  const stringToBoolean = (s) => s === "YES";
  const getEventTargetValue = (event) => event.target.value;
  elements.blockedList.addEventListener("input", (event) => {
    const blocked = getEventTargetValue(event).split("\n").map((s) => s.trim()).filter(Boolean);
    storage_default.set({ blocked });
  });
  elements.enabled.addEventListener("change", (event) => {
    const enabled = stringToBoolean(getEventTargetValue(event));
    storage_default.set({ enabled });
  });
  elements.resolution.addEventListener("change", (event) => {
    const resolution = getEventTargetValue(event);
    storage_default.set({ resolution });
  });
  elements.counterShow.addEventListener("change", (event) => {
    const counterShow = stringToBoolean(getEventTargetValue(event));
    storage_default.set({ counterShow });
  });
  elements.counterPeriod.addEventListener("change", (event) => {
    const counterPeriod = getEventTargetValue(event);
    storage_default.set({ counterPeriod });
  });
  const init = (items) => {
    if (items.blocked !== void 0) {
      elements.blockedList.value = items.blocked.join("\r\n");
    }
    if (items.enabled !== void 0) {
      elements.enabled.value = booleanToString(items.enabled);
    }
    if (items.resolution !== void 0) {
      elements.resolution.value = items.resolution;
      RESOLUTIONS.forEach((oneResolution) => {
        document.body.classList.remove(`resolution-${oneResolution}`);
      });
      document.body.classList.add(`resolution-${items.resolution}`);
    }
    if (items.counterShow !== void 0) {
      elements.counterShow.value = booleanToString(items.counterShow);
      document.body.classList.toggle("counter-show", items.counterShow);
    }
    if (items.counterPeriod !== void 0) {
      elements.counterPeriod.value = items.counterPeriod;
    }
  };
  return { elements, init };
})();
window.addEventListener("DOMContentLoaded", () => {
  const keys = ["blocked", "enabled", "resolution", "counterShow", "counterPeriod"];
  storage_default.get(keys, (local) => {
    UI.init(local);
    document.body.classList.add("ready");
  });
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local") {
      keys.forEach((key) => {
        if (changes[key]) {
          UI.init({ [key]: changes[key].newValue });
        }
      });
    }
  });
});
