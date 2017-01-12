let container = null

Array
  .from(document.querySelectorAll('code.language-javascript'))
  .forEach(element => {
    container = createContainer(element.parentNode)
    eval(element.textContent)
  })

function createElementFrom(string) {
  const div = document.createElement('div')
  div.innerHTML = string
  return div.firstChild
}

function createContainer(element) {
  const div = document.createElement('div')
  div.innerHTML = '<div class="result-container"></div>'
  return element.parentNode.insertBefore(div.firstChild, element.nextSibling)
}

function loadScript(url, callback) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onreadystatechange = callback;
  script.onload = callback;

  head.appendChild(script);
}

function startLoop(callback) {
  const renderFrame = () => {
    requestAnimationFrame(renderFrame)
    callback()
  }
  renderFrame()
}

function three(init) {
  const currentContainer = container
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js', () => {
    const width = currentContainer.offsetWidth
    const height = 300

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(width, height);

    currentContainer.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = currentContainer.offsetWidth
      const height = 300

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener( 'resize', onWindowResize, false );

    const render = (updateFn) => {
      startLoop(() => {
        updateFn()
        renderer.render(scene, camera)
      })
    }

    const renderOnce = () => {
      renderer.render(scene, camera)
    }

    init({
      scene,
      renderer,
      camera,
      render,
      renderOnce
    })
  })
}

function createCanvas() {
  const pixelRatio = window.devicePixelRatio
  const width = container.offsetWidth
  const height = 300

  const canvas = document.createElement('canvas')
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  return container.appendChild(canvas)
}

function display(...objects) {
  objects.forEach(o => {
    const prettyObject = JSON.stringify(o)
    const element = createElementFrom(`<pre><code>${prettyObject}</code><i class="fa fa-check-circle-o" aria-hidden="true"></i></pre>`)
    container.appendChild(element)
  })
}
