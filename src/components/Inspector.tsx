import React from "react";
import { Disclosure } from "@headlessui/react";
import { useGlobalPendingState, useDataRefresh } from "remix-utils";
import CodeIcon, { RefreshIcon, CloseIcon } from "./icons";
import clsx from "clsx";
import { type ReactNode, useEffect, useMemo, useState, useRef, RefObject } from "react";
import { JSONTree } from "react-json-tree";
import { useMatches } from "@remix-run/react";

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

type POSITION = "top-right" | "bottom-left" | "top-left" | "bottom-right";

export type RemixInspectorProps = {
  defaultOpen?: boolean;
  draggable?: boolean;
  position?: POSITION;
};

export function RemixInspector({ defaultOpen = false, draggable = true, position = "top-right" }: RemixInspectorProps): JSX.Element {
  let matches = useMatches();

  let state = useGlobalPendingState();

  let { refresh } = useDataRefresh();

  let lastMatch = [...matches].reverse()[0];

  let [activeMatchId, setActiveMatchId] = useState(lastMatch.id);

  let activeMatch = useMemo(
    function findActiveMatchById() {
      return matches.find((match) => match.id === activeMatchId) ?? lastMatch;
    },
    [matches, lastMatch, activeMatchId]
  );

  useEffect(
    function rollbackToFirstMatchWhenIdIsRemoved() {
      if (matches.every((match) => match.id !== activeMatchId)) {
        setActiveMatchId(lastMatch.id);
      }
    },
    [matches, activeMatchId, lastMatch.id]
  );

  const element = useRef<HTMLButtonElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);

  let rect: any;
  let viewport = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }

  useEffect(() => {
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

    function dragElement(elmnt: RefObject<HTMLButtonElement>) {
      if (!draggable) {
        return;
      }

      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document && document.getElementById(elmnt.current?.id + "header") && draggable) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.current?.id + "header")!.onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.current!.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e: MouseEvent) {
        if (window !== null) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;

          // store the current viewport and element dimensions when a drag starts
          rect = elmnt.current!.getBoundingClientRect();
          viewport.bottom = window.innerHeight;
          viewport.left = 0;
          viewport.right = window.innerWidth;
          viewport.top = 0;

          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      }

      function elementDrag(e: MouseEvent) {
        if (window !== null) {
          e = e || window.event;
          e.preventDefault();
          elmnt.current!.classList.add("dragging")

          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;

          let newLeft = elmnt.current!.offsetLeft - pos1;
          let newTop = elmnt.current!.offsetTop - pos2;

          if (newLeft < viewport.left
            || newTop < viewport.top
            || newLeft + rect.width > viewport.right
            || newTop + rect.height > viewport.bottom
          ) {
            // the element will hit the boundary, do nothing...
          } else {
            // set the element's new position:
            elmnt.current!.style.top = (elmnt.current!.offsetTop - pos2) + "px";
            elmnt.current!.style.left = (elmnt.current!.offsetLeft - pos1) + "px";
          }
        }
      }

      function closeDragElement() {
        if (window !== null) {// stop moving when mouse button is released:
          elmnt.current!.classList.remove("dragging")
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    }

    dragElement(element);

    // if (rightPanel.current) {
      const BORDER_SIZE = 3;

      let m_pos: number;
      function resize(e: MouseEvent) {
        const dx = m_pos - e.y;
        m_pos = e.y;
        let newHeight: number = (parseInt(getComputedStyle(rightPanel.current!, '').height) + dx);
        rightPanel.current!.style.height = newHeight > 300 ? newHeight + "px" : "300px";
      }

      rightPanel.current!.addEventListener("mousedown", function (e) {
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

  return (
    <Disclosure defaultOpen={defaultOpen} as="div" id="remix-inspector">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <Disclosure.Button className="disclosure-button" ref={element} id={draggable ? "buttonheader" : ""}>
        <CodeIcon aria-hidden className="icon-code" />
      </Disclosure.Button>

      <Disclosure.Panel className="disclosure-panel" ref={rightPanel} unmount={false}>
        <section className="disclosure-panel-section">
          <Header>
            <h2>Remix Inspector</h2>
            <Disclosure.Button id="play-button">
              <CloseIcon aria-label="Close" className="icon-close" />
            </Disclosure.Button>
          </Header>
          <div>
            {/* Route List Section (Left-Hand Side) */}
            <section className="routes-section">
              <Header>
                <h2>Routes</h2>
                <button
                  type="button"
                  className="refresh"
                  onClick={() => refresh()}
                >
                  Refresh
                </button>

                {state === "pending" ? (
                  <RefreshIcon aria-label="Pending" className="icon-refresh" />
                ) : null}
              </Header>
              <ul>
                {matches.map((match) => {
                  return (
                    <li key={match.id}>
                      <button
                        className={clsx("route-option", {
                          "route-option-active": match.id === activeMatchId,
                        })}
                        type="button"
                        onClick={() => setActiveMatchId(match.id)}
                      >
                        {match.id}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Table Section (Right-Hand Side) */}
            <section className="route-details-section">
              <Header>
                <h2 style={{ lineHeight: "20px" }}>Route Details</h2>
              </Header>
              <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                <Table
                  data={[
                    { key: "Pathname", value: activeMatch.pathname },
                    { key: "Route ID", value: activeMatch.id },
                  ]}
                />
              </div>

              <Explorer data={activeMatch.data} heading="Data Explorer" />
              <Explorer data={activeMatch.params} heading="Params Explorer" />
              <Explorer data={activeMatch.handle} heading="Handle Explorer" />
            </section>
          </div>
        </section>
      </Disclosure.Panel>
    </Disclosure>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <header className="header">{children}</header>;
}

function Explorer({ data, heading }: { data: unknown; heading: string }) {
  return (
    <>
      <Header>
        <h3>{heading}</h3>
      </Header>
      <div className="json-tree">
        <JSONTree
          data={data}
          invertTheme={false}
          theme={{
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
          }}
        />
      </div>
    </>
  );
}

function Table({ data }: { data: Array<Record<"key" | "value", string>> }) {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {data.map((row, index) => {
          return (
            <tr className="space-y-1" key={index}>
              <td
                style={{
                  paddingLeft: 8,
                  paddingRight: 8,
                  width: "25%",
                }}
                className="text-slate-300"
              >
                {row.key}
              </td>
              <td>{row.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
