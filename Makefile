.PHONY: dev build xpi xpi-server clear zip-repo

NAME="CopySelectedLinks"
BIN:="node_modules/.bin"
XPI_DIR=../xpi

watch: clear
	$(BIN)/webpack --mode=development --watch

build: clear
	$(BIN)/webpack --mode=production

xpi: clear build
	mkdir -p ${XPI_DIR}
	zip -r -FS "${XPI_DIR}/${NAME}.xpi" dist/ img/ manifest.json README.org

xpi-server: clear xpi
	ifconfig | grep "inet " | grep --invert-match '127.0.0.1'
	cd ${XPI_DIR}; python3 -m http.server 8888

clear:
	rm -rf dist/*

zip-repo: clear
	zip -r "../${NAME}-upload.zip" . -x .git/\* node_modules/\*

icon:
	convert -background transparent img/icon.svg img/icon.png