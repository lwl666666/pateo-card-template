import Vue from 'vue'
import {
	formateDate
} from '../utils/utils.js'


Vue.filter('datetime', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return formateDate(format, timeStamp);
})