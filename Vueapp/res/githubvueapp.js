/* -----Vue JS Github App Tutorial: Part 1 
www.moonerstack.info
-----*/

/*-----------------
	Components 
-----------------*/


var userlist = {
	name: 'userlist',
	template: '#userlist-template',
	props: ['items','loading'],
	data () {
		return { 
			items: [] 
		}
	}
};

var userdetail = {
	name: 'userdetail',
	template: '#userdetail-template',
	props: ['items'],
	data: function() {
		var route = this.$route;
		return {
			item: this.items.filter(function(item){
				return item.id == route.params.id;
			})[0]
		};
	}
};

var router = new VueRouter ({
	mode: 'hash',
	base: window.location.href,
	routes: [
		{ path: '/', component: userlist },
        { name: 'item', path: '/:id', component: userdetail } 
	]
	});

var app = new Vue ({
	router: router,
	data () {
		return { 
			loading: false,
			items: [] 
		}
	},
	created: function(){
		this.loading = true;
		this.$http.get("https://api.github.com/search/users?q=location:lagos+language:java&per_page=10")
		.then(response => {
			this.loading = false;
			this.items = response.data.items; 
			console.log(this.items);
	},
		response => {
		   console.log('error');
	});
	}
}).$mount('#app')

