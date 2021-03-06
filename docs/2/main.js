window.addEventListener('load', (event) => {
    let SELECTED = null; // contenteditable要素がselectionchangeしたときのRange
    let IME_YOMI = null; // IMEで全字ひらがなのときセットする
    let IS_IME_END = false;
    document.addEventListener('selectionchange', ()=>{
        /*
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        console.log('sel.focusNode', sel.focusNode);
        console.log('sel.focusNode.parentElement', sel.focusNode.parentElement);
        if (1 === sel.focusNode.nodeType) {
            console.log(`nodeType: Element: name=${sel.focusNode.nodeName}`);
        } else if (3 === sel.focusNode.nodeType) {
            console.log('nodeType: TextNode');
        }
        */
    });

    document.addEventListener('compositionstart', (event)=>{
        console.log('compositionstart', event);
    });
    document.addEventListener('compositionupdate', (event)=>{
        console.log('compositionupdate', event);
        const j = new Japanese();
        if (j.isHiragana(event.data)) { IME_YOMI = event.data; }
    });
    document.addEventListener('compositionend', (event)=>{
        console.log('compositionend', event);
        event.stopImmediatePropagation();  //cancel next event//
        event.preventDefault();
    }, {passive: false});
    document.querySelector('#html_editor').addEventListener('input', (event)=>{
        console.log('input', event);
        const sel = document.getSelection();
        const range = sel.getRangeAt(0);
        console.log('sel.focusNode', sel.focusNode);
        console.log('sel.focusNode.parentElement', sel.focusNode.parentElement);
        console.log('sel.focusNode.parentElement.nodeName', sel.focusNode.parentElement.nodeName);
        if ('ruby' !== sel.focusNode.parentElement.nodeName || 'rt' !== sel.focusNode.parentElement.nodeName || 'rb' !== sel.focusNode.parentElement.nodeName) {
            range.setStart(sel.focusNode, sel.focusOffset - event.data.length);
//            range.setStart(sel.focusNode, sel.focusOffset - (event.data) ? event.data.length : 0);
            range.setEnd(sel.focusNode, sel.focusOffset);
            range.deleteContents();
        }
        if ('html_editor' === sel.focusNode.parentElement.id) {

        }
        if (1 === sel.focusNode.nodeType) {
            console.log(`nodeType: Element: name=${sel.focusNode.nodeName}`);
        } else if (3 === sel.focusNode.nodeType) {
            console.log('nodeType: TextNode');
        }
    });
});
