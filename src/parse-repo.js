export default (flags, pkg) => {
  if (flags.repositoryUrl) {
    return flags.repositoryUrl
  }

  if (pkg.publishRepo &&
      pkg.publishRepo.repository &&
      pkg.publishRepo.repository.url
  ) {
    return pkg.publishRepo.repository.url
  }

  const messages = [
    'Could not determine the repository to publish to.',
    'Either pass it as --repository',
    'or set publishRepo.repo.url in package.json'
  ].join(' ')
  throw new Error(messages)
}
