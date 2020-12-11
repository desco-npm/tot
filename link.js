const path = require('path')
const fs = require('fs-extra')

const appRootDir = require('app-root-dir').get()
const totRootDir = path.join(appRootDir, 'node_modules', '@desco', 'tot')

async function copy () {
    await fs.copySync(path.join(appRootDir, '.env'), path.join(totRootDir, '.env'))
    await fs.copySync(path.join(appRootDir, 'collors.scss'), path.join(totRootDir, 'src', 'assets', 'scss', 'collors.scss'))
    await fs.copySync(path.join(appRootDir, 'logo.png'), path.join(totRootDir, 'src', 'assets', 'images', 'logo.png'))
    await fs.copySync(path.join(appRootDir, 'ico.png'), path.join(totRootDir, 'src', 'assets', 'images', 'ico.png'))
    await fs.copySync(path.join(appRootDir, 'articles'), path.join(totRootDir, 'src', 'articles'))
}

copy()