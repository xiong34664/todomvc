(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	const com = {
		template:"#temp"
	}

	const router = new VueRouter({
		routes: [{
				path: '/',
				component :com
			},
			{
				path: '/login/:id',  //传参  参数  以对象方式储存在  params中
				component: {
					template: "<h2>登录</h2>",
					created() {
						console.log(this.$route.params.id)
					},
				}
			},
			{
				path: '/register',
				component: {
					template: "<h2>注册</h2>"
				}
			}
		]
	})

	var vm = new Vue({
		el:'#app',
		data:{
			todos:[
				{id:1,text:'HTML5',completed:true},
				{id:2,text:'CSS3',completed:true},
				{id:3,text:'JavaScript',completed:true},
				{id:4,text:'Vue',completed:true},
			],
			currentEditingId:null,
			msg:"",
			check:true,
			completed:null
		},
		created(){},
		router,
		methods:{
			out(){
				this.currentEditingId = null
			},
			add(){
				this.todos.push({id:this.todos.length?this.todos[this.todos.length-1].id+1:1,text:this.msg,completed:false})
				this.msg=''
			},
			del(index){
				this.todos.splice(index,1);
			},
			toggleAll(){
					for ( var i = 0; i < this.todos.length; i++) {
							this.todos[i].completed=this.check
					}
			},
			clear(){
				for (var i = 0; i < this.todos.length;) {
					if (this.todos[i].completed) {
						this.todos.splice(i, 1);
						continue;
					}
					i++;
				}
			},
			filter() {
				return this.todos.filter(item => {
					if (item.completed !== this.completed) {
					return item
					}
          		})
			}
		},
		mounted() {},
		directives: {
			focus: {
				// 指令的定义
				inserted: function (el) {
				el.focus()
				}
			},
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		},
		watch: {
			todos:{
				handler(newVal,oldVal){
					for ( var i = 0; i < newVal.length; i++) {
						if(!newVal[i].completed) return this.check=false;
					}
					this.check=true
				},
                deep:true
			},
			'$route.path':function(newVal,oldVal){
				if (newVal === '/active') {
					console.log("欢迎进入登录页面")
				}else if(newVal === '/completed') {
					console.log('欢迎进入注册页面')
				}
			}
		},
		computed: {
			num(){
				var sum=0;
				for ( var i = 0; i < this.todos.length; i++) {
					if(this.todos[i].completed) sum++
				}
				return sum;
			}
		}
	})

})(window);
