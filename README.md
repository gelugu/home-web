<p align="center">
  _home
</p>

[![Build and push docker image](https://github.com/gelugu/home-web/actions/workflows/docker-image.yml/badge.svg)](https://github.com/gelugu/home-web/actions/workflows/docker-image.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/gelugu/home-web/badge.svg)](https://snyk.io/test/github/gelugu/home-web)

# Home service (front)

## Commands

```bash
make prepare       # prepare development environment

make dev           # launch app in dev mode
make debug         # launch app in dev mode with debugger (port 9229)

make build         # build app
make start         # launch builded app

make lint          # fix style errors

make docker-build  # build docker image (version from package.json)
make docker-push   # push docker image (version from package.json)
```
