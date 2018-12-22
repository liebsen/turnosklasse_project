// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import VueResource from 'vue-resource';
import axios from 'axios';
import App from './App'
import router from './router'
import helper from '@/components/Helper';
import moment from 'moment';
import vueSlider from 'vue-slider-component'
//import Datepicker from 'vuejs-datepicker';
import VueDatepickerLocal from 'vue-datepicker-local'
import Passengerpicker from '@/components/Passengerpicker';
import vSelect from 'vue-select'
import { snackbar } from '@/components/Snackbar';
// Require the main Sass manifest file
require('../static/sass/main.scss');

Vue.config.productionTip = false;
//Vue.use(VueResource);
Vue.component('vue-datepicker-local', VueDatepickerLocal);
Vue.component('v-select', vSelect)
Vue.component('passengerpicker', Passengerpicker);
Vue.component('vue-slider', vueSlider);

/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App},
	created: function () {
		
	},
	mounted: function(){
		this.ready = true;
	},
	methods : {
	    searchDeparture : function(search, loading){
	      loading(true);
	      this.searchAirport(loading, search, this, 'departures');
	    },
	    searchArrival : function(search, loading){
	      loading(true);
	      this.searchAirport(loading, search, this, 'arrivals');
	    },    
	    searchAirport: _.debounce((loading, search, vm, i) => {
	      var that = this
	      axios.get( `https://jetsbooking.herokuapp.com/airports/${escape(search)}` )
	        .then(res => {
				vm[i] = res.data;
				loading(false);
	        }).catch(function(error) {
	          console.log(error)
	        })
	    }, 350)
	},
	data: function() {
    	return{
    		ready: false,
		    departures: [],
		    arrivals: [],    		
		    local: {
		        monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), // months of head
		        months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), // months of panel
		        weeks: 'D_L_M_X_J_V_S'.split('_'), // weeks,      
		        dow: 0, // Sunday is the first day of the week
		        hourTip: 'Select Hour', // tip of select hour
		        minuteTip: 'Select Minute', // tip of select minute
		        secondTip: 'Select Second', // tip of select second
		        yearSuffix: '' // suffix of head year
		        //monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
		        //months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), 
		        //weeks: 'S_M_T_W_T_F_S'.split('_') 
		    },
			storage: {}, 
			language: null
		}
	}	
});

