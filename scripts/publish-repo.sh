#!/usr/bin/env bash
set -euo pipefail

info() { echo "$0: $1"; }
warn() { info "$1" && exit; }
error() { info "$1" && exit 1; }

TRAVIS="${TRAVIS:-}"
TRAVIS_TAG="${TRAVIS_TAG:-}"
TRAVIS_PULL_REQUEST="${TRAVIS_PULL_REQUEST:-}"
CI_USER_TOKEN="${CI_USER_TOKEN:-}"

[[ "$TRAVIS" ]] || error "Please run this script in TravisCI"
[[ "$TRAVIS_TAG" ]] || warn "Only deploying tagged builds"
[[ "$TRAVIS_PULL_REQUEST" == "false" ]] || warn "Not deploying pull requests"
[[ "$CI_USER_TOKEN" ]] || error "Please set CI_USER_TOKEN"

publish_repo="$1"
user_name="$2"
user_email="$3"
artefacts="${@:4}"

tmp="$(mktemp -d "${TMPDIR:-/tmp}"/publish-repo.XXXX)"

echo -e "machine github.com\n  login $CI_USER_TOKEN\n" >> ~/.netrc
git clone "$publish_repo" "$tmp"
mv $artefacts "$tmp"
cd "$tmp"
git add .
git config user.name "$user_name"
git config user.email "$user_email"
git commit --all --message "$TRAVIS_TAG"
git tag "$TRAVIS_TAG"
git push --tags origin master
cd -
rm -rf "$tmp"
