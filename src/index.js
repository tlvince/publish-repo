import publish from './publish'

const meow = require('meow')

export default () => {
  const opts = {
    pkg: '../package.json'
  }
  const args = meow(opts)
  publish(args)
}
