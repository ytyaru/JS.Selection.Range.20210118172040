window.addEventListener('load', (event) => {
    let SELECTED = null; // contenteditable要素がselectionchangeしたときのRange
    let IME_YOMI = null; // IMEで全字ひらがなのときセットする
    let IS_IME_END = false;
    document.addEventListener('selectionchange', ()=>{
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        if (IS_IME_END) {
            console.log('sel.focusNode', sel.focusNode);
            console.log('sel.focusNode.parentNode', sel.focusNode.parentNode);
            console.log('sel.focusNode.parentNode.nextSibling', sel.focusNode.parentNode.nextSibling);
            console.log('sel.focusNode.parentNode.parentNode', sel.focusNode.parentNode.parentNode);
            console.log('sel.focusNode.parentNode.parentNode.nextSibling', sel.focusNode.parentNode.parentNode.nextSibling);
            range.selectNode(sel.focusNode.parentNode.parentNode.nextSibling);
            console.log('after sel.focusNode', sel.focusNode);
            sel.collapseToStart(sel.focusNode, 0);
            IS_IME_END = false;
        }
        SELECTED = range;
        console.log('selectionchange', document.getSelection().focusNode);
    });
    document.addEventListener('compositionstart', (event)=>{
        console.log('compositionstart', event);
        if (Japanese.isHiragana(event.data)) { IME_YOMI = event.data; }
        else { IME_YOMI = null; }
    });
    document.addEventListener('compositionupdate', (event)=>{
        console.log('compositionupdate', event);
        if (Japanese.isHiragana(event.data)) { IME_YOMI = event.data; }
    });
    document.addEventListener('compositionend', (event)=>{
        console.log('compositionend', event);
        if (Japanese.isHiragana(event.data)) { IME_YOMI = event.data; }
        IS_IME_END = true;
        if (event.data === IME_YOMI) { IS_IME_END = false; }
        appendRuby(event);
        removeImeString(event);
//        event.stopImmediatePropagation();  //cancel next event//
//        event.preventDefault();
//    }, {passive: false});
    });
    document.querySelector('#editor').addEventListener('input', (event)=>{
        console.log('input', event);
    });
    function appendRuby(event) {
        if (event.data !== IME_YOMI) {
            SELECTED.insertNode(Ruby.toDom(event.data, IME_YOMI));
        }
    }
    function removeImeString(event) {
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        console.log('sel.focusNode', sel.focusNode);
        console.log('sel.focusNode.parentElement', sel.focusNode.parentElement);
        console.log('sel.focusNode.parentElement.nodeName', sel.focusNode.parentElement.nodeName);
        if (IS_IME_END && 'ruby' !== sel.focusNode.parentElement.nodeName && 'rt' !== sel.focusNode.parentElement.nodeName && 'rb' !== sel.focusNode.parentElement.nodeName) {
            range.setStart(sel.focusNode, sel.focusOffset - event.data.length);
            range.setEnd(sel.focusNode, sel.focusOffset);
            range.deleteContents();
        }
        if ('editor' === sel.focusNode.parentElement.id) {

        }
        if (1 === sel.focusNode.nodeType) {
            console.log(`nodeType: Element: name=${sel.focusNode.nodeName}`);
        } else if (3 === sel.focusNode.nodeType) {
            console.log('nodeType: TextNode');
        }
    }
});
