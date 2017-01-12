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
  canvas.style.width = '100%'
  return container.appendChild(canvas)
}

function display(...objects) {
  objects.forEach(o => {
    const prettyObject = JSON.stringify(o)
    const element = createElementFrom(`<pre><code>${prettyObject}</code></pre>`)
    container.appendChild(element)
  })
}
