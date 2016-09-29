function toggleEditor () {
    
    var e = document.getElementById('editorPad');
    
    if (e.style.display == 'none' || e.style.display === '')
    {
        e.style.display = 'flex';
        var pageCode =  document.getElementById('pageContainer').innerHTML;
        document.getElementById('codeInput').value = pageCode;
        
    }
    else 
    {
        e.style.display = 'none';
    }
    
}


function updatePage () {
   var codeInput =  document.getElementById('codeInput').value;
    document.getElementById('pageContainer').innerHTML = codeInput;
}


function printContent(el){
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}