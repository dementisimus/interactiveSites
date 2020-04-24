function log(l) {
    console.log(l);
}

function equalsIgnoreCase(s1, s2) {
    return new RegExp('^' + s1.toString() + '$', 'i').test(s2.toString());
}

let fi = false;

function crInp(sp, i) {
    let cla = "mar-5";
    if(fi == false) {
        fi = true;
        cla = "mar-20";
    }
    document.write('    ' +
        '<div class="input-group mb-3">' +
        '     <div class="input-group-prepend">' +
        '          <span class="input-group-text ' + cla + '">' + sp + '</span>' +
        '     </div>' +
        '     <input type="text" class="form-control ' + cla + '" id="' + i + '" aria-describedby="basic-addon3">' +
        '</div>');
}

function shuffle(a) {
    let j, x, i;
    for(i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function aToString(a) {
    let str = "";
    for(let i = 0; i < a.length; i++) {
        if(i === a.length - 1) {
            str += a[i];
        }else {
            str += a[i] + "||--|--||";
        }
    }
    return str;
}

function StringToA(str) {
    return str.split('||--|--||');
}