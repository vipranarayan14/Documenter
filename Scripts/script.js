window.onload = retrieveChanges;

window.addEventListener('keydown', function(e) {
    if(e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        saveChanges();
        reloadPageCode();
    }
});

function toggleEditor() {

    var e = document.getElementById('editorPad');

    if (e.style.display === 'none' || e.style.display === '') {
        e.style.display = 'flex';
        loadPageCode();
        //If input is a textarea instead of Ace Editor
        //document.getElementById('codeInput').value = document.getElementById('pageContainer').innerHTML;

    }
    else {
        e.style.display = 'none';
    }

}

function saveChanges() {
    
    var loS = localStorage.pages;
    var loSSpace = (JSON.stringify(loS).length / 1024).toFixed(2);
    
    if (loSSpace > 20) {
        alert('Storage Space exceeded!'+ '\n' +
              'Alloted Space : 20 K' + '\n' +
              'Demanding Space:' + loSSpace);
    } else {
    localStorage.pages = document.querySelector('#pageContainer').innerHTML.toString();
        console.log(loSSpace + 'K used');

    }
}

function retrieveChanges () {
    document.querySelector('#pageContainer').innerHTML = "";
    document.querySelector('#pageContainer').innerHTML = localStorage.pages;
}

function printContent(el) {

    //var win = window
    //.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no");
    //win.document.body.innerHTML = document.getElementById(el).innerHTML;
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
    document.getElementById('editorPad').style.display = "none";
}

//If input is a textarea instead of Ace Editor
//function updatePage() {
//    var codeInput =  document.getElementById('codeInput').value;
//    document.getElementById('pageContainer').innerHTML = codeInput;
//}

