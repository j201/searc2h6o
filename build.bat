call lessc styles.less styles.css
call browserify main.js | uglifyjs -c > bundle.js
