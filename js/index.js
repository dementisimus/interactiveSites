var ColorClass = Quill.import('attributors/class/color');
var SizeStyle = Quill.import('attributors/style/size');
var Delta = Quill.import('delta');
var Parchment = Quill.import("parchment");

var editor = new Quill('#editor', {
    modules: {toolbar: '#toolbar'},
    theme: 'snow',
    placeholder: 'Tragen Sie hier Ihren Lückentext ein...'
});

Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);

editor.clipboard.addMatcher(Node.ELEMENT_NODE, function (node, delta) {
    var plaintext = node.innerText;
    var Delta = Quill.import('delta');
    return new Delta().insert(plaintext);
});

let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
    scope: Parchment.Scope.INLINE
});
Quill.register(CustomClass, true);
var customButton = document.querySelector('#is-word');

function insert(html) {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.collapse(false);

            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

function getIns(id, style) {
    return '<span id="XYZOWKA-' + id + '" style="' + style + ';">' + id + '</span>';
}

function applyChanges(range, id, style, toRemove) {
    if (toRemove === false) {
        range.deleteContents();
        let ins = getIns(id, style);
        if (id[id.length - 1] === " ") {
            id = id.substring(0, id.length - 1);
            ins = getIns(id, style) + " ";
        }
        insert(ins);
        return;
    }
    range = editor.getSelection();
    if (range.length === 0) {
        let leaf, offset = editor.getLeaf(range.index);
        editor.removeFormat(range.index - offset, range.index + leaf.domNode.length);
    } else {
        editor.removeFormat(range.index, range.length);
    }
}

function getCurrentSelection() {
    const selection = editor.getSelection();
    let selectedContent = "";
    if (selection != null) {
        selectedContent = editor.getContents(selection.index, selection.length);
    }
    const tempContainer = document.createElement('div')
    const tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    return tempContainer.querySelector('.ql-editor').innerHTML;
}


customButton.addEventListener('click', function () {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const t = sel.toString();
    const currentId = window.getSelection().anchorNode.parentNode.id;

    if (getCurrentSelection() != null) {
        if (getCurrentSelection().includes("background-color") && getCurrentSelection().includes("background-color: transparent") === false) {
            applyChanges(range, currentId, 'background-color: transparent', true);
        } else {
            applyChanges(range, t, 'background-color: rgb(252, 182, 3)', false);
        }
    }
});

editor.on('editor-change', function (eventName, ...args) {
    if (getCurrentSelection() != null) {
        if (getCurrentSelection().includes("background-color") && getCurrentSelection().includes("background-color: transparent") === false) {
            customButton.classList.add('ql-active');
        } else {
            customButton.classList.remove('ql-active');
        }
    }
});

function w(si, tit) {
    const wo = [];
    let t = si.getElementsByTagName("*");
    for (let i = 0; i < t.length; i++) {
        const tag = t[i];
        if (tag.hasAttribute("id") && tag.getAttribute("id").includes("XYZOWKA-")) {
            const id = tag.getAttribute("id");
            let nTag = id.replace("XYZOWKA-", "");
            if (wo.includes(nTag) === false) {
                wo.push(nTag);
            }
        }
    }
    let ex = false;
    for (let i = 0; i < wo.length; i++) {
        const id = "XYZOWKA-" + wo[i];
        if (si.getElementById(id) != null) {
            si.getElementById(id).outerHTML = '<input class="form-control col-xs-5 col-lg-1" id="' + i + '" type="text" placeholder=" " style="display: inline;">';
            ex = true;
        }
    }
    si.getElementById("s").value = e(aToString(wo));
    si.getElementById("tit").innerText = tit;

    const pa = document.getElementById("pass");
    let pass = pa.value;
    if (pass == null || pass === "" || pass === " ")
        pass = gP(10);
    cpy(pass);
    si.getElementById("pa").value = e(pass);

    return [si, ex];
}

function cr() {
    let text = editor.root.innerHTML;
    if (text === "<p><br></p>") {
        document.getElementById("success").style.display = "none";
        document.getElementById("danger").innerHTML = "<strong>Achtung!</strong> Sie haben keinen Text eingefügt.";
        document.getElementById("danger").style.display = "block";
        return;
    }
    document.getElementById("danger").style.display = "none";

    text += '<div style="text-align:center;" id="parOC"><button type="button" class="btn btn-primary" id="c" data-toggle="button" aria-pressed="false" autocomplete="off" onclick="c()"> Eingabe überprüfen </button></div>';

    let t = document.getElementById("tit").value;
    let he = document.getElementById("hea").value;
    if (t == null || t === "" || t === " ")
        t = "Lückentext";
    if (he == null || he === "" || he === " ")
        he = "Lückentext";

    const pass = document.getElementById("pass").value;
    if (pass != null && pass !== "" && pass !== " ") {
        const conf = document.getElementById("pass-conf");
        if (conf != null && typeof conf != "undefined") {
            if (!(pass === conf.value)) {
                document.getElementById("danger").innerHTML = '<strong>Achtung!</strong> Die Passwörter, welche Sie eingegeben haben, stimmen nicht überein!';
                document.getElementById("danger").style.display = "block";
                return;
            }
            document.getElementById("danger").style.display = "none";
        }
    }

    $.get("p/h.html", function (h) {
        $.get("p/b_h.html", function (b_h) {
            h += b_h + '<div class="text-center hidden" id="words"></div>' + "<div id='teHo'>" + text + '<input id="s" type="hidden" value=""/> <input id="pa" type="hidden" value=""/>' + "</div>";
            $.get("p/b_b.html", function (b_b) {
                h += b_b;
                const doc = new DOMParser().parseFromString(h, "text/html");
                const va = w(doc, he);
                if (va[1] === false) {
                    doc.getElementById("c").style.display = "none";
                }
                h = new XMLSerializer().serializeToString(va[0]);

                download(h, t + ".html", "text/html; charset=UTF-8");

                document.getElementById("success").innerHTML = 'Sie haben <strong>erfolgreich</strong> ein Dokument <strong>erstellt</strong>. Sie finden dieses nun unter Ihren <strong>Downloads</strong>.';
                document.getElementById("success").style.display = "block";

                document.getElementById("warning").innerHTML = '<strong>Achtung!</strong> Das Passwort, welches für das Bearbeiten dieser Datei benötigt wird, ist soeben in Ihre Zwischenablage gespeichert worden.';
                document.getElementById("warning").style.display = "block";

                window.scrollTo(0, document.body.scrollHeight);

                let element = document.getElementsByClassName("ql-editor");
                element[0].innerHTML = "";
                document.getElementById("tit").value = "";
                document.getElementById("hea").value = "";
                document.getElementById("pass").value = "";
                document.getElementsByClassName("pass-con")[0].setAttribute("class", "input-group mb-3 pass-con hidden");
                document.getElementById("success-uplo").style.display = "none";
            }, 'html');
        }, 'html');
    }, 'html');
}

$(window).on("load", function () {
    $(".loader-wrapper").fadeOut(1000);
    setTimeout(
        function () {
            document.getElementById("hi1").setAttribute("style", "display: block");
        }, 150);
    setTimeout(
        function () {
            document.getElementById("hi2").setAttribute("style", "display: block");
        }, 250);
    setTimeout(
        function () {
            document.getElementById("hi3").setAttribute("style", "display: block");
        }, 350);
});

function upl() {
    document.getElementById("success-uplo").style.display = "none";
    document.getElementById("fiIn").style.display = "block";
    document.getElementById("or").setAttribute("class", "text-center mar-10");
    const f = document.getElementById("fi").files;
    document.getElementById("cFl").innerText = f[0].name;
    document.getElementsByClassName("pass-da")[0].setAttribute("class", "input-group mb-3 pass-da");
}

function rea() {
    const f = document.getElementById("fi").files;
    const na = f[0].name.split(".html")[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
        const doc = new DOMParser().parseFromString(this.result, "text/html");
        const hea = doc.getElementById("tit").innerText;

        const pas = document.getElementById("pass-dat").value;
        const p = doc.getElementById("pa");
        if (p != null && typeof p != "undefined" && p.value != null && p.value !== "") {
            if (pas == null || typeof pas == "undefined" || pas === "" || pas === " " || pas !== d(p.value)) {
                document.getElementById("danger-ipass").innerHTML = '<strong>Achtung!</strong> Sie haben ein <strong>falsches Passwort</strong> eingegeben.';
                document.getElementById("danger-ipass").style.display = "block";
                return;
            }
        }
        document.getElementsByClassName("pass-da")[0].setAttribute("class", "input-group mb-3 pass-da hidden");
        document.getElementById("danger-ipass").style.display = "none";
        document.getElementById("or").innerText = "";

        doc.getElementById("parOC").remove();

        const h = doc.getElementById("s").value;
        const w = StringToA(d(h));

        for (let i = 0; i < w.length; i++) {
            const wo = w[i];
            if (doc.getElementById(i.toString()) != null && typeof (doc.getElementById(i.toString())) != "undefined") {
                doc.getElementById(i.toString()).outerHTML = '<span id="XYZOWKA-' + wo + '" style="background-color: rgb(252, 182, 3);">' + wo + '</span>';
            }
        }

        doc.getElementById("s").remove();
        editor.root.innerHTML = doc.getElementById("teHo").innerHTML;
        document.getElementById("fi").value = "";
        document.getElementById("cFl").innerText = "Datei auswählen";
        document.getElementById("fiIn").style.display = "none";
        document.getElementById("or").setAttribute("class", "text-center");
        document.getElementById("success-uplo").innerHTML = "Sie können nun Ihre Datei bearbeiten.";
        document.getElementById("success-uplo").style.display = "block";
        document.getElementById("danger").style.display = "none";
        document.getElementById("warning").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("tit").value = na;
        document.getElementById("hea").value = hea;
        document.getElementById("pass").value = d(doc.getElementById("pa").value);
        document.getElementById("pass-conf").value = d(doc.getElementById("pa").value);
        document.getElementsByClassName("pass-con")[0].setAttribute("class", "input-group mb-3 pass-con");
        document.getElementById("pass-dat").value = "";
    });
    reader.readAsText(f[0], "ISO-8859-1");
}

$(document).ready(function () {
    $('input[type="file"]').on("change", function () {
        upl();
    });
    $("#pass").on("input", function () {
        const va = document.getElementById("pass").value;
        if (va !== null && va !== "" && va !== " ") {
            if (document.getElementsByClassName("pass-con") != null && typeof document.getElementsByClassName("pass-con") != "undefined" && document.getElementsByClassName("pass-con")[0] != null && typeof document.getElementsByClassName("pass-con")[0] != "undefined") {
                document.getElementsByClassName("pass-con")[0].setAttribute("class", "input-group mb-3 pass-con");
            }
        } else {
            document.getElementsByClassName("pass-con")[0].setAttribute("class", "input-group mb-3 pass-con hidden");
        }
    });
});
