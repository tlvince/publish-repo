export default (flags, pkg) => {
  if (flags.branch) {
    return flags.branch
  }

  if (pkg.publishRepo && pkg.publishRepo.branch) {
    return pkg.publishRepo.branch
  }

  return 'master'
}
