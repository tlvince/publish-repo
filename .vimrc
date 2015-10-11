setlocal wildignore+=dist
let $PATH = './node_modules/.bin:' . $PATH
let g:syntastic_javascript_checkers = ['standard']
