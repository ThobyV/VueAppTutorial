/* -----Vue JS Github App Tutorial: Part 1 
www.moonerstack.info
-----*/

/*-----------------
	Components 
-----------------*/

/* Userlist template to bind our data to a custom list template in html */
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

/* User detail template to bind data to the usrdetails template in html */
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

/* Vue router to map url request to thier respective templates */
var router = new VueRouter ({
	mode: 'hash',
	base: window.location.href,
	routes: [
		{ path: '/', component: userlist },
        { name: 'item', path: '/:id', component: userdetail } 
	]
	});

/* Our app class then requests for data from our api url and parses it to the templates */
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
			response.data = JSON.parse(response.data);
			this.items = response.data.items; 
			console.log(this.items);
	},
		response => {
		   console.log('error');
	});
	}
}).$mount('#app')

