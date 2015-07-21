(function($){
	var StandByMe = (function(){
		var i = 0;

		var func = function(element, settings){
			var e = this;

			e.id = i++;
			e.ele = element;
			e.offset = e.getSize(e.ele);
			e.wrapperFlag = false;
			e.parentEle = e.ele.parentNode;
			e.parentOffset = e.getSize(e.parentEle);

			e.init();
		}

		return func;
	}());


	StandByMe.prototype.init = function(){
		var e = this;
		//bind events
		$(window).on('scroll.standbyme.id' + e.id, {ele : e}, e.onScroll); //listen to scroll
		$(window).on('resize.standbyme.id' + e.id, {ele : e}, e.onResize); //listen to resize
	}

	StandByMe.prototype.onScroll = function(event){
		var ele = event.data.ele;

		//check if the element is out of the boundary
		if(((window.scrollY - ele.offset.top) > 0) && ((window.scrollY + parseFloat(ele.getSize().height) < ele.parentOffset.bottom))){
			//off the screen
			if(!ele.wrapperFlag){
				//if it is not wrapped, wrap it
				ele.wrap();
			}
		}else{
			//not off the screen
			if(ele.wrapperFlag){
				//if it is wrapped, unwrap it
				ele.unwrap();
			}
		}
	}

	StandByMe.prototype.onResize = function(event){
		var ele = event.data.ele;

		//fix the offset
		ele.offset = ele.getSize(ele.ele);
		ele.parentOffset = ele.getSize(ele.parentEle);

		//adjust the wrapper
	}

	StandByMe.prototype.getSize = function(ele){
		var ele = ele || this.ele,
			clientRect = ele.getBoundingClientRect(),
			boxWidth = clientRect.right - clientRect.left,
			boxHeight = clientRect.bottom - clientRect.top;
	    
	    var body = document.body;
	    var docElem = document.documentElement;
	    
	    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
	    
	    var clientTop = docElem.clientTop || body.clientTop || 0;
	    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
	    
	    var top  = clientRect.top + scrollTop - clientTop,
	    	left = clientRect.left + scrollLeft - clientLeft,
	    	width = parseFloat(ele.style.marginLeft + boxWidth + ele.style.marginRight),
			height = parseFloat(ele.style.marginTop + boxHeight + ele.style.marginBottom);

		return {
			'top' : top,
			'left' : left,
			'width' : width,
			'height' : height,
			'right' : left + width,
			'bottom' : top + height,
		};
	}

	StandByMe.prototype.getWrapper = function(){
		var e = this;
			wrapper = document.createElement('div');

		//assign the default class
		wrapper.className = 'standbyme-wrapper';
		wrapper.id = 'standbymeWrapper-' + e.id;
		//assign the right size
		//assign width and height
		var size = e.getSize();
		wrapper.width = size.width;
		wrapper.height = size.height;
		//assign left, minus the margin-left
		var style = e.ele.currentStyle || window.getComputedStyle(e.ele),
			marginLeft = parseFloat(style.marginLeft);
		wrapper.style.left = e.offset.left - marginLeft;

		return wrapper;
	}

	StandByMe.prototype.wrap = function(){
		var e = this,
			standin = e.ele.cloneNode(true);

		var wrapper = e.getWrapper();
		wrapper.appendChild(standin);

		//add the patch class to the element
		e.ele.className += ' standbyme-hidden';
		document.body.appendChild(wrapper);

		e.wrapperFlag = true;
	}

	StandByMe.prototype.unwrap = function(){
		var e = this;
			wrapper = document.getElementById('standbymeWrapper-' + e.id);
		
		//remove the patch class on the element
		e.ele.className = e.ele.className.replace(' standbyme-hidden', '');
		document.body.removeChild(wrapper);

		e.wrapperFlag = false;
	}

	$.fn.standbyme = function(){
		var settings = {};
		this.each(function(){
			this.standbyme = new StandByMe(this, settings);
		});
	}
}(jQuery));
