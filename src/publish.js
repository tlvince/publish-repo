import { exec } from 'child_process'
import { readFileSync } from 'fs'

import parseRepo from './parse-repo'
import parseAuthor from './parse-author'
import parseArtefacts from './parse-artefacts'

const pkg = JSON.parse(readFileSync('./package.json'))

export default (args) => {
  const repo = parseRepo(args.flags, pkg)
  const author = parseAuthor(args.flags, pkg)
  const artefacts = parseArtefacts(args.flags, pkg).join(' ')

  const script = `${__dirname}/../scripts/publish-repo.sh`
  const cmd = `${script} "${repo}" "${author.name}" "${author.email}" ${artefacts}`
  exec(cmd, (err, stdout, stderr) => {
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.error(stderr)
    }
    if (err) {
      throw err
    }
  })
}
