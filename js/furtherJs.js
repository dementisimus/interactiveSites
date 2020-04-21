function downloadFile(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    window.location.href = "index.html?operation=success";
}

function init() {
    const url = new URL(window.location.href);

    if(url.searchParams.get("text") == null) {
        const text = document.getElementById("codeBody").innerText;
        const s = d(document.getElementById("s").value);

        /*
        const decry = d(s);
        const preArray = decry.split(",");
        for(let i = 0; i < preArray.length; i++) {
            console.log(preArray[i]);
        }
        */
        return;
    }

    let text = url.searchParams.get("text");
    const name = url.searchParams.get("name");

    document.getElementById('codeBody').innerHTML = text + '<input id="s" type="hidden" value=""/>' + document.getElementById('codeFooter').innerHTML;

    const words = [];
    let t = document.getElementsByTagName("*");
    for(let i = 0; i < t.length; i++) {
        const tag = t[i];
        const style = tag.getAttribute("style");
        if(style != null && style == "background-color: rgb(252, 182, 3);") {
            if(words.includes(t[i].innerHTML) == false) {
                words.push(t[i].innerHTML);
            }
        }
    }

    document.getElementById('s').value = e(words);

    for(let i = 0; i < words.length; i++) {
        let id = words[i];
        if(document.getElementById(id) != null) {
            document.getElementById(id).remove(); //hier dann noch Kästchen anstelle des Entfernen hinfügen
            //SEITE: file:///C:/Users/Stefan/WebstormProjects/interactiveSites/o.html?text=%3Cp%3EHallo,%20ich%20bin%20%3Cspan%20id=%22Stefan%22%20style=%22background-color:%20rgb(252,%20182,%203);%22%3EStefan%3C/span%3E!%20Wer%20bist%20%3Cspan%20id=%22du%22%20style=%22background-color:%20rgb(252,%20182,%203);%22%3Edu%3C/span%3E?%3C/p%3E&name=123
        }
    }

    //downloadFile("data:text/html," + document.documentElement.innerHTML + "", name + ".html");
}

init();