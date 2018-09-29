# Gallery-X

### What is it?

Gallery-X is a third-party pixiv gallery with some extra features.

### Online demo

[See here](http://43.239.159.171:8000/)

### Dev

- Copy `example_config/*` to `var/*`
- Edit `static.distDir` and `static.cdnPath` with your locals
- `npm i` && `npm run dev-server` && `npm run dev-static`

### Build docker image

- Provide your Qiniu config in `static.config.json`
- Edit `static.cdnPath` to your own CDN domain
- `sh build_docker_image.sh`

### Start service from the docker image on remote server(VPS)

- Pull code
- Copy var config as above said
- Edit `distDir` to `'/app/var/static'`
- `sh start_service.sh`
