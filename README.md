[![npm version](https://badgen.net/npm/v/aframe-mouse-dragndrop-component)](https://www.npmjs.com/package/aframe-mouse-dragndrop-component)
[![jsdelivr version](https://badgen.net/jsdelivr/v/npm/aframe-mouse-dragndrop-component)](https://cdn.jsdelivr.net/npm/aframe-mouse-dragndrop-component@1.0.4/dist/index.js)

# aframe-mouse-dragndrop

Drag-n-drop entites using mouse cursor.

## implementation

There's a new parameter in cursor component that we can use to monitor mouse interaction.

```html
<a-scene cursor="rayOrigin: mouse"></a-scene>
```

Based on this feature, we can intercept the event data emitting by the cursor component. [read more about cursor component](https://aframe.io/docs/0.9.0/components/cursor.html#intersection-data)

I've sperated this module into two sepearte component, **track-cursor** and **dragndrop**. And use dependencies to chain component startup. [read more about component dependencies](https://aframe.io/docs/0.9.0/core/component.html#dependencies)
So you can add features like animation or hovering effects before draggin it.

When a draggable component is being hovered by the cursor, it will make the entity into tracking state. You can check it with

```js
if (this.el.is("tracking")) {
  ...
}
```

If a draggable component is being pressed, it will enter the dragging state. Likewise you can check it with:

```js
if (this.el.is("dragging")) {
  ...
}
```

If you want to do some startup/cleanup before entering/exiting these two states, be sure to listener to "stateadded"/"stateremoved" events.

## usage

```html
<a-entity dragndrop></a-entity>
```

After adding the component, you can drag and drop it with mouse click.

## additional features

1.  When dragging the entity, look-controls on the camera will be temporary disabled.
2.  You can use mousewheel to send it further/closer when dragging.

Check out the live demo: [link](https://sassy-piper.glitch.me)

Appreciate any suggestions or feedback.
