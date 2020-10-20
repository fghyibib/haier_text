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
        this.jhm = this.getEle('#jhm');
        //按钮
        this.reg = document.querySelector('.btn');
        //判断内容是否正确
        this.arr = [false,false,false,false];
        //添加事件
        this.addEvent(); 
    }
    addEvent(){
        let that = this;
        //判断手机号
        this.uname.onblur = function(){
            let uname = this.value;
            let re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if(re.test(uname)){
                that.arr[0] = true;
            }else{
                alert('用户名不合法!');
                that.arr[0] = false;
            }
        }
        //密码
        this.upwd.onblur = function(){
            let upwd = this.value;
            let re = /^[a-zA-Z]\w{5,16}$/;
            if(re.test(upwd)){
                that.arr[1] = true;
            }else{
                alert('密码不合法！');
                that.arr[1] = false;
            }
        }
        //激活码
        this.jhm.onblur = function(){
            let jhm = this.value;
            let re = /\w/;
            if(re.test(jhm)){
                that.arr[2] = true;
            }else{
                alert('激活码不合法！');
                that.arr[2] = false;
            }
        }
        //邀请人
        this.sjh.onblur = function(){
            let sjh = this.value;
            let re = /\w/;
            if(re.test(sjh)){
                that.arr[3] = true;
            }else{
                alert('激活码不合法！');
                that.arr[3] = false;
            }
        }
        //注册按钮
        this.reg.onclick = function(){
            if(that.arr.indexOf(false) === -1){
                //获取用户名与密码
                let uname = that.uname.value;
                let upwd = that.upwd.value;
                //后端的用户名密码（cookie)
                /*
                    key : users
                    value : {"name":"upwd"}
                */
               //获取cookie
               let cookie_str = getCookie('users');
               //转为对象
               let cookie_obj = convertStrToObj(cookie_str);
               //判断当前的用户是否在cookie中
               if(uname in cookie_obj){
                    alert('用户名已存在！'); //bbb
                    return;
               }else{
                   cookie_obj[uname] = upwd;   //{"bbb":"111","aaa":"111","ccc":"111","ddd":"111"}
               }
               //存入cookie
               createCookie('users',JSON.stringify(cookie_obj),{expires : 1});
               alert('注册成功！');
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