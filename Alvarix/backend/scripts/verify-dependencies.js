const fs = require('fs')
const path = require('path')
const Module = require('module')

const root = path.resolve(__dirname, '..')
const packageJson = require(path.join(root, 'package.json'))
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
}
const builtins = new Set(Module.builtinModules.concat(Module.builtinModules.map((name) => `node:${name}`)))
const missing = new Set()
const localIssues = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.tools'].includes(entry.name)) continue

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(fullPath)
    } else if (entry.name.endsWith('.js')) {
      inspectFile(fullPath)
    }
  }
}

function exactExists(filePath) {
  const dir = path.dirname(filePath)
  const base = path.basename(filePath)

  return fs.existsSync(dir) && fs.readdirSync(dir).includes(base)
}

function resolveLocal(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier)
  const candidates = [
    base,
    `${base}.js`,
    `${base}.json`,
    path.join(base, 'index.js')
  ]

  return candidates.some(exactExists)
}

function packageName(specifier) {
  if (specifier.startsWith('@')) {
    return specifier.split('/').slice(0, 2).join('/')
  }

  return specifier.split('/')[0]
}

function inspectFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const requirePattern = /require\(['"]([^'"]+)['"]\)/g
  let match

  while ((match = requirePattern.exec(source))) {
    const specifier = match[1]

    if (specifier.startsWith('.')) {
      if (!resolveLocal(filePath, specifier)) {
        localIssues.push(`${path.relative(root, filePath)} -> ${specifier}`)
      }
      continue
    }

    if (builtins.has(specifier)) continue

    const name = packageName(specifier)

    if (!dependencies[name]) {
      missing.add(name)
    }
  }
}

walk(root)

if (localIssues.length || missing.size) {
  if (localIssues.length) {
    console.error('Broken local imports:')
    for (const issue of localIssues) console.error(`- ${issue}`)
  }

  if (missing.size) {
    console.error('Missing package dependencies:')
    for (const name of [...missing].sort()) console.error(`- ${name}`)
  }

  process.exit(1)
}

console.log('Dependency verification passed')
