class Cart {
    constructor() {
        this.init();
    }
    init() {
        //获取blank
        let blank = document.querySelector('.blank');
        //获取购物车列表
        let cart_list = document.querySelector('.cartList');
        //获取本地存储中的信息
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts');

        //转对象
        let storage_obj = convertStrToObj(storage_str);
        //遍历对象
        for (let key in storage_obj) {
            let good = storage_obj[key];
            //创建ul
            let ul = document.createElement('ul');
            ul.className = 'goodInfo';
            ul.setAttribute('data-good-id',key);
            ul.innerHTML = `
                <li><img src="${good.src}" /></li>
				<li>${good.name}</li>
				<li>${good.price}</li>
				<li class="num">
					<a href="javascript:;" class="minus">-</a>
					<input type="text" name="" id="" value="${good.num}" />
					<a href="javascript:;" class="plus">+</a>
				</li>
				<li class="total">${good.price * good.num}</li>
				<li><a href="javascript:;" class="del">删除</a></li>
            `
            cart_list.appendChild(ul);
        }

        //获取所有的-
        let minus = document.querySelectorAll('.minus');
        //添加事件
        for (let i = 0, len = minus.length; i < len; i++) {
            minus[i].onclick = function () {
                //修改storage中的数量
                //获取商品id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                let storage = window.localStorage;
                let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                let storage_obj = convertStrToObj(storage_str);
                if (storage_obj[id].num > 1) {
                    storage_obj[id].num--;
                }
                storage.setItem('carts', JSON.stringify(storage_obj));
                //修改页面中的数量
                this.nextElementSibling.value = storage_obj[id].num;
                //合计
                this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
            }
            //获取所有的+
            let plus = document.querySelectorAll('.plus');
            //添加事件
            for (let i = 0, len = plus.length; i < len; i++) {
                plus[i].onclick = function () {
                    //修改storage中的数量
                    //获取商品id
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                    let storage = window.localStorage;
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    let storage_obj = convertStrToObj(storage_str);

                    storage_obj[id].num++;

                    storage.setItem('carts', JSON.stringify(storage_obj));
                    //修改页面中的数量
                    this.previousElementSibling.value = storage_obj[id].num;
                    //合计
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }
            }

            //获取所有的数量框
            let inp = document.querySelectorAll('.num input');
            //添加事件
            for (let i = 0, len = inp.length; i < len; i++) {
                inp[i].onblur = function () {
                    //修改storage中的数量
                    //获取商品id
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                    let storage = window.localStorage;
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    let storage_obj = convertStrToObj(storage_str);
                    let str = parseInt(this.value);
                    if (!isNaN(str) && str > 0) {
                        storage_obj[id].num = str;
                    } else {
                        storage_obj[id].num = 1;
                    }

                    storage.setItem('carts', JSON.stringify(storage_obj));
                    //修改页面中的数量
                    this.value = storage_obj[id].num;
                    //合计
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }
            }


            //获取所有的删除
            let del = document.querySelectorAll('.del');
            //添加事件
            for (let i = 0, len = del.length; i < len; i++) {
                del[i].onclick = function () {
                    //修改storage中的数量
                    //获取商品id
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                    let storage = window.localStorage;
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    let storage_obj = convertStrToObj(storage_str);
                    //删除对象中的一个属性
                    delete storage_obj[id];
                    storage.setItem('carts', JSON.stringify(storage_obj));
                    this.parentNode.parentNode.remove();
                }
            }
        }
    }
}
new Cart();
function convertStrToObj(str) {
    if (!str) {
        return {};
    } else {
        return JSON.parse(str);
    }
}