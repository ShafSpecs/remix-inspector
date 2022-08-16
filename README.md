# Remix Inspector

This is a tool to help you inspect a Remix ([Remix.run](https://remix.run)) routes data.

## Installation

```bash
npm install remix-inspector
```

## Usage

The Remix Inspector should be used in the root route and placed just below the `Outlet` tag and is to be used only in development:

```tsx
import { RemixInspector } from "remix-inspector";

// ...root.{tsx|jsx} file
<body>
  {/* ...other tags */}
  <Outlet />
  {process.env.NODE_ENV == "development" && <RemixInspector />}
  {/* ...remaining body tags */}
</body>
//  ...end of root.{tsx|jsx} file
```

## API Reference

Remix Inspector prop (options) descriptions:

| Name | Default | Description |
| :------ | :------ | :------ |
| `draggable` | `true` | Wether the Remix Inspector toggle button should be draggable around the page. |
| `position` | `top-right` | The position of the Remix Inspector toggle button. Possible options are: `top-left`, `top-right`, `bottom-right`, `bottom-left` |
| `defaultOpen` | `false` | Wether the Remix Inspector console should be open by default. |

Example:

```tsx
<RemixInspector draggable={false} position={"bottom-left"} defaultOpen={false}/>
```

*More options coming along...*

## Author

This project was concieved and originally created by [**@sergiodxa**](https://github.com/sergiodxa).
- [*Me*](https://github.com/ShafSpecs)