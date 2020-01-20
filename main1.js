(function(){
    'use strict'

    var likeComponent=Vue.extend({
        // props:['message'],
        props:{
            message:{
                type:String,
                default:'Like'
            }
        },
        data: function(){
            return{
                count:0
            }
        },
        template: '<button @click="countUp">{{message}} {{count}} </button>',
        methods:{
            countUp:function(){
                this.count++;
                this.$emit('increment');
            }
        }
    })
    var app =new Vue({
        el:'#app', //elmentの略
        components:{
            'like-component' :likeComponent
        },

        data:{
            total:0,

            newItem:'',
            todos:[
                {
                title:'task1',
                isDone: false
            },{
                title:'task2',
                isDone: false
            },{
                title:'task3',
                isDone: true
            }
            ]
            // todos:[]
        },
        watch: {
            // todos: function(){
            //     localStorage.setItem('todos',JSON.stringify(this.todos));
            //     alert('Data saved!');
            // }
            todos:{
                handler: function(){
                    localStorage.setItem('todos',JSON.stringify(this.todos));
                    alert('Data saved!');
                },
                deep:true
            }

        },
        mounted: function(){
            this.todos=JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods:{
            incrementTotal: function(){
                this.total++;
            },
            // addItem:function(e){
            //     e.preventDefault();
            //     this.todos.push(this.newItem)
            //     this.newItem=""
            addItem:function(){
                var item={
                    title:this.newItem,
                    isDone:false
                }
                this.todos.push(item);
                this.newItem="";//入力フォーム値をから文字にする
            },
            deleteItem:function(index){
                if(confirm('are you sure')){
                    this.todos.splice(index,1);
                }
            },
            purge:function(){
                if(!confirm('delete finished?')){
                    return;
                }
                // this.todos= this.todos.filter(function(todo) {
                //     return !todo.isDone;
                //   });
                this.todos=this.remaining;
            }
        },
        computed: {
            remaining: function() {
            //   var items = this.todos.filter(function(todo) {
            //     return !todo.isDone;
            //   });
            //   return items.length;
            return this.todos.filter(function(todo) {
                return !todo.isDone;
            });
            }
        }
    });
})();
