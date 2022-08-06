imageName=$(shell cat package.json | jq -r .name | tr -d "@")
version=$(shell cat package.json | jq -r .version)

prepare: copy-env-file install-dependencies

install-dependencies:
	npm install --legacy-peer-deps

copy-env-file:
	cp .env.example .env.local

dev:
	npm run dev
debug:
	npm run debug
build:
	npm run build
start:
	npm start
lint:
	npm run lint && npm run stylelint

docker-build:
	docker build -t ${dockerRegistry}/${imageName}:${version} -f cicd/Dockerfile .
docker-push:
	docker push ${dockerRegistry}/${imageName}:${version}
docker-run:
	docker run -p 80:3000 ${dockerRegistry}/${imageName}:${version}
docker-test: docker-build docker-run

docker-deploy: docker-build docker-push
