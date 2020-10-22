class Reg{
    constructor(){
        this.init(); //初始化
    }
    init(){
        //实例属性
        //用户名
        this.uname = this.getEle('#uname');
        this.upwd = this.getEle('#upwd');
        this.sjh = this.getEle('#sjh');
        this.re_one = this.getEle('.re_one');
        this.re_two = this.getEle('.re_two');
        //按钮
        this.reg = document.querySelector('.btn');
        //判断内容是否正确
        this.arr = [false,false,false];
        //添加事件
        this.addEvent(); 
    }
    addEvent(){
        let that = this;
        //判断手机号
        this.uname.onblur = function(){
            let uname = this.value;
            let re = /^1(2|3|4|5|7|8|9)\d{9}$/;
            if(re.test(uname)){
                that.re_one.innerHTML = " ";
                that.arr[0] = true;
            }else{
                that.re_one.innerHTML = "<b>X</b> 手机号不正确哦~";
                that.arr[0] = false;
            }
        }
        //密码
        this.upwd.onblur = function(){
            let upwd = this.value;
            let re = /[a-zA-Z]\w{5,16}/;
            if(re.test(upwd)){
                that.re_two.innerHTML = " ";
                that.arr[1] = true;
            }else{
                that.re_two.innerHTML = "<b>X</b> 密码由字母开头6 ~ 16位哦";
                that.arr[1] = false;
            }
        }
        //邀请人
        this.sjh.onblur = function(){
            let sjh = this.value;
            let re = /\w/;
            if(re.test(sjh)){
                that.arr[2] = true;
            }else{
                that.arr[2] = false;
            }
        }
        //注册按钮
        this.reg.onclick = function(){
            if(that.arr.indexOf(false) === -1){
                //获取用户名与密码
                let uname = that.uname.value;
                let upwd = that.upwd.value;
                //后端的用户名密码（cookie)
               //获取cookie
               let cookie_str = getCookie('users');
               //转为对象
               let cookie_obj = convertStrToObj(cookie_str);
               //判断当前的用户是否在cookie中
               if(uname in cookie_obj){
                    that.re_one.innerHTML = "<b>X</b> 该手机号已被使用哦~"; //bbb
                    return;
               }else{
                   cookie_obj[uname] = upwd;   //{"bbb":"111","aaa":"111","ccc":"111","ddd":"111"}
               }
               //存入cookie
               createCookie('users',JSON.stringify(cookie_obj),{expires : 1});
               location.href = 'login.html';
            }else{
                alert('请完善信息！');
            }
        }
    }

    //获取元素的工具方法
    getEle(selector){
        return document.querySelector(selector);
    }
}
new Reg();

window.onload = function(){
    var jhm = document.getElementById('jhm');
    var btn_one = document.getElementById('btn_one');
    var reg = document.querySelector('.re_three');
    function getYanZhengMa(){
        var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
        var str = "";
        for(var i = 0;i < 5; i ++){
            var c = parseInt(Math.random()*arr.length);
            str += arr[c];
        }
        btn_one.value = str;
    }
    getYanZhengMa();
    btn_one.onclick = function(){
        getYanZhengMa();
    };
    jhm.onblur = function(){
        if(jhm.value != btn_one.value){
            reg.innerHTML = "<b>X</b> 验证码不正确哦";
            jhm.value = "";
            getYanZhengMa();
            return;
        }else{
            reg.innerHTML = " ";
        }
    }
};