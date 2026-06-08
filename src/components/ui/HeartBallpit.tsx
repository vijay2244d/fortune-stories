import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

class x {
  #e: any;
  canvas: any;
  camera: any;
  cameraMinAspect: any;
  cameraMaxAspect: any;
  cameraFov: any;
  maxPixelRatio: any;
  minPixelRatio: any;
  scene: any;
  renderer: any;
  #t: any;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render = this.#i;
  onBeforeRender = (a: any) => {};
  onAfterRender = (a: any) => {};
  onAfterResize = (a: any) => {};
  #s = false;
  #n = false;
  isDisposed = false;
  #o: any;
  #r: any;
  #a: any;
  #c = new THREE.Clock();
  #h = { elapsed: 0, delta: 0 };
  #l: any;
  constructor(e: any) {
    this.#e = { ...e };
    this.#m();
    this.#d();
    this.#p();
    this.resize();
    this.#g();
  }
  #m() {
    this.camera = new THREE.PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }
  #d() {
    this.scene = new THREE.Scene();
  }
  #p() {
    if (this.#e.canvas) {
      this.canvas = this.#e.canvas;
    } else if (this.#e.id) {
      this.canvas = document.getElementById(this.#e.id);
    } else {
      console.error('Three: Missing canvas or id parameter');
    }
    this.canvas.style.display = 'block';
    const e = {
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(this.#e.rendererOptions ?? {})
    };
    this.renderer = new THREE.WebGLRenderer(e);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }
  #g() {
    if (!(this.#e.size instanceof Object)) {
      window.addEventListener('resize', this.#f.bind(this));
      if (this.#e.size === 'parent' && this.canvas.parentNode) {
        this.#r = new ResizeObserver(this.#f.bind(this));
        this.#r.observe(this.canvas.parentNode);
      }
    }
    this.#o = new IntersectionObserver(this.#u.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0
    });
    this.#o.observe(this.canvas);
    document.addEventListener('visibilitychange', this.#v.bind(this));
  }
  #y() {
    window.removeEventListener('resize', this.#f.bind(this));
    this.#r?.disconnect();
    this.#o?.disconnect();
    document.removeEventListener('visibilitychange', this.#v.bind(this));
  }
  #u(e: any) {
    if (this.isDisposed) return;
    this.#s = e[0].isIntersecting;
    this.#s ? this.#w() : this.#z();
  }
  #v() {
    if (this.isDisposed) return;
    if (this.#s) {
      document.hidden ? this.#z() : this.#w();
    }
  }
  #f() {
    if (this.#a) clearTimeout(this.#a);
    this.#a = setTimeout(this.resize.bind(this), 100);
  }
  resize() {
    let e, t;
    if (this.#e.size instanceof Object) {
      e = this.#e.size.width;
      t = this.#e.size.height;
    } else if (this.#e.size === 'parent' && this.canvas.parentNode) {
      e = this.canvas.parentNode.offsetWidth;
      t = this.canvas.parentNode.offsetHeight;
    } else {
      e = window.innerWidth;
      t = window.innerHeight;
    }
    this.size.width = e;
    this.size.height = t;
    this.size.ratio = e / t;
    this.#x();
    this.#b();
    this.onAfterResize(this.size);
  }
  #x() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#A(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#A(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }
  #A(e: any) {
    const t = Math.tan(THREE.MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);
    this.camera.fov = 2 * THREE.MathUtils.radToDeg(Math.atan(t));
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const e = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if (this.camera.isOrthographicCamera) {
      this.size.wHeight = this.camera.top - this.camera.bottom;
      this.size.wWidth = this.camera.right - this.camera.left;
    }
  }
  #b() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#t?.setSize(this.size.width, this.size.height);
    let e = window.devicePixelRatio;
    if (this.maxPixelRatio && e > this.maxPixelRatio) {
      e = this.maxPixelRatio;
    } else if (this.minPixelRatio && e < this.minPixelRatio) {
      e = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(e);
    this.size.pixelRatio = e;
  }
  get postprocessing() {
    return this.#t;
  }
  set postprocessing(e) {
    this.#t = e;
    this.render = e.render.bind(e);
  }
  #w() {
    if (this.#n || this.isDisposed) return;
    const animate = () => {
      if (this.isDisposed) return;
      this.#l = requestAnimationFrame(animate);
      this.#h.delta = this.#c.getDelta();
      this.#h.elapsed += this.#h.delta;
      this.onBeforeRender(this.#h);
      this.render();
      this.onAfterRender(this.#h);
    };
    this.#n = true;
    this.#c.start();
    animate();
  }
  #z() {
    if (this.#n) {
      cancelAnimationFrame(this.#l);
      this.#n = false;
      this.#c.stop();
    }
  }
  #i() {
    this.renderer.render(this.scene, this.camera);
  }
  clear() {
    this.scene.traverse((e: any) => {
      if (e.geometry) {
        e.geometry.dispose();
      }
      if (e.material) {
        if (Array.isArray(e.material)) {
          e.material.forEach((m: any) => m.dispose());
        } else {
          e.material.dispose();
        }
      }
    });
    this.scene.clear();
  }
  dispose() {
    this.isDisposed = true;
    this.#y();
    this.#z();
    this.clear();
    this.#t?.dispose();
    this.renderer.dispose();
  }
}

const b = new Map(),
  A = new THREE.Vector2();
let R = false;
function S(e: any) {
  const t: any = {
    position: new THREE.Vector2(),
    nPosition: new THREE.Vector2(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...e
  };
  (function (e, t) {
    if (!b.has(e)) {
      b.set(e, t);
      if (!R) {
        document.body.addEventListener('pointermove', M);
        document.body.addEventListener('pointerleave', L);
        document.body.addEventListener('click', C);

        document.body.addEventListener('touchstart', TouchStart, { passive: false });
        document.body.addEventListener('touchmove', TouchMove, { passive: false });
        document.body.addEventListener('touchend', TouchEnd, { passive: false });
        document.body.addEventListener('touchcancel', TouchEnd, { passive: false });

        R = true;
      }
    }
  })(e.domElement, t);
  t.dispose = () => {
    const t = e.domElement;
    b.delete(t);
    if (b.size === 0) {
      document.body.removeEventListener('pointermove', M);
      document.body.removeEventListener('pointerleave', L);
      document.body.removeEventListener('click', C);

      document.body.removeEventListener('touchstart', TouchStart);
      document.body.removeEventListener('touchmove', TouchMove);
      document.body.removeEventListener('touchend', TouchEnd);
      document.body.removeEventListener('touchcancel', TouchEnd);

      R = false;
    }
  };
  return t;
}

function M(e: any) {
  A.x = e.clientX;
  A.y = e.clientY;
  processInteraction();
}

function processInteraction() {
  for (const [elem, t] of b) {
    const i = elem.getBoundingClientRect();
    if (D(i)) {
      P(t, i);
      if (!t.hover) {
        t.hover = true;
        t.onEnter(t);
      }
      t.onMove(t);
    } else if (t.hover && !t.touching) {
      t.hover = false;
      t.onLeave(t);
    }
  }
}

function C(e: any) {
  A.x = e.clientX;
  A.y = e.clientY;
  for (const [elem, t] of b) {
    const i = elem.getBoundingClientRect();
    P(t, i);
    if (D(i)) t.onClick(t);
  }
}

function L() {
  for (const t of b.values()) {
    if (t.hover) {
      t.hover = false;
      t.onLeave(t);
    }
  }
}

function TouchStart(e: any) {
  if (e.touches.length > 0) {
    e.preventDefault();
    A.x = e.touches[0].clientX;
    A.y = e.touches[0].clientY;

    for (const [elem, t] of b) {
      const rect = elem.getBoundingClientRect();
      if (D(rect)) {
        t.touching = true;
        P(t, rect);
        if (!t.hover) {
          t.hover = true;
          t.onEnter(t);
        }
        t.onMove(t);
      }
    }
  }
}

function TouchMove(e: any) {
  if (e.touches.length > 0) {
    e.preventDefault();
    A.x = e.touches[0].clientX;
    A.y = e.touches[0].clientY;

    for (const [elem, t] of b) {
      const rect = elem.getBoundingClientRect();
      P(t, rect);

      if (D(rect)) {
        if (!t.hover) {
          t.hover = true;
          t.touching = true;
          t.onEnter(t);
        }
        t.onMove(t);
      } else if (t.hover && t.touching) {
        t.onMove(t);
      }
    }
  }
}

function TouchEnd() {
  for (const [, t] of b) {
    if (t.touching) {
      t.touching = false;
      if (t.hover) {
        t.hover = false;
        t.onLeave(t);
      }
    }
  }
}

function P(e: any, t: any) {
  const { position: i, nPosition: s } = e;
  i.x = A.x - t.left;
  i.y = A.y - t.top;
  s.x = (i.x / t.width) * 2 - 1;
  s.y = (-i.y / t.height) * 2 + 1;
}
function D(e: any) {
  const { x: t, y: i } = A;
  const { left: s, top: n, width: o, height: r } = e;
  return t >= s && t <= s + o && i >= n && i <= n + r;
}

const { randFloat: k, randFloatSpread: E } = THREE.MathUtils;
const F = new THREE.Vector3();
const I = new THREE.Vector3();
const O = new THREE.Vector3();
const V = new THREE.Vector3();
const B = new THREE.Vector3();
const N = new THREE.Vector3();
const _ = new THREE.Vector3();
const j = new THREE.Vector3();
const H = new THREE.Vector3();
const T = new THREE.Vector3();

class W {
  config: any;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: THREE.Vector3;
  
  constructor(e: any) {
    this.config = e;
    this.positionData = new Float32Array(3 * e.count).fill(0);
    this.velocityData = new Float32Array(3 * e.count).fill(0);
    this.sizeData = new Float32Array(e.count).fill(1);
    this.center = new THREE.Vector3();
    this.#R();
    this.setSizes();
  }
  #R() {
    const { config: e, positionData: t } = this;
    this.center.toArray(t, 0);
    for (let i = 1; i < e.count; i++) {
      const s = 3 * i;
      t[s] = E(2 * e.maxX);
      t[s + 1] = E(2 * e.maxY);
      t[s + 2] = E(2 * e.maxZ);
    }
  }
  setSizes() {
    const { config: e, sizeData: t } = this;
    t[0] = e.size0;
    for (let i = 1; i < e.count; i++) {
      t[i] = k(e.minSize, e.maxSize);
    }
  }
  update(e: any) {
    const { config: t, center: i, positionData: s, sizeData: n, velocityData: o } = this;
    let r = 0;
    if (t.controlSphere0) {
      r = 1;
      F.fromArray(s, 0);
      F.lerp(i, 0.1).toArray(s, 0);
      V.set(0, 0, 0).toArray(o, 0);
    }
    for (let idx = r; idx < t.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s, base);
      B.fromArray(o, base);
      B.y -= e.delta * t.gravity * n[idx];
      B.multiplyScalar(t.friction);
      B.clampLength(0, t.maxVelocity);
      I.add(B);
      I.toArray(s, base);
      B.toArray(o, base);
    }
    for (let idx = r; idx < t.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s, base);
      B.fromArray(o, base);
      const radius = n[idx];
      for (let jdx = idx + 1; jdx < t.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(s, otherBase);
        N.fromArray(o, otherBase);
        const otherRadius = n[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          j.copy(_)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(s, base);
          B.toArray(o, base);
          O.add(j);
          N.add(T);
          O.toArray(s, otherBase);
          N.toArray(o, otherBase);
        }
      }
      if (t.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + n[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }
      if (Math.abs(I.x) + radius > t.maxX) {
        I.x = Math.sign(I.x) * (t.maxX - radius);
        B.x = -B.x * t.wallBounce;
      }
      if (t.gravity === 0) {
        if (Math.abs(I.y) + radius > t.maxY) {
          I.y = Math.sign(I.y) * (t.maxY - radius);
          B.y = -B.y * t.wallBounce;
        }
      } else if (I.y - radius < -t.maxY) {
        I.y = -t.maxY + radius;
        B.y = -B.y * t.wallBounce;
      }
      const maxBoundary = Math.max(t.maxZ, t.maxSize);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (t.maxZ - radius);
        B.z = -B.z * t.wallBounce;
      }
      I.toArray(s, base);
      B.toArray(o, base);
    }
  }
}

// Removed custom shader material that breaks on newer Three.js versions

const X = {
  count: 100,
  colors: [0, 0, 0],
  ambientColor: 16777215,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  minSize: 0.8,
  maxSize: 1.5,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};

const U = new THREE.Object3D();

const createHeartGeometry = () => {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x + 5, y + 5);
  shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.5, bevelThickness: 0.5 };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  geometry.scale(0.06, 0.06, 0.06); // scaled up slightly for better visibility
  geometry.rotateZ(Math.PI);
  geometry.clearGroups();
  return geometry;
}

class Z extends THREE.InstancedMesh {
  config: any;
  physics: any;
  ambientLight: any;
  light: any;

  constructor(e: any, t = {}) {
    const i = { ...X, ...t };
    const s = new RoomEnvironment();
    const n = new THREE.PMREMGenerator(e).fromScene(s).texture;
    
    // Use custom Heart Geometry instead of SphereGeometry
    const o = createHeartGeometry();
    const r = new THREE.MeshPhysicalMaterial({ precision: 'highp', envMap: n, ...i.materialParams }) as any;
    r.envMapRotation.x = -Math.PI / 2;
    super(o, r, i.count);
    this.config = i;
    this.physics = new W(i);
    (this as any).#S();
    (this as any).setColors(i.colors);
  }
  #S() {
    (this as any).ambientLight = new THREE.AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    (this as any).add((this as any).ambientLight);
    (this as any).light = new THREE.PointLight(this.config.colors[0], this.config.lightIntensity);
    (this as any).add((this as any).light);
  }
  setColors(e: any) {
    if (Array.isArray(e) && e.length > 1) {
      const t = (function (e) {
        let t: any, i: any;
        function setColors(e: any) {
          t = e;
          i = [];
          t.forEach((col: any) => {
            i.push(new THREE.Color(col));
          });
        }
        setColors(e);
        return {
          setColors,
          getColorAt: function (ratio: any, out = new THREE.Color()) {
            const scaled = Math.max(0, Math.min(1, ratio)) * (t.length - 1);
            const idx = Math.floor(scaled);
            const start = i[idx];
            if (idx >= t.length - 1) return start.clone();
            const alpha = scaled - idx;
            const end = i[idx + 1];
            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);
            return out;
          }
        };
      })(e);
      for (let idx = 0; idx < (this as any).count; idx++) {
        (this as any).setColorAt(idx, t.getColorAt(idx / (this as any).count));
        if (idx === 0) {
          (this as any).light.color.copy(t.getColorAt(idx / (this as any).count));
        }
      }
      (this as any).instanceColor!.needsUpdate = true;
    }
  }
  update(e: any) {
    this.physics.update(e);
    for (let idx = 0; idx < (this as any).count; idx++) {
      U.position.fromArray(this.physics.positionData, 3 * idx);
      
      // Random rotation based on index so the hearts look scattered
      U.rotation.x = (idx * 0.5) % Math.PI;
      U.rotation.y = (idx * 0.7) % Math.PI;
      U.rotation.z = (idx * 0.3) % Math.PI;

      if (idx === 0 && this.config.followCursor === false) {
        U.scale.setScalar(0);
      } else {
        U.scale.setScalar(this.physics.sizeData[idx]);
      }
      U.updateMatrix();
      (this as any).setMatrixAt(idx, U.matrix);
      if (idx === 0) (this as any).light.position.copy(U.position);
    }
    (this as any).instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(e: any, t = {}) {
  const i = new x({
    canvas: e,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });
  let s: any;
  i.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  i.camera.position.set(0, 0, 20);
  i.camera.lookAt(0, 0, 0);
  i.cameraMaxAspect = 1.5;
  i.resize();
  initialize(t);
  const n = new THREE.Raycaster();
  const o = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const r = new THREE.Vector3();
  let c = false;

  e.style.touchAction = 'none';
  e.style.userSelect = 'none';
  e.style.webkitUserSelect = 'none';

  const h = S({
    domElement: e,
    onMove() {
      n.setFromCamera(h.nPosition, i.camera);
      i.camera.getWorldDirection(o.normal);
      n.ray.intersectPlane(o, r);
      s.physics.center.copy(r);
      s.config.controlSphere0 = true;
    },
    onLeave() {
      s.config.controlSphere0 = false;
    }
  });
  function initialize(e: any) {
    if (s) {
      i.clear();
      i.scene.remove(s);
    }
    s = new Z(i.renderer, e);
    i.scene.add(s);
  }
  i.onBeforeRender = e => {
    if (!c) s.update(e);
  };
  i.onAfterResize = e => {
    s.config.maxX = e.wWidth / 2;
    s.config.maxY = e.wHeight / 2;
  };
  return {
    three: i,
    get spheres() {
      return s;
    },
    setCount(e: any) {
      initialize({ ...s.config, count: e });
    },
    togglePause() {
      c = !c;
    },
    dispose() {
      h.dispose();
      i.dispose();
    }
  };
}

const HeartBallpit = ({ className = '', followCursor = true, ...props }: any) => {
  const canvasRef = useRef(null);
  const spheresInstanceRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });

    return () => {
      if (spheresInstanceRef.current) {
        spheresInstanceRef.current.dispose();
      }
    };
  }, []);

  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default HeartBallpit;
