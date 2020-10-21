
//放大镜
$(function(){
	$("ul li").mouseover(function(){
		$(this).find("img").css("border-color","#FF0000").parent().siblings().find("img").css("border-color","#ccc");
		
		//attr设置或返回被选元素的属性值。
		
		$("ol li").find("img").attr("src",$(this).find("img").attr("src"))
		$(".datu").find("img").attr("src",$(this).find("img").attr("src"))				
	});
	//bind 为每个匹配元素的特定事件绑定事件处理函数。
	//width() 取得第一个匹配元素当前计算的宽度值（px）。
	$(".zhezhao").bind({
		mouseover:function(){
			$(".float").css("display","block");
			$(".datu").css("display","block");
		},
		mouseout:function(){
			$(".float").css("display","none");
			$(".datu").css("display","none");
		},
		mousemove:function(e){
			var left=e.offsetX-$(".float").width()/2;
			var top=e.offsetY-$(".float").height()/2;
			
			if(left<0){
				left=0
			}
			if(left>$(".zhezhao").width()-$(".float").width()){
				left=$(".zhezhao").width()-$(".float").width();
				
			}
			if(top<0){
				top=0;	
			}	
			if(top>$(".zhezhao").height()-$(".float").height()){
				top=$(".zhezhao").height()-$(".float").height()	
			}	
			
			$(".float").css("top",top+"px");
			$(".float").css("left",left+"px")
			
			var preX=left/($(".zhezhao").width()-$(".float").width());
			var preY=top/($(".zhezhao").height()-$(".float").height());
			
			$(".datu img").css("left",-preX*($(".datu img").width()-$(".datu").width())+"px");
			$(".datu img").css("top",-preY*($(".datu img").height()-$(".datu").height())+"px");
		}	
	})	
})

// 获取数据
class Product{
    constructor(){
        this.init();
        this.initCartNum();
    }
    //初始化购物车按钮数量
    initCartNum(){
        //创建storage对象
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
        //转对象
        let storage_obj = this.convertStrToObj(storage_str);
        //总数量
        let sum = 0;
        //遍历所有的商品
        for(let key in storage_obj){
            //计算总数量
            sum += storage_obj[key].num;
        }
        //放到购物车按钮中
        this.buy.value = `购物车(${sum})`;
    }

    init(){
        //添加到购物车按钮
        this.add = document.querySelectorAll('.addToCart');
        //购物车按钮
        this.buy = document.querySelector('#buy');
        //添加事件
        this.addEvent();
    }
    addEvent(){
        let that = this;
        this.buy.onclick = function(){
            location.href = './cart.html';
        }
        //遍历添加事件
        for(let i = 0,len = this.add.length;i < len;i ++){
            this.add[i].onclick = function(){
                //商品id
                let good_id = this.parentNode.getAttribute('data-good-id');
                //商品名称
                let good_name = this.previousElementSibling.previousElementSibling.innerText;
                //商品价格
                let good_price = parseInt(this.previousElementSibling.innerText);
                //商品图片
                let good_src = this.parentNode.firstElementChild.src;
                //判断之前购物车是否有当前购买的商品？ 找到当前商品的数量 ++ ： 添加到购物车中
                
                //获取当前本地存储中的数据
                let storage = window.localStorage;
                let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                //将字符串转为对象
                let storage_obj = that.convertStrToObj(storage_str);
                //这个对象是否有当前购买的商品
                if(good_id in storage_obj){
                    //找到数量 + 1
                    storage_obj[good_id].num ++;
                }else{
                    storage_obj[good_id] = {
                        "name" : good_name,
                        "price" : good_price,
                        "src" : good_src,
                        "num" : 1
                    }
                }
                //创建storage
                storage.setItem('carts',JSON.stringify(storage_obj));

                //修改购物车按钮中的 商品数量
                let num = parseInt(/(\d+)/.exec(that.buy.value)[1]);
                that.buy.value = `购物车(${++ num})`;
            }
        }
    }
    convertStrToObj(str){
        if(!str){
            return {};
        }else{
            return JSON.parse(str);
        }
    }
}
new Product();

//吸顶
window.onscroll = function(){
    let top = Math.floor(document.documentElement.scrollTop  || document.body.scrollTop);
    if(top > 777){
        $('.pro').css({
            "position" :"fixed",
            "top" : 0,
        });
    }else{
        $('.pro').css("position","static");
    }
}

$('.intor').css({
    display : "flex"
})
$('.mod').css({
    display : "none"
})
$('.introduce').click(function(){
    $(this).css({
        background: "white",
        color: "blue",
        borderTop: "1px solid blue",
        borderRight: "1px solid rgb(212, 210, 210)"
    })
    $('.model').css({
        background: "rgb(230, 230, 230)",
        color : "black",
        borderRight: "none"
    })
    $('.intor').css({
        display : "flex"
    });
    $('.mod').css({
        display : "none"
    });
})
$('.model').click(function(){
    $(this).css({
        background: "white",
        color: "blue",
        borderTop: "1px solid blue",
        borderRight: "1px solid rgb(212, 210, 210)"
    })
    $('.introduce').css({
        background: "rgb(230, 230, 230)",
        color : "black",
        borderRight: "none"
    })
    $('.mod').css({
        display : "block"
    });
    $('.intor').css({
        display : "none"
    });
})