function r() {
    if(document.getElementById("secondary") != null)
        return;

    const f = document.getElementById("parOC");
    let fl = document.createElement("div");
    fl.setAttribute("class", "alert alert-secondary alert-notext");
    fl.setAttribute("id", "secondary");
    f.insertBefore(fl, f[0]);

    fl = document.createElement("div");
    fl.setAttribute("class", "alert alert-success alert-notext");
    fl.setAttribute("id", "success");
    f.insertBefore(fl, f[0]);

    fl = document.createElement("div");
    fl.setAttribute("class", "alert alert-danger alert-notext");
    fl.setAttribute("id", "danger");
    f.insertBefore(fl, f[0]);

    fl = document.createElement("div");
    fl.setAttribute("class", "alert alert-warning alert-notext");
    fl.setAttribute("id", "warning");
    f.insertBefore(fl, f[0]);

}

function sh(id, t, hdeBtn) {
    if(hdeBtn) {
        document.getElementById("c").style.display = "none";
    }
    document.getElementById(id).innerHTML = t;
    document.getElementById(id).style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
}

function hi(btn) {
    if(btn === 1) {
        document.getElementById("secondary").style.display = "none";
    }else if(btn === 2) {
        document.getElementById("success").style.display = "none";
    }else if(btn === 3) {
        document.getElementById("danger").style.display = "none";
    }else if(btn === 4) {
        document.getElementById("warning").style.display = "none";
    }else {
        document.getElementById("secondary").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("danger").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }
}

function c() {
    r();

    const text = document.getElementById("codeBody").innerText;
    const s = document.getElementById("s").value;
    const decry = d(s);
    const p = StringToA(decry);

    let l = 0;
    let isEmpty = true;
    for(let i = 0; i < p.length; i++) {
        let w = p[i];
        if(document.getElementById(i.toString()).value != null && document.getElementById(i.toString()).value !== "" && document.getElementById(i.toString()).value !== " ") {
            if(equalsIgnoreCase(w, document.getElementById(i.toString()).value)) {
                l++;
            }
            isEmpty = false;
        }
    }

    let per = parseFloat((100.00 / parseFloat(p.length)) * parseFloat(l)).toFixed(2);

    hi(0);

    let poi = "Punkten";
    let po = "Punkt";
    let pc = "Punkte";
    let poss = 'möglichen <strong>' + p.length + '</strong> ';
    let lo = poi;
    let mo = pc;
    if(p.length <= 1) {
        lo = po;
        poss = 'einem möglichen ';
    }
    if(l === 1) {
        lo, mo = po;
    }

    const te = '<strong>Ihr Ergebnis:</strong> Sie haben von ' + poss + lo + ', <strong>' + l + '</strong> ' + mo + ' erreicht.\n' +
        'Dies entspricht einem Prozentsatz von <strong>' + per + '%</strong>.';

    if(isEmpty) {
        sh("secondary", '<strong>Achtung!</strong> Sie haben kein Feld ausgefüllt.', false);
        hi(2);
        hi(3);
        hi(4);
        return;
    }
    if(per <= 50.00) {
        sh("danger", te, true);
        hi(1);
        hi(2);
        hi(4);
    }else if(per <= 75.00) {
        sh("warning", te, true);
        hi(1);
        hi(2);
        hi(3);
    }else if(per <= 100.00) {
        sh("success", te, true);
        hi(1);
        hi(3);
        hi(4);
    }

    for(let i = 0; i < p.length; i++) {
        if(document.getElementById(i.toString()) != null) {
            document.getElementById(i.toString()).readOnly = true;
        }
    }
}

$(document).ready(function() {
    let wor = '<p class="text-center mar-b-9">Lösungsvorschläge</p><div class="form-row justify-content-center">';
    let wo_f = '</div><br>';


    const h = document.getElementById("s").value;
    let w = StringToA(d(h));

    if((!(w.length === 0) && !(w[0] === ""))) {
        w = shuffle(w);
        for(let i = 0; i < w.length; i++) {
            const wo = w[i];
            if(document.getElementById(i.toString()) != null && typeof (document.getElementById(i.toString())) != "undefined") {
                wor += '<div class="col-1"> <input type="text" class="form-control" placeholder="' + wo + '" readonly size="20"> </div>';
            }
        }
        document.getElementById("words").style.display = "block";
        document.getElementById("words").innerHTML = wor + wo_f;
    }
});