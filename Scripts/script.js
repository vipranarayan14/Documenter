window.onload = initiateApp;

window.addEventListener('keydown', function(e) {
    if(e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        saveChanges();
        reloadPageCode();
    }
    
    if(e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        printPages();
        reloadPageCode();
    }
    
    if(e.ctrlKey && e.keyCode === 13) {
        e.preventDefault();
        insertNewPage();
    }
});

function initiateApp() {
		if (localStorage.pages) {
			retrieveChanges();
		} else {
			createNewDocument();
		}
		setContentEditable(true);
}

function setContentEditable(bool) {
		var pageContents = document.querySelectorAll('.content');
		for (var i=0; i < pageContents.length; i++) {
		
				pageContents[i].setAttribute('contenteditable',bool);
		}
}

function toggleEditor() {

    var e = document.getElementById('editorPad');

    if (e.style.display === 'none' || e.style.display === '') {
        e.style.display = 'flex';
        loadAceEditor();
    }
    else {
        e.style.display = 'none';
    }

}

function saveChanges() {

    var pagesItem = localStorage.getItem('pages');
    var pagesItemSpaceConsumed = (JSON.stringify(pagesItem).length / 1024).toFixed(2);
    
    if (pagesItemSpaceConsumed > 20) {
        alert('Storage Space exceeded!'+ '\n' +
              'Alloted Space : 20 K' + '\n' +
              'Demanding Space:' + pagesItemSpaceConsumed);
    } else {
    		localStorage.setItem('pages', document.querySelector('#pageContainer').innerHTML.toString());
        console.log(pagesItemSpaceConsumed + 'K used');
    }   
}
function createNewDocument() {

	document.querySelector('#pageContainer').innerHTML = "";
	insertNewPage();
	setContentEditable(true);
}

function insertNewPage() {

		var newPage = "<div class='page'>" +
									"<div class='pageBorder'>" +
									"<div class='content'>" +
									"</div></div></div>";
		document.querySelector('#pageContainer').insertAdjacentHTML('beforeEnd', newPage);
		setContentEditable(true);
}
function retrieveChanges () {

    document.querySelector('#pageContainer').innerHTML = "";
    document.querySelector('#pageContainer').innerHTML = localStorage.getItem('pages');
}

function emptyLocalStorage() {

		localStorage.removeItem('pages');
}

function printPages() {

    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById('pageContainer').innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
    document.getElementById('editorPad').style.display = "none";
}

function saveDocAsHTML() {	
		
		var pages = document.getElementById('pageContainer').innerHTML;

		var html = '<html>' + 
							 '<head>' + 
							 '<link rel="stylesheet" type="text/css" href="Styles/index.css">' +
							 '<style media="screen">body {background-color: rgb(204, 204, 204);}</style>' +
							 '</head>'+
							 '<body>'+ pages +'</body></html>';		
		
		download(html, "document.html", "text/html");
		
		

    
}
function getPageStyles() {
var openFile = function(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          var node = document.getElementById('output');
          node.innerText = text;
          console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(input.files[0]);
      };
}

function exc(a,b) {

		document.execCommand(a,false,b);
}

function putHTML() {

    var selectedTxt = window.getSelection().toString().trim();
    if(selectedTxt) {
        exc('insertHTML', selectedTxt);
    }
}

function setLang(langCode) {

    var selectedTxt = window.getSelection();
    var rawTxt = selectedTxt.toString().trim();
    
    if(selectedTxt && langCode !== 'def'|| '') {
    
    		var langTxt = '<span lang="' + langCode + '" >' + rawTxt + '</span>';
    		    	
        exc('insertHTML', langTxt); 
    }
    else if(langCode === 'def') {
    var parentEle = selectedTxt.focusNode.parentElement;
    var isTag = selectedTxt.focusNode.parentElement.tagName == 'SPAN';
    var hasAttrb = selectedTxt.focusNode.parentElement.hasAttribute('LANG');
    
    	if (isTag && hasAttrb) {
    			parentEle.outerHTML = rawTxt;
    	 }
    }
}
function resetVal(select) {
	select.selectedIndex = 0;
}
function formatTxt(txtFormat) {

		if (txtFormat) {
		exc('formatBlock','<' + txtFormat + '>');
		}
}

function zoomPage(zoomVal) {
		document.querySelector('#pageContainer').style.zoom = zoomVal + "%";
}

