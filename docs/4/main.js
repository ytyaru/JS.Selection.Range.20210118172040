window.addEventListener('load', (event) => {
    let SELECTED = null; // contenteditable要素がselectionchangeしたときのRange
    let IME_YOMI = null; // IMEで全字ひらがなのときセットする
    let IS_IME_END = false;
    document.addEventListener('selectionchange', ()=>{
        SELECTED = document.getSelection().getRangeAt(0);
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
            IS_IME_END = false;
        }
        if ('editor' === sel.focusNode.parentElement.id) {

        }
        if (1 === sel.focusNode.nodeType) {
            console.log(`nodeType: Element: name=${sel.focusNode.nodeName}`);
        } else if (3 === sel.focusNode.nodeType) {
            console.log('nodeType: TextNode');
        }
        /*
        */
    }
});
