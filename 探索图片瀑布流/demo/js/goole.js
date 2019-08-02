(()=>{

    resetImgs();

    var timer;
    window.addEventListener("resize",()=>{
        if(timer){clearTimeout(timer)}
        timer = setTimeout(()=>{
            resetImgs();
        },200);
    })

    function resetImgs(){
        let wrap = document.getElementById("wrap");
        let index = 0;
        let images = [];
        for(let i=0; i<wrap.children.length; i++){
            images.push(wrap.children[i]);
        }

        while(index < wrap.children.length){
            let {height, number} = getNumberAndHeight(images);
            for(let i=0; i<number; i++){
                images[i].style.height = height + "px";
                images[i].style.width  = Math.floor(images[i].naturalWidth * height / images[i].naturalHeight) + "px";
                images[i].style.marginRight = "20px";
                if(i === number-1){
                    images[i].style.marginRight = "0px";
                }
            }
            images = images.slice(number);
            index  += number;
        }

    }

    // 得到该行图片的数量和高度
    function getNumberAndHeight(images){
        let heightRange = [0, 220];
        let number = 0;
        let height = 0;
        let arr = [];
        for(let i=0; i<images.length; i++){
            arr.push(images[i]);
            height = calculateHeight(arr);
            if(height >= heightRange[0] && height <= heightRange[1]){
                number = arr.length;
                break;
            }
        }
        
        // 最后一行做特殊处理
        if(number === 0){
            return {
                number:images.length,
                height:200
            }
        }

        return {
            number:number,
            height:height
        }
    }

    // 计算图片的高度
    function calculateHeight(images){
        let blankWidth = document.body.clientWidth - 20*(1 + images.length) - 17;
        let height = 0;
        let ratios = 0;
        for(let i=0; i<images.length; i++){
            ratios += images[i].naturalWidth / images[i].naturalHeight;
        }
        height = Math.floor(blankWidth / ratios);
        return height;
    }

})();