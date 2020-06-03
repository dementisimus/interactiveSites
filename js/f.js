function log(l) {
    console.log(l);
}

function equalsIgnoreCase(s1, s2) {
    return new RegExp('^' + s1.toString() + '$', 'i').test(s2.toString());
}

let fi = false;

function crInp(sp, i, hidden) {
    let cla = "mar-5";
    if (fi == false) {
        fi = true;
        cla = "mar-20";
    }
    let hi = "";
    if (hidden && i === "pass-conf") {
        hi = "pass-con hidden";
    }
    if (hidden && i === "pass-dat") {
        hi = "pass-da hidden";
    }
    let hea = "";
    if (i === "tit") {
        hea = '<div class="input-group-prepend">' +
            '          <span class="input-group-text ' + cla + '">' + "Überschrift" + '</span>' +
            '     </div>' +
            '     <input type="text" class="form-control ' + cla + '" id="' + "hea" + '" aria-describedby="basic-addon3">';
    }
    document.write('    ' +
        '<div class="input-group mb-3 ' + hi + '">' +
        '     <div class="input-group-prepend">' +
        '          <span class="input-group-text ' + cla + '">' + sp + '</span>' +
        '     </div>' +
        '     <input type="text" class="form-control ' + cla + '" id="' + i + '" aria-describedby="basic-addon3">' + hea +
        '</div>');
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function aToString(a) {
    let str = "";
    for (let i = 0; i < a.length; i++) {
        if (i === a.length - 1) {
            str += a[i];
        } else {
            str += a[i] + "||--|--||";
        }
    }
    return str;
}

function StringToA(str) {
    return str.split('||--|--||');
}

function gP(len) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < len; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function cpy(value) {
    let tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}