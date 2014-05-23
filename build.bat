call lessc styles.less searc2h6o-public/styles.css
call browserify js/main.js | uglifyjs -c -m > searc2h6o-public/bundle.js
