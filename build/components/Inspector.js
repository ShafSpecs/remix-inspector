"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemixInspector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@headlessui/react");
const remix_utils_1 = require("remix-utils");
const icons_1 = __importStar(require("./icons"));
const clsx_1 = __importDefault(require("clsx"));
const react_2 = require("react");
const react_json_tree_1 = require("react-json-tree");
const react_3 = require("@remix-run/react");
const STYLES = `
#remix-inspector *,
#remix-inspector ::before,
#remix-inspector ::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}
#remix-inspector ::before,
#remix-inspector ::after {
  --ri-content: "";
}
#remix-inspector {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
  tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
}
#remix-inspector {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}
#remix-inspector h1,
#remix-inspector h2,
#remix-inspector h3,
#remix-inspector h4,
#remix-inspector h5,
#remix-inspector h6 {
  font-size: inherit;
  font-weight: inherit;
}
#remix-inspector a {
  color: inherit;
  text-decoration: inherit;
}
#remix-inspector code,
#remix-inspector pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}
#remix-inspector table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}
#remix-inspector button {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}
#remix-inspector button {
  text-transform: none;
}
#remix-inspector button,
#remix-inspector [type="button"] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}
#remix-inspector :-moz-focusring {
  outline: auto;
}
#remix-inspector :-moz-ui-invalid {
  box-shadow: none;
}
#remix-inspector ::-webkit-inner-spin-button,
#remix-inspector ::-webkit-outer-spin-button {
  height: auto;
}
#remix-inspector dl,
#remix-inspector dd,
#remix-inspector h1,
#remix-inspector h2,
#remix-inspector h3,
#remix-inspector h4,
#remix-inspector h5,
#remix-inspector h6,
#remix-inspector figure,
#remix-inspector p {
  margin: 0;
}
#remix-inspector ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#remix-inspector button,
#remix-inspector [role="button"] {
  cursor: pointer;
}
#remix-inspector :disabled {
  cursor: default;
}
#remix-inspector svg {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}
#remix-inspector *,
#remix-inspector *::before,
#remix-inspector *::after {
  --ri-translate-x: 0;
  --ri-translate-y: 0;
  --ri-rotate: 0;
  --ri-skew-x: 0;
  --ri-skew-y: 0;
  --ri-scale-x: 1;
  --ri-scale-y: 1;
  --ri-pan-x: ;
  --ri-pan-y: ;
  --ri-pinch-zoom: ;
  --ri-scroll-snap-strictness: proximity;
  --ri-ordinal: ;
  --ri-slashed-zero: ;
  --ri-numeric-figure: ;
  --ri-numeric-spacing: ;
  --ri-numeric-fraction: ;
  --ri-ring-inset: ;
  --ri-ring-offset-width: 0px;
  --ri-ring-offset-color: #fff;
  --ri-ring-color: rgb(59 130 246 / 0.5);
  --ri-ring-offset-shadow: 0 0 #0000;
  --ri-ring-shadow: 0 0 #0000;
  --ri-shadow: 0 0 #0000;
  --ri-shadow-colored: 0 0 #0000;
  --ri-blur: ;
  --ri-brightness: ;
  --ri-contrast: ;
  --ri-grayscale: ;
  --ri-hue-rotate: ;
  --ri-invert: ;
  --ri-saturate: ;
  --ri-sepia: ;
  --ri-drop-shadow: ;
  --ri-backdrop-blur: ;
  --ri-backdrop-brightness: ;
  --ri-backdrop-contrast: ;
  --ri-backdrop-grayscale: ;
  --ri-backdrop-hue-rotate: ;
  --ri-backdrop-invert: ;
  --ri-backdrop-opacity: ;
  --ri-backdrop-saturate: ;
  --ri-backdrop-sepia: ;
}
#remix-inspector .disclosure-button {
  position: fixed;
  max-width: 52px;
  max-height: 52px;
  min-width: 52px;
  min-height: 52px;
  z-index: 9999;
  cursor: pointer;
  border-radius: 9999px;
  --ri-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--ri-bg-opacity));
  padding: 1rem;
  --ri-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --ri-shadow-colored: 0 10px 15px -3px var(--ri-shadow-color), 0 4px 6px -4px var(--ri-shadow-color);
  box-shadow: var(--ri-ring-offset-shadow, 0 0 #0000), var(--ri-ring-shadow, 0 0 #0000), var(--ri-shadow)
}
#remix-inspector .icon-code {
  height: 1.25rem;
  width: 1.25rem;
  --ri-text-opacity: 1;
  color: rgb(248 250 252 / var(--ri-text-opacity))
}
#remix-inspector .icon-close {
  height: 1.25rem;
  width: 1.25rem;
  --ri-text-opacity: 1;
  color: rgb(248 250 252 / var(--ri-text-opacity));
  cursor: pointer;
}
#remix-inspector .icon-refresh {
  height: 1rem;
  width: 1rem
}
@-webkit-keyframes ri-spin {
  to {
    transform: rotate(360deg)
  }
}
@keyframes ri-spin {
  to {
    transform: rotate(360deg)
  }
}
#remix-inspector .icon-refresh {
  -webkit-animation: ri-spin 1s linear infinite;
          animation: ri-spin 1s linear infinite
}
#remix-inspector .disclosure-panel {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 50;
  display: none;
  width: 100%;
  border-top-width: 0px;
  max-height: 75vh;
  --ri-border-opacity: 1;
  border-color: rgb(71 85 105 / var(--ri-border-opacity));
  --ri-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--ri-bg-opacity));
  --ri-text-opacity: 1;
  color: rgb(255 255 255 / var(--ri-text-opacity))
}
#remix-inspector .disclosure-panel::after {
  content: '';
  background-color: rgb(71 85 105 / var(--ri-border-opacity));
  position: absolute;
  top: 0;
  height: 3px;
  width: 100%;
  cursor: ns-resize;
}
@media (min-width: 1024px) {
  #remix-inspector .disclosure-panel {
    display: block
  }
}
#remix-inspector .disclosure-panel-section > :not([hidden]) ~ :not([hidden]) {
  --ri-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--ri-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--ri-divide-y-reverse));
  --ri-divide-opacity: 1;
  border-color: rgb(71 85 105 / var(--ri-divide-opacity))
}
#remix-inspector .disclosure-panel-section {
  overflow: hidden;
  height: 100%;
}
#remix-inspector .disclosure-panel-section > div {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr))
}
#remix-inspector .disclosure-panel-section > div > :not([hidden]) ~ :not([hidden]) {
  --ri-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--ri-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--ri-divide-x-reverse)));
  --ri-divide-opacity: 1;
  border-color: rgb(71 85 105 / var(--ri-divide-opacity))
}
#remix-inspector .routes-section {
  min-height: 280px;
  height: 100%;
}
#remix-inspector .routes-section > :not([hidden]) ~ :not([hidden]) {
  --ri-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--ri-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--ri-divide-y-reverse));
  --ri-divide-opacity: 1;
  border-color: rgb(71 85 105 / var(--ri-divide-opacity))
}
#remix-inspector .routes-section {
  overflow-y: auto
}
#remix-inspector .disclosure-panel h2 {
  margin-right: auto;
  line-height: 1.25rem
}
#remix-inspector .disclosure-panel .refresh {
  font-size: 0.875rem;
  line-height: 1.25rem
}
#remix-inspector .route-option {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: left
}
#remix-inspector .route-option-active {
  --ri-bg-opacity: 1;
  background-color: rgb(30 41 59 / var(--ri-bg-opacity))
}
#remix-inspector .route-details-section {
  min-height: 280px;
  height: 100%;
}
#remix-inspector .route-details-section > :not([hidden]) ~ :not([hidden]) {
  --ri-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--ri-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--ri-divide-y-reverse));
  --ri-divide-opacity: 1;
  border-color: rgb(71 85 105 / var(--ri-divide-opacity))
}
#remix-inspector .route-details-section {
  overflow-y: auto
}
#remix-inspector .route-details-section h2 {
  line-height: 1.25rem
}
#remix-inspector .header {
  display: flex;
  align-items: center
}
#remix-inspector .header > :not([hidden]) ~ :not([hidden]) {
  --ri-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--ri-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--ri-space-x-reverse)))
}
#remix-inspector .header {
  --ri-bg-opacity: 1;
  background-color: rgb(30 41 59 / var(--ri-bg-opacity));
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  --ri-text-opacity: 1;
  color: rgb(248 250 252 / var(--ri-text-opacity))
}
#remix-inspector .json-tree {
  padding-left: 0.5rem;
  padding-right: 0.5rem
}
#remix-inspector .dragging {
  pointer-events: none;
}
`;
function RemixInspector({ defaultOpen = false, draggable = true, position = "top-right" }) {
    let matches = (0, react_3.useMatches)();
    let state = (0, remix_utils_1.useGlobalPendingState)();
    let { refresh } = (0, remix_utils_1.useDataRefresh)();
    let lastMatch = [...matches].reverse()[0];
    let [activeMatchId, setActiveMatchId] = (0, react_2.useState)(lastMatch.id);
    let activeMatch = (0, react_2.useMemo)(function findActiveMatchById() {
        var _a;
        return (_a = matches.find((match) => match.id === activeMatchId)) !== null && _a !== void 0 ? _a : lastMatch;
    }, [matches, lastMatch, activeMatchId]);
    (0, react_2.useEffect)(function rollbackToFirstMatchWhenIdIsRemoved() {
        if (matches.every((match) => match.id !== activeMatchId)) {
            setActiveMatchId(lastMatch.id);
        }
    }, [matches, activeMatchId, lastMatch.id]);
    const element = (0, react_2.useRef)(null);
    const rightPanel = (0, react_2.useRef)(null);
    let rect;
    let viewport = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    };
    (0, react_2.useEffect)(() => {
        if (element.current) {
            switch (position) {
                case "top-right":
                    element.current.style.top = "0.625rem";
                    element.current.style.right = "0.625rem";
                    break;
                case "top-left":
                    element.current.style.top = "0.625rem";
                    element.current.style.left = "0.625rem";
                    break;
                case "bottom-right":
                    element.current.style.bottom = "0.625rem";
                    element.current.style.right = "0.625rem";
                    break;
                case "bottom-left":
                    element.current.style.bottom = "0.625rem";
                    element.current.style.left = "0.625rem";
                    break;
            }
        }
        function dragElement(elmnt) {
            var _a, _b;
            if (!draggable) {
                return;
            }
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document && document.getElementById(((_a = elmnt.current) === null || _a === void 0 ? void 0 : _a.id) + "header") && draggable) {
                // if present, the header is where you move the DIV from:
                document.getElementById(((_b = elmnt.current) === null || _b === void 0 ? void 0 : _b.id) + "header").onmousedown = dragMouseDown;
            }
            else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.current.onmousedown = dragMouseDown;
            }
            function dragMouseDown(e) {
                if (window !== null) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // store the current viewport and element dimensions when a drag starts
                    rect = elmnt.current.getBoundingClientRect();
                    viewport.bottom = window.innerHeight;
                    viewport.left = 0;
                    viewport.right = window.innerWidth;
                    viewport.top = 0;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }
            }
            function elementDrag(e) {
                if (window !== null) {
                    e = e || window.event;
                    e.preventDefault();
                    elmnt.current.classList.add("dragging");
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    let newLeft = elmnt.current.offsetLeft - pos1;
                    let newTop = elmnt.current.offsetTop - pos2;
                    if (newLeft < viewport.left
                        || newTop < viewport.top
                        || newLeft + rect.width > viewport.right
                        || newTop + rect.height > viewport.bottom) {
                        // the element will hit the boundary, do nothing...
                    }
                    else {
                        // set the element's new position:
                        elmnt.current.style.top = (elmnt.current.offsetTop - pos2) + "px";
                        elmnt.current.style.left = (elmnt.current.offsetLeft - pos1) + "px";
                    }
                }
            }
            function closeDragElement() {
                if (window !== null) { // stop moving when mouse button is released:
                    elmnt.current.classList.remove("dragging");
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }
        }
        dragElement(element);
        // if (rightPanel.current) {
        const BORDER_SIZE = 3;
        let m_pos;
        function resize(e) {
            const dx = m_pos - e.y;
            m_pos = e.y;
            let newHeight = (parseInt(getComputedStyle(rightPanel.current, '').height) + dx);
            rightPanel.current.style.height = newHeight > 300 ? newHeight + "px" : "300px";
        }
        rightPanel.current.addEventListener("mousedown", function (e) {
            if (e.offsetY < BORDER_SIZE) {
                m_pos = e.y;
                document.addEventListener("mousemove", resize, false);
            }
        }, false);
        if (document !== null) {
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resize, false);
            }, false);
        }
        // }
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_1.Disclosure, { defaultOpen: defaultOpen, as: "div", id: "remix-inspector", children: [(0, jsx_runtime_1.jsx)("style", { dangerouslySetInnerHTML: { __html: STYLES } }), (0, jsx_runtime_1.jsx)(react_1.Disclosure.Button, { className: "disclosure-button", ref: element, id: draggable ? "buttonheader" : "", children: (0, jsx_runtime_1.jsx)(icons_1.default, { "aria-hidden": true, className: "icon-code" }) }), (0, jsx_runtime_1.jsx)(react_1.Disclosure.Panel, { className: "disclosure-panel", ref: rightPanel, unmount: false, children: (0, jsx_runtime_1.jsxs)("section", { className: "disclosure-panel-section", children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Remix Inspector" }), (0, jsx_runtime_1.jsx)(react_1.Disclosure.Button, { id: "play-button", children: (0, jsx_runtime_1.jsx)(icons_1.CloseIcon, { "aria-label": "Close", className: "icon-close" }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("section", { className: "routes-section", children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Routes" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "refresh", onClick: () => refresh(), children: "Refresh" }), state === "pending" ? ((0, jsx_runtime_1.jsx)(icons_1.RefreshIcon, { "aria-label": "Pending", className: "icon-refresh" })) : null] }), (0, jsx_runtime_1.jsx)("ul", { children: matches.map((match) => {
                                                return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)("route-option", {
                                                            "route-option-active": match.id === activeMatchId,
                                                        }), type: "button", onClick: () => setActiveMatchId(match.id), children: match.id }) }, match.id));
                                            }) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "route-details-section", children: [(0, jsx_runtime_1.jsx)(Header, { children: (0, jsx_runtime_1.jsx)("h2", { style: { lineHeight: "20px" }, children: "Route Details" }) }), (0, jsx_runtime_1.jsx)("div", { style: { paddingTop: 8, paddingBottom: 8 }, children: (0, jsx_runtime_1.jsx)(Table, { data: [
                                                    { key: "Pathname", value: activeMatch.pathname },
                                                    { key: "Route ID", value: activeMatch.id },
                                                ] }) }), (0, jsx_runtime_1.jsx)(Explorer, { data: activeMatch.data, heading: "Data Explorer" }), (0, jsx_runtime_1.jsx)(Explorer, { data: activeMatch.params, heading: "Params Explorer" }), (0, jsx_runtime_1.jsx)(Explorer, { data: activeMatch.handle, heading: "Handle Explorer" })] })] })] }) })] }));
}
exports.RemixInspector = RemixInspector;
function Header({ children }) {
    return (0, jsx_runtime_1.jsx)("header", { className: "header", children: children });
}
function Explorer({ data, heading }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header, { children: (0, jsx_runtime_1.jsx)("h3", { children: heading }) }), (0, jsx_runtime_1.jsx)("div", { className: "json-tree", children: (0, jsx_runtime_1.jsx)(react_json_tree_1.JSONTree, { data: data, invertTheme: false, theme: {
                        scheme: "monokai",
                        author: "wimer hazenberg (http://www.monokai.nl)",
                        base00: "#0f172a",
                        base01: "#383830",
                        base02: "#49483e",
                        base03: "#75715e",
                        base04: "#a59f85",
                        base05: "#f8f8f2",
                        base06: "#f5f4f1",
                        base07: "#f9f8f5",
                        base08: "#f92672",
                        base09: "#fd971f",
                        base0A: "#f4bf75",
                        base0B: "#a6e22e",
                        base0C: "#a1efe4",
                        base0D: "#66d9ef",
                        base0E: "#ae81ff",
                        base0F: "#cc6633",
                    } }) })] }));
}
function Table({ data }) {
    return ((0, jsx_runtime_1.jsx)("table", { style: { width: "100%" }, children: (0, jsx_runtime_1.jsx)("tbody", { children: data.map((row, index) => {
                return ((0, jsx_runtime_1.jsxs)("tr", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("td", { style: {
                                paddingLeft: 8,
                                paddingRight: 8,
                                width: "25%",
                            }, className: "text-slate-300", children: row.key }), (0, jsx_runtime_1.jsx)("td", { children: row.value })] }, index));
            }) }) }));
}
