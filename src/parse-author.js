const parseAuthor = require('parse-author')

export default (flags, pkg) => {
  let author = {
    name: flags.authorName,
    email: flags.authorEmail
  }

  function throwAuthorError () {
    const messages = [
      'Could not determine author name or email.',
      'Please pass them as --author-name and --author-email',
      'or set the author property in package.json'
    ].join(' ')
    throw new Error(messages)
  }

  function parse (section) {
    if (!section.author) {
      return
    }

    const parsed = parseAuthor(section.author)

    if (!author.name && parsed.name) {
      author.name = parsed.name
    }

    if (!author.email && parsed.email) {
      author.email = parsed.email
    }

    return author
  }

  if (author.name && author.email) {
    return author
  }

  if (pkg.publishRepo) {
    let parsed = parse(pkg.publishRepo)
    if (parsed && parsed.name && parsed.email) {
      return parsed
    }
  }

  let parsed = parse(pkg)
  if (parsed && parsed.name && parsed.email) {
    return parsed
  }

  throwAuthorError()
}
