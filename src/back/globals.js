global.Express = require('./Express')
global.config = {}
global.rootDir = global.pathJoin( require('app-root-dir').get(), 'node_modules', '@desco', 'tot')
global.backRootDir = global.pathJoin(global.rootDir, 'src', 'back')
global.pathSep = require('path').sep