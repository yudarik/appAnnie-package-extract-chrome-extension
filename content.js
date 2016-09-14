// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function parseDocument(document_root) {
    var list = [];

    var tableRowLength = $('.dashboard-table table tbody tr:first td').length;

    for (var i=1; i <= tableRowLength; i++) {

        list[i] = [];

        (document_root).querySelectorAll('tr td.app-with-publisher-rank-iap:nth-child('+i+') a.app-icon-link').forEach(function(element){

            list[i].push(
                $(element)[0].href
                    .replace('https://www.appannie.com/apps/google-play/app/','')
                    .replace('/details/','')
            )
        });
    }
    return list;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: parseDocument(document)
});