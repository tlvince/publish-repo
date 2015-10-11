export default (flags, pkg) => {
  if (flags.artefacts) {
    return flags.artefacts.split(',')
  }

  if (pkg.publishRepo && pkg.publishRepo.artefacts) {
    return pkg.publishRepo.artefacts
  }

  const messages = [
    'Could not determine artefacts list.',
    'Either pass them as a comma-seperated list as --artefacts',
    'or set the publishRepo.artefacts property in package.json'
  ].join(' ')

  throw new Error(messages)
}
