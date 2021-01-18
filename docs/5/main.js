window.addEventListener('load', (event) => {
    let SELECTED = null; // contenteditable要素がselectionchangeしたときのRange
    let IME_YOMI = null; // IMEで全字ひらがなのときセットする
    let IS_IME_END = false;
    document.addEventListener('selectionchange', ()=>{
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        SELECTED = range;
        console.log('selectionchange', document.getSelection().focusNode);
        if (IS_IME_END) {
            console.log('sel.focusNode', sel.focusNode);
            console.log('sel.focusNode.parentNode', sel.focusNode.parentNode);
            console.log('sel.focusNode.parentNode.nextSibling', sel.focusNode.parentNode.nextSibling);
            console.log('sel.focusNode.parentNode.parentNode', sel.focusNode.parentNode.parentNode);
            console.log('sel.focusNode.parentNode.parentNode.nextSibling', sel.focusNode.parentNode.parentNode.nextSibling);
//            sel.selectNode(sel.focusNode.parentNode.nextSibling);
//            sel.selectNode(sel.focusNode.parentNode.parentNode.nextSibling);

            range.selectNode(sel.focusNode.parentNode.parentNode.nextSibling);
            console.log('after sel.focusNode', sel.focusNode);
//            sel.collapse(sel.focusNode, 0);
            sel.collapseToStart(sel.focusNode, 0);
//            sel.collapseToEnd(sel.focusNode, 0);
//            sel.collapse(sel.focusNode, 2);
//            sel.collapse(sel.focusNode.parentNode.parentNode.nextSibling, 1);
//            range.setStart(sel.focusNode, 1);
//            range.setEnd(sel.focusNode, 1);
//            range.setStart(sel.focusNode.parentNode.parentNode.nextSibling, 0);
//            range.setEnd(sel.focusNode.parentNode.parentNode.nextSibling, 0);

            IS_IME_END = false;
        }
    });
    document.addEventListener('compositionstart', (event)=>{
        console.log('compositionstart', event);
    });
    document.addEventListener('compositionupdate', (event)=>{
        console.log('compositionupdate', event);
        if (Japanese.isHiragana(event.data)) { IME_YOMI = event.data; }
    });
    document.addEventListener('compositionend', (event)=>{
        console.log('compositionend', event);
        if (Japanese.isHiragana(event.data)) { IME_YOMI = event.data; }
        IS_IME_END = true;
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
        SELECTED.insertNode(Ruby.toDom(event.data, IME_YOMI));
    }
    function removeImeString(event) {
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        console.log('sel.focusNode', sel.focusNode);
        console.log('sel.focusNode.parentElement', sel.focusNode.parentElement);
        console.log('sel.focusNode.parentElement.nodeName', sel.focusNode.parentElement.nodeName);
        if (IS_IME_END && 'ruby' !== sel.focusNode.parentElement.nodeName || 'rt' !== sel.focusNode.parentElement.nodeName || 'rb' !== sel.focusNode.parentElement.nodeName) {
            range.setStart(sel.focusNode, sel.focusOffset - event.data.length);
            range.setEnd(sel.focusNode, sel.focusOffset);
            range.deleteContents();
            // キャレット位置をもうひとつ先にしたい。しかし<rt>要素の次を指定する方法がわからない。
//            range.setStart(sel.focusNode.parentNode, sel.focusOffset);

            // 現在の選択要素：<rt>
            // <ruby>の次の要素: sel.focusNode.parentNode.nextSibling
//            console.log('sel.focusNode', sel.focusNode);
//            console.log('sel.focusNode.parentNode', sel.focusNode.parentNode);
//            console.log('sel.focusNode.parentNode.nextSibling', sel.focusNode.parentNode.nextSibling);
//            sel.selectNode(sel.focusNode.parentNode.nextSibling);
//            range.selectNode(sel.focusNode.parentNode.nextSibling);
//            sel.getRangeAt(0).setStart(sel.focusNode, 0);

//            sel.selectNode(sel.focusNode.parentNode.nextSibling);
//            sel.getRangeAt(0).setStart(sel.focusNode, 0);


//            range.setStart(sel.focusNode, sel.focusOffset - event.data.length);
//            IS_IME_END = false;
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
