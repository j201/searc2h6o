call lessc styles.less styles.css
call browserify js/main.js | uglifyjs -c -m > bundle.js
