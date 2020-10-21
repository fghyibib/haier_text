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
            let uname = this.uname;
            //正则
            let re = /^1(2|3|4|5|7|8|9)\d{9}$/;
            if(re.test(uname)){
                that.arr[0] = true;
            }else{
                alert('用户名不合法！');
                that.arr[0] = false;
            }
        }
        this.upwd.onblur = function(){
            //密码
            let upwd = this.value;
            //正则 
            let re = /\w{5,16}/;
            if(re.test(upwd)){
                that.arr[1] = true;
            }else{
                alert('密码不合法');
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
                    //判断密码是否正确
                    if(upwd === cookie_obj[uname]){
                        alert('登录成功');
                        location.href = 'product.html';
                    }else{
                        alert('密码错误');
                    }
                }else{
                    alert('用户名不存在!');
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
        this.btn = document.querySelectorAll('.btn_one');
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
            let uname = this.uname;
            //正则
            let re = /^1(2|3|4|5|7|8|9)\d{9}$/;
            if(re.test(uname)){
                that.arr = true;
            }else{
                alert('用户名不合法！');
                this.arr = false;
            }
        }
        //后端检测
        this.btn.onclick = function(){
            //用户名
            let uname = that.uname.value;
            //是否全部合法
            if(that.arr.indexOf(false) === -1){
                //获取cookie
                let cookie_str = getCookie('users');
                //转为对象
                let cookie_obj = convertStrToObj(cookie_str);
                //对象中检测uname是否存在
                if(uname in cookie_obj){
                    //判断密码是否正确
                    if(upwd === cookie_obj[uname]){
                        alert('登录成功');
                        location.href = '../index.html';
                    }else{
                        alert('用户名不存在!');
                    }
                }else{
                    alert('请完善信息');
                }
            }
        }
    }

    getEle(selector){
        return document.querySelector(selector);
    }
}
new LoginOne();