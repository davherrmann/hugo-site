+++
date = "2017-01-10T15:34:32+01:00"
title = "Working with gradients in three.js"
draft = false

+++

Testing some embedded code:

```javascript
const a = {x: 1}
const b = Object.assign(a, {y: 2})
display(a, b)
```

```javascript
const canvas = createCanvas()
var ctx = canvas.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(canvas.width,canvas.height);
ctx.stroke();
```

```javascript
createThreeScene((scene, renderer, camera) => {
  const geometry = new THREE.CubeGeometry(200, 200, 200);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  loop(() => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);    
  })
})
```
