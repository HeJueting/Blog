(()=>{
    let wrap = document.getElementById("wrap");
    
    for(let i=0; i<wrap.children.length; i++){
        // 由于图片的高度一样，宽度便决定着他们水平方向伸缩的比例
        let img = wrap.children[i]
        wrap.children[i].style["flex-grow"] = img.width / img.height;
    }
})();