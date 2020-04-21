var Delta = Quill.import('delta');
var Parchment = Quill.import("parchment");
var editor = new Quill('#editor', {
    modules: {toolbar: '#toolbar'},
    theme: 'snow',
    placeholder: 'Fügen Sie hier Ihren Lückentext ein...'
});

let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
    scope: Parchment.Scope.INLINE
});
Quill.register(CustomClass, true);
var customButton = document.querySelector('#is-word');

function insert(html) {
    var sel, range, node;
    if(window.getSelection) {
        sel = window.getSelection();
        if(sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.collapse(false);

            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    }else if(document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

function applyChanges(range, t, style, toRemove) {
    range.deleteContents();
    insert('<span id="' + t + '" style="' + style + ';">' + t + '</span>');
    if(toRemove) {
        document.getElementById(t).removeAttribute("id");
    }
}

function getCurrentSelection() {
    const selection = editor.getSelection();
    const selectedContent = editor.getContents(selection.index, selection.length);
    const tempContainer = document.createElement('div')
    const tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    return tempContainer.querySelector('.ql-editor').innerHTML;
}

customButton.addEventListener('click', function() {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const t = sel.toString();

    if(getCurrentSelection().includes("background-color") && getCurrentSelection().includes("background-color: transparent") == false) {
        applyChanges(range, t, 'background-color: transparent', true);
    }else {
        applyChanges(range, t, 'background-color: rgb(252, 182, 3)', false);
    }
});

editor.on('editor-change', function(eventName, ...args) {
    if(getCurrentSelection().includes("background-color") && getCurrentSelection().includes("background-color: transparent") == false) {
        customButton.classList.add('ql-active');
    }else {
        customButton.classList.remove('ql-active');
    }
});

function createInteractiveSite() {
    const html = editor.root.innerHTML;
    if(html == "<p><br></p>") {
        document.getElementsByClassName("alert-notext")[0].innerHTML = "<strong>Achtung!</strong> Sie haben keinen Text eingefügt.";
        document.getElementsByClassName("alert-notext")[0].style.display = "block";
        return;
    }
    document.getElementsByClassName("alert-notext")[0].style.display = "none";
    //window.location.href = "http://dementisimus.github.io/interactiveSites/o.html?text=" + html + "&name=123";
    window.location.href = "o.html?text=" + html + "&name=123";
}