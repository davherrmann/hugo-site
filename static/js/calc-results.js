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

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.width = container.offsetWidth * window.devicePixelRatio
  canvas.height = 300 * window.devicePixelRatio
  canvas.style.width = container.offsetWidth + 'px'
  canvas.style.height = 300 + 'px'
  return container.appendChild(canvas)
}

function display(...objects) {
  objects.forEach(o => {
    const prettyObject = JSON.stringify(o)
    const element = createElementFrom(`<pre><code>${prettyObject}</code></pre>`)
    container.appendChild(element)
  })
}
