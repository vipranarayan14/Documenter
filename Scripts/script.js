function toggleEditor() {
    
    var e = document.getElementById('editorPad');
    
    if (e.style.display === 'none' || e.style.display === '') {
        e.style.display = 'flex';
        document.getElementById('codeInput').value = document.getElementById('pageContainer').innerHTML;
        
    } else {
        e.style.display = 'none';
    }
    
}

//If input is a textarea instead of Ace Editor
//function updatePage() {
//    var codeInput =  document.getElementById('codeInput').value;
//    document.getElementById('pageContainer').innerHTML = codeInput;
//}


function printContent(el) {
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
    document.getElementById('editorPad').style.display = "none";
}