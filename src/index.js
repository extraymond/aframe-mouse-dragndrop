import AFRAME from "aframe";

AFRAME.registerSystem("track-cursor", {
  init: function() {
    this.el.addEventListener("camera-set-active", () => {
      console.log("camera up")
      this.el.setAttribute("cursor", { rayOrigin: "mouse" });
    })
  }
});

AFRAME.registerComponent("track-cursor", {
  events: {
    mousedown: function() {
      this.el.sceneEl.camera.el.setAttribute("look-controls", {
        enabled: false
      });
      this.el.addState("tracking");
    },
    mouseup: function() {
      this.el.sceneEl.camera.el.setAttribute("look-controls", {
        enabled: true
      });
      this.el.removeState("tracking");
    }
  }
});

AFRAME.registerComponent("dragndrop", {
  dependencies: ["track-cursor"],
  events: {
    stateadded: function(e) {
      if (e.detail == "tracking") {
        this.el.addState("dragging");
      } else if (e.detail == "dragging") {
        this.dist = this.el.object3D.position
          .clone()
          .sub(this.camera.object3D.position)
          .length();
      }
    },
    stateremoved: function(e) {
      if (e.detail == "tracking") {
        this.range = 0;
        this.el.removeState("dragging");
      } else if (e.detail == "dragging") {
      }
    }
  },
  init: function() {
    this.range = 0;
    this.scene = this.el.sceneEl;
    this.camera = null
    this.el.sceneEl.addEventListener("camera-set-active", () => {
      this.camera = this.scene.camera.el;
    })
    this.dist = 0;
    this.direction = new AFRAME.THREE.Vector3();
    this.target = new AFRAME.THREE.Vector3();
    document.addEventListener("wheel", e => {
      if (e.deltaY < 0) {
        this.range += 0.1;
      } else {
        this.range -= 0.1;
      }
    });
  },
  updateDirection: function() {
    this.direction.copy(this.scene.getAttribute("raycaster").direction);
  },
  updateTarget: function() {
    this.target.copy(
      this.camera.object3D.position
        .clone()
        .add(this.direction.clone().multiplyScalar(this.dist + this.range))
    );
  },
  tick: function() {
    if (this.el.is("dragging")) {
      this.updateDirection();
      this.updateTarget();
      this.el.object3D.position.copy(this.target);
    }
  }
});
