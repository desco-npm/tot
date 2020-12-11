const path = require('path')
const fs = require('fs-extra')

const appRootDir = require('app-root-dir').get()
const totRootDir = path.join(appRootDir, 'node_modules', '@desco', 'tot')

async function move () {
    await fs.renameSync(path.join(totRootDir, 'dist'), path.join(appRootDir, 'dist'))
}

move()