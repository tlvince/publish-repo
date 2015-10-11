# publish-repo

[![Build Status][travis-image]][travis-url]

> Publish distribution files to a separate repository

A CLI tool that pushes `dist` to a separate repository. Intended to be used as
part of [semantic-release][] during a tagged build on TravisCI.

Example `package.json`:

```json
{
  "name": "my-app",
  "scripts": {
    "build": "make",
    "publish-repo": "npm run build && publish-repo",
    "semantic-release": "semantic-release pre && npm publish && semantic-release post"
  },
  "author": "Tom Vincent <npm@tlvince.com>",
  "publishRepo": {
    "repository": {
      "url": "https://github.com/me/my-app"
    },
    "artefacts": [
      "README.md",
      "bower.json",
      "dist/*"
    ]
  }
}
```

Example `.travis.yml`:

```yml
language: node_js
node_js:
  - '0.12'
after_success:
  - npm run semantic-release
  - npm run publish-repo
```

[travis-image]: https://img.shields.io/travis/tlvince/publish-repo.svg
[travis-url]: https://travis-ci.org/tlvince/publish-repo
[semantic-release]: https://github.com/semantic-release/semantic-release

## Usage

At minimum, publish-repo expects:

* `dist` to exist before it is ran
* To be ran within TravisCI
* The environment variable `CI_USER_TOKEN` to be set

Then add a `publishRepo` block to `package.json`:

```json
"publishRepo": {
  "repository": {
    "url": "https://github.com/me/my-app"
  },
  "artefacts": [
    "README.md",
    "bower.json",
    "dist/*"
  ],
  "author": "Tom Vincent <npm@tlvince.com>"
}
```

Each property can be overridden with a command line flag. See
[options](#options).

### With semantic-release

Want semantic-release to build and push dist? Here's one approach:

1. Initialise semantic-release with your repo as normal
2. Generate a new GitHub access token (only repo/public_repo scope is required)
3. Run `travis env set CI_USER_TOKEN [token]`
4. Add a npm build script that's suitable for your project
5. Add `publish-repo` as a dev dependency
6. Add it as an npm script
8. Call `npm run publish-repo` in Travis's `after_script` block

That's it!

See [tlvince/tlvince-semantic-release-publish-repo][1] as a working example.

[1]: https://github.com/tlvince/tlvince-semantic-release-publish-repo

**Note**: some versions of semantic-release-cli add a `branches.except` pattern
to `.travis.yml`. This must be removed as publish-repo is ran during the tagged
build.

**Pro tip**: create a machine/bot account on GitHub (generate a access token
for this account) and add it as a collaborator (with push access) to your repo.
Don't forget to pass `--author-name` and `--author-email`.

## Options

### `--repository-url`

The repository to push artefacts to. Must already exist.

### `--artefacts`

A comma-separated list of files to commit/publish. Defaults to
`publishRepo.artefacts`.

### `--author-name`

The commit's author name (`git config user.name`). Defaults to
`publishRepo.author`. Falls back to `.package.json` `author`.

### `--author-email`

The commit's author email (`git config user.email`). Defaults to
`publishRepo.author`. Falls back to `.package.json` `author`.

## See also

* [publish-dist](https://www.npmjs.com/package/publish-dist)
* [publish-latest](https://www.npmjs.com/package/publish-latest)

## Author

© 2015 Tom Vincent <https://tlvince.com/contact>

## License

Released under the [MIT License](http://tlvince.mit-license.org).
