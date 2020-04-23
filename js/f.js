function log(l) {
    console.log(l);
}

function equalsIgnoreCase(s1, s2) {
    return new RegExp('^' + s1.toString() + '$', 'i').test(s2.toString());
}

function encode(str) {
    var utf8 = [];
    for(var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if(charcode < 0x80) utf8.push(charcode);
        else if(charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }else if(charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }else {
            i++;
            charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
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