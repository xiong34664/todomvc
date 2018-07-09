(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

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
		created(){
			const data = localStorage.todos?JSON.parse(localStorage.todos):[]
			if(data.length !== 0){
				this.todos = data
			}
		},
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
					localStorage.todos = JSON.stringify(newVal)
					for ( var i = 0; i < newVal.length; i++) {
						if(!newVal[i].completed) return this.check=false;
					}
					this.check=true
				},
                deep:true
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
