function makeCurly(text) {

  // TODO: don't change within <code> or <pre> tags
  // TODO: shouldn't replace hard-coded curly quotes
  // TODO: "<b>this</b>" doesn't work because it's a different text node
  // TODO: still can't handle words abbreviated at the start e.g. ’nix.
 
  // replace " and ' for feet and inches with primes
  // text = text.replace(/(\W\d)\u0027(\W)/g,'$1\u2032$2');
  // text = text.replace(/(\W\d)\u201D(\W)/g,'$1\u2033$2');

  // replace beginning " quotes
  text = text.replace(/(^|\s|>)\u0022(\S)/g,'$1\u201C$2');

  // replace ending " quotes
  text = text.replace(/(\S)\u0022(\W|$)/g,'$1\u201D$2');
  // text = text.replace(/(\S)\u0022(\s|\.|:|;|'|\u0022|<|$)/g,'$1”$2');

  // replace ' in (incorrect) year abbreviations
  text = text.replace(/(\d\d)\u0027([sS])/g,'$1\u2019$2');

  // replace 'n', with or without spaces surrounding it
  text = text.replace(/(\w ?)\u0027n\u0027( ?\w)/g,'$1\u2019n\u2019$2');

  // replace ' in contracted words like that's
  text = text.replace(/(\w+)\u0027(\w+)/g,'$1\u2019$2');
  // replace double contractions (same again)
  text = text.replace(/(\w+)\u0027(\w+)/g,'$1\u2019$2');

  // replace 'words' in single quotes
  text = text.replace(/(\W|^)\u0027(\w+)(\.)?\u0027(\W|$)/g,'$1\u2018$2$3\u2019$4');

  // replace beginning ' quotes
  text = text.replace(/(\s|^|\u201c|\u0027|>)\u0027(\S)/g,'$1\u2018$2');

  // replace ending ' quotes
  text = text.replace(/(\S)\u0027(\W|$)/g,'$1\u2019$2');

  // replace '64 but not '64 million' or '1600'
  text = text.replace(/[\u2018|\u0027](\d\d)([sS]?)([\W|$])(?!hundred|thousand|million|billion|trillion)/g,'\u2019$1$2$3');

  // replace ' at the start of abbreviated words like 'cause
  text = text.replace(/[\u0027|\u2018](tis|twas|cause|coz|em|im|er|ave|ole?)(\W)/gi, '\u2019$1$2');

  // let's not forget Hawai‘i
  text = text.replace(/Hawai[\u0027\u2019]i/g,'Hawai\u2018i');
  
  // show existing dumb quotes
  // text = text.replace(/([\u0027|\u0022])/g,'!_!!!$1!!!_!');

  // replace hyphens with em dashes
  text = text.replace(/ -+ /g,' \u2014 ');

  // replace hyphens with en dashes for ranges and years
  text = text.replace(/(\d+)-(\d+)/g,'$1\u2013$2');

  return text;

}

function curlifyAll(node) {

    // if current node is a text node, make it curly
    if (node.nodeType == 3) {
        node.data = makeCurly(node.data);
        return;
    }

    // otherwise cycle through its children recursively check those
    for (var m = node.firstChild; m != null; m = m.nextSibling) {
      curlifyAll(m);
    }
}

// make text curly after everything else is loaded
// (since it's not so important)
window.onload = function(){

  curlifyAll(document.body);

}

