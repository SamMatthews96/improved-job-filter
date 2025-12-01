import ChromeRuntime from "./chromeRuntime";
import MockRuntime from "./mockRuntime";
import type { RuntimeAPI } from "./types";

const Runtime: RuntimeAPI = 
    chrome.runtime ?
    new ChromeRuntime() : new MockRuntime()

export default Runtime