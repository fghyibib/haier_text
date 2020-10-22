$('#logOne').css('display','block');
$('#logTwo').css('display','none');
$('#logThree').css('display','none');
$('.logOne_one').click(function(){
    $('#logOne').css('display','block');
    $('#logTwo').css('display','none');
    $('#logThree').css('display','none');
})
$('.logOne_two').click(function(){
    $('#logTwo').css('display','block');
    $('#logOne').css('display','none');
    $('#logThree').css('display','none');
})
$('.logOne_three').click(function(){
    $('#logThree').css('display','block');
    $('#logOne').css('display','none');
    $('#logTwo').css('display','none');
})


class Login{
    constructor(){
        this.init();
    }
    init(){
        //用户名
        this.uname = this.getEle('.uname');
        //密码
        this.upwd = this.getEle('.upwd');
        //按钮
        this.btn = this.getEle('.btn');
        this.l_one = this.getEle('.l_one');
        this.l_two = this.getEle('.l_two');

        //检测数组
        this.arr = [false,false];
        //添加事件 
        this.addEvent();
    }

    addEvent(){
        let that = this;
        //前端检测
        this.uname.onblur = function(){
            //用户名
            let uname = this.value;
            //正则
            let re = /^1(2|3|4|5|7|8|9)\d{9}$/;
            if(re.test(uname)){
                that.l_one.innerHTML = " ";
                that.arr[0] = true;
            }else{
                that.l_one.innerHTML = "<b>X</b> 用户名不正确哦~";
                that.arr[0] = false;
            }
        }
        this.upwd.onblur = function(){
            //密码
            let upwd = this.value;
            //正则 
            let re = /\w{5,16}/;
            if(re.test(upwd)){
                that.l_two.innerHTML = " ";
                that.arr[1] = true;
            }else{
                that.l_two.innerHTML = "<b>X</b> 密码由字母开头6 ~ 16位哦";
                that.arr[1] = false;
            }
        }
        //后端检测
        this.btn.onclick = function(){
            //用户名
            let uname = that.uname.value;
            //密码
            let upwd = that.upwd.value;
            //是否全部合法
            if(that.arr.indexOf(false) === -1){
                //获取cookie
                let cookie_str = getCookie('users');
                //转为对象
                let cookie_obj = convertStrToObj(cookie_str);
                //对象中检测uname是否存在
                if(uname in cookie_obj){
                    that.l_one.innerHTML = " ";
                    //判断密码是否正确
                    if(upwd === cookie_obj[uname]){
                        that.l_two.innerHTML = " "
                        location.href = '../index.html';
                    }else{
                        that.l_two.innerHTML = "密码错误！"
                    }
                }else{
                    that.l_one.innerHTML = "用户名不存在哦~";
                }
            }else{
                alert('请完善信息');
            }
        }
    }


    getEle(selector){
        return document.querySelector(selector);
    }
}
new Login();



class LoginOne{
    constructor(){
        this.init();
    }
    init(){
        //用户名
        this.uname = this.getEle('.uname_one');
        //按钮
        this.btn = document.querySelector('.btn_one');
        //盒子
        this.l_three = document.querySelector('.l_three');

        //检测数
        this.arr = false;
        //添加事件 
        this.addEvent();
    }
    addEvent(){
        let that = this;
        //前端检测
        this.uname.onblur = function(){
            //用户名
            let uname = this.value;
            //正则
            let re = /^1(2|3|4|5|7|8|9)\d{9}$/;
            if(re.test(uname)){
                that.l_three.innerHTML = " ";
                that.arr = true;
            }else{
                that.l_three.innerHTML = "用户名不正确哦~";
                that.arr = false;
            }
        }
        //后端检测
        this.btn.onclick = function(){
            //用户名
            let uname = that.uname.value;
            //是否全部合法
            if(that.arr !== false){
                //获取cookie
                let cookie_str = getCookie('users');
                //转为对象
                let cookie_obj = convertStrToObj(cookie_str);
                //对象中检测uname是否存在
                if(uname in cookie_obj){
                    that.l_three.innerHTML = " ";
                     location.href = '../index.html';
                }else{
                    that.l_three.innerHTML = "用户名不存在哦~";
                }
            }else{
                alert('请完善信息');
            }
        }
    }

    getEle(selector){
        return document.querySelector(selector);
    }
}
new LoginOne();