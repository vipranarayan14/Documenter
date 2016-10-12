// Load Ace Editor
var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;

function loadAceEditor() {
// trigger extensions
ace.require("ace/ext/language_tools");

// set Editor Mode
editor.session.setMode("ace/mode/html");

// set Editor Theme
editor.setTheme("ace/theme/tomorrow");


// enable autocompletion and snippets
editor.setOptions({
    fontSize: "12pt",
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});

loadPageCode();
}

function loadPageCode() {
//Load page code
editor.getSession().setValue(document.getElementById('pageContainer').innerHTML.toString());
}

//Update page code
editor.addEventListener("input", function () {
    document.getElementById('pageContainer').innerHTML = editor.getSession().getValue();
});

function reloadPageCode () {
		loadPageCode();
}

