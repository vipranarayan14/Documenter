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
});

function initiateApp() {
		if (localStorage.pages) {
			retrieveChanges();
		} else {
			createNewDocument();
		}
		setContentEditable();
}

function setContentEditable() {
		var pageContents = document.querySelectorAll('.content');
		for (var i=0; i < pageContents.length; i++) {
		
				pageContents[i].setAttribute('contenteditable',true);
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
	setContentEditable();
}

function insertNewPage() {

		var newPage = "<div class='page'>" +
									"<div class='pageBorder'>" +
									"<div class='content'>" +
									"</div></div></div>";
		document.querySelector('#pageContainer').insertAdjacentHTML('beforeEnd', newPage);
		setContentEditable();
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

function exc(a,b) {

		document.execCommand(a,false,b);
}

function putHTML() {

    var selectedTxt = window.getSelection().toString().trim();
    if(selectedTxt) {
        exc('insertHTML', selectedTxt);
    }
}
function formatTxt(txtFormat) {

		if (txtFormat) {
		exc('formatBlock','<' + txtFormat + '>');
		}
}
