# gulp-frontend-template
サイト構築用パッケージ＆タスクランナー

## 環境
### 必須
- Node.js 12.x
- npm 6.x
- Gulp 4.x

パッケージ：
- browser-sync
- connect-ssi
- gulp-plumber

### オプション
**Pug**  
ソースディレクトリ： _dev/pug  
パッケージ：  
- gulp-pug

**Sass**  
ソースディレクトリ： _dev/scss  
パッケージ：  
- gulp-sass
- gulp-postcss
- autoprefixer（設定ファイル: .browserslistrc)

**TypeScript**  
ソースディレクトリ： _dev/ts  
パッケージ：  
- typescript
- gulp-typescript
- @types/jquery

## 構築
バンドルされている package.json を用いてパッケージをインストールしてください。
``` shell
$ npm install
```
もしくは package.json を新規作成後、必要なパッケージをインストールしてください。  
``` shell
$ npm init
...
$ npm install [パッケージ名] --save-dev
...
```

## 始め方
gulpfile.js を任意に編集後、
``` shell
$ npx gulp
```
トランスパイルされた各ソースは、ソースディレクトリ内のツリー構造を保ったまま htdocs 内に書き出されます。
