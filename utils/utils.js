//防抖
export const debounce = (func, time = 500) => {
	if(!isFunction(func)||isNaN(time)) return;
	let timer = null;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, arguments)
		}, time);
	}
}
//节流
export const throtte = (func, time = 500) => {
	if(!isFunction(func)||isNaN(time)) return;
	let activeTime = 0;
	return () => {
		const current = Date.now();
		if (current - activeTime > time) {
			func.apply(this, arguments);
			activeTime = Date.now();
		}
	}
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const formateDate = (format, timeStamp)=>{
	if('' + timeStamp.length <= 10){
		timeStamp = + timeStamp * 1000;
	}else{
		timeStamp = + timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;
	
	return format.replace(/[YmdHis]/g, key=>{
		return {Y,m,d,H,i,s}[key];
	});
}

/**
 * 转换rpx
 * 通过 :style=""这样的方式设置rpx像素值不会经过编译器，需调用方法做转换
 * 转换为以卡片跨度为基准的rpx值
 * @param {Number} pixel 设计稿对应rpx  
 * @return {String}
*/
export const convertCardRpx = (pixel)=>{
	pixel = parseFloat(pixel);
	if(!isDef(pixel)||isNaN(pixel)) return 0;
	return pixel*750/718+'rpx';
}

//定义
export const isDef = (val) =>{
	return val !== undefined && val !== null;
}
//函数
export const isFunction = (func) =>{
	return typeof func === 'function';
}
//对象
export const isObject = (val) =>{
	return val !== null && typeof val === 'object';
}
//Promise
export const isPromise = (val) =>{
	return isObject(val) && isFunction(val.then);
}