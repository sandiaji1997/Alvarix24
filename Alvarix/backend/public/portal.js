(function () {
  var swaggerLoaded = false
  var swaggerLoading = false

  document.documentElement.style.scrollBehavior = 'smooth'

  function copyText(id, button) {
    var code = document.getElementById(id)
    if (!code) return

    navigator.clipboard.writeText(code.innerText).then(function () {
      var original = button.innerText
      button.innerText = 'Copied'
      setTimeout(function () { button.innerText = original }, 1400)
    }).catch(function () {
      button.innerText = 'Select text'
    })
  }

  function loadCss(href) {
    return new Promise(function (resolve) {
      if (document.querySelector('link[href="' + href + '"]')) return resolve()

      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = resolve
      link.onerror = resolve
      document.head.appendChild(link)
    })
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) return resolve()

      var script = document.createElement('script')
      script.src = src
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })
  }

  function renderSwagger(spec) {
    if (!window.SwaggerUIBundle || !window.SwaggerUIStandalonePreset) return

    window.ui = window.SwaggerUIBundle({
      spec: spec,
      dom_id: '#swagger-ui',
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
      displayRequestDuration: true,
      deepLinking: true,
      persistAuthorization: true,
      layout: 'StandaloneLayout',
      presets: [
        window.SwaggerUIBundle.presets.apis,
        window.SwaggerUIStandalonePreset
      ],
      plugins: [
        window.SwaggerUIBundle.plugins.DownloadUrl
      ]
    })

    var loader = document.getElementById('swagger-loader')
    if (loader) loader.style.display = 'none'
  }

  function loadAlvarixSwagger() {
    if (swaggerLoaded || swaggerLoading) return

    swaggerLoading = true
    var button = document.getElementById('alvarix-load-swagger')
    if (button) button.innerText = 'Loading...'

    Promise.all([
      fetch('/openapi.json').then(function (response) { return response.json() }),
      loadCss('/docs/swagger-ui.css')
        .then(function () { return loadScript('/docs/swagger-ui-bundle.js') })
        .then(function () { return loadScript('/docs/swagger-ui-standalone-preset.js') })
    ]).then(function (results) {
      swaggerLoaded = true
      renderSwagger(results[0])
    }).catch(function () {
      swaggerLoading = false
      if (button) button.innerText = 'Retry API Reference'
    })
  }

  document.querySelectorAll('[data-copy-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      copyText(button.getAttribute('data-copy-target'), button)
    })
  })

  var button = document.getElementById('alvarix-load-swagger')
  if (button) button.addEventListener('click', loadAlvarixSwagger)

  var reference = document.getElementById('api-reference')
  if ('IntersectionObserver' in window && reference) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting })) {
        observer.disconnect()
        loadAlvarixSwagger()
      }
    }, { rootMargin: '700px 0px' })

    observer.observe(reference)
  }

  window.loadAlvarixSwagger = loadAlvarixSwagger
})()
