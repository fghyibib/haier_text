 //获取文本框
 let o_txt = document.querySelector('.ss');
 //获取ul
 let o_ul = document.querySelector('.ss_ul');
//添加键盘弹起事件
o_txt.onkeyup = function(){
    o_ul.innerText = '';
    //动态创建script
    let sc = document.createElement('script');
    sc.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1600939711016_326&callback=fn&k=1&area=c2c&bucketid=8`;
            document.head.appendChild(sc);
}
function fn(data){
    console.log(data.result);
    data.g.forEach((value)=>{
        let li = document.createElement('li');
        li.innerHTML = `<a href="pages/list.html">${value.q}</a>`;
        o_ul.appendChild(li);
    })
}