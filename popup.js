var list;

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        list = request.source;
    }
});

window.onload = onWindowLoad;

function onWindowLoad() {


    var appControl = document.getElementById('app-control');
    var listSection = document.getElementById('list');
    var listElem = listSection.getElementsByTagName('ul')[0];

    var extractButton = document.getElementById('checkPage');
    var resetButton = document.getElementById('reset');

    extractButton.addEventListener('click', function() {

        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(null, {
                file: "3party/jquery-3.1.0.slim.min.js"
            }, function(){

                chrome.tabs.executeScript(null, {
                    file: "content.js"
                }, function() {
                    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
                    if (chrome.runtime.lastError) {
                        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
                    } else {
                        return printList();
                    }
                });
            });
        });

    }, false);

    resetButton.addEventListener('click', function(){

        listElem.innerHTML = '';
        listSection.style.display = 'none';
        appControl.style.display = 'block';
    });


    function printList() {

        var culumn = parseInt(document.getElementById('columnNum').value);

        appControl.style.display = 'none';
        listSection.style.display = 'block';

        //document.write('<html><head></head><body>');
        list[culumn].forEach(function(value, index){

            var p = document.createElement('li'); p.innerText = value;
            listElem.appendChild(p);
        });
        //document.write('</body></html>');
    }
}
