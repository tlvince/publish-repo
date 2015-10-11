const parseAuthor = require('parse-author')

export default (flags, pkg) => {
  let author = {}

  function throwAuthorError () {
    const messages = [
      'Could not determine author name or email.',
      'Please pass them as --author-name and --author-email',
      'or set the author property in package.json'
    ].join(' ')
    throw new Error(messages)
  }

  if (flags.authorName) {
    author.name = flags.authorName
  }

  if (flags.authorEmail) {
    author.email = flags.authorEmail
  }

  if (author.name && author.email) {
    return author
  }

  if (!pkg.author) {
    throwAuthorError()
  }

  let parsed = {} // eslint-disable-line
  if (pkg.author) {
    parsed = parseAuthor(pkg.author)
  }

  if (!author.name && author.email && parsed.name) {
    author.name = parsed.name
    return author
  }

  if (!author.email && author.name && parsed.email) {
    author.email = parsed.email
    return author
  }

  throwAuthorError()
}
