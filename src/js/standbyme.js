/**
 * Standbyme plugin
 * Version: 0.1
 * Author: Eric Han
 **/

(function($){
	var StandByMe = (function(){
		var i = 0;

		var func = function(element, settings){
			var e = this;

			e.id = i++;
			e.ele = element;
			e.wrapper = null;

			e.offset = e.getSize(e.ele);
			e.parentEle = e.ele.parentNode;
			e.parentOffset = e.getSize(e.parentEle);

			e.wrapperFlag = false;
			e.bottomFlag = false;

			e.init();
		}

		return func;
	}());


	StandByMe.prototype.init = function(){
		var e = this;
		//bind events
		$(window).on('scroll.standbyme.id-' + e.id, {ele : e}, e.onScroll); //listen to scroll
		$(window).on('resize.standbyme.id-' + e.id, {ele : e}, e.onResize); //listen to resize
	}

	StandByMe.prototype.onScroll = function(event){
		var ele = event.data.ele;

		//check if the element is out of the viewport
		if((window.pageYOffset - ele.offset.top) > 0){
			//off the viewport
			if(!ele.wrapperFlag){
				//if it is not wrapped, wrap it
				ele.wrap();
			}
		}else{
			//in the view port
			if(ele.wrapperFlag){
				//if it is wrapped, unwrap it
				ele.unwrap();
			}
		}

		//check if the element should be at the bottom of its parent
		if((window.pageYOffset + ele.offset.height) > ele.parentOffset.bottom){
			//should be
			if(!ele.bottomFlag && ele.wrapperFlag){
				//not at bottom, let it stay
				ele.stayBottom();
			}
		}else{
			//should not be
			if(ele.bottomFlag && ele.wrapperFlag){
				//at bottom, release it
				ele.releaseBottom();
			}
		}
				
	}

	StandByMe.prototype.onResize = function(event){
		var ele = event.data.ele;

		//fix the offset
		ele.offset = ele.getSize(ele.ele);
		ele.parentOffset = ele.getSize(ele.parentEle);

		//adjust the wrapper
		var wrapper = ele.wrapper;
		if(wrapper){
			var style = ele.ele.currentStyle || window.getComputedStyle(ele.ele),
				marginLeft = parseFloat(style.marginLeft);
			wrapper.style.left = ele.offset.left - marginLeft;
		}
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

	    var style = window.getComputedStyle(ele) || ele.currentStyle;

	    var top  = clientRect.top + scrollTop - clientTop,
	    	left = clientRect.left + scrollLeft - clientLeft,
	    	width = parseFloat(parseFloat(style.marginLeft) + boxWidth + parseFloat(style.marginRight)),
			height = parseFloat(parseFloat(style.marginTop) + boxHeight + parseFloat(style.marginBottom));

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
		//assign left, minus the margin-left
		var style = e.ele.currentStyle || window.getComputedStyle(e.ele),
			marginLeft = parseFloat(style.marginLeft);
		wrapper.style.left = e.offset.left - marginLeft + 'px';

		return wrapper;
	}

	StandByMe.prototype.wrap = function(){
		var e = this,
			standin = e.ele.cloneNode(true);

		var wrapper = e.getWrapper();
		wrapper.appendChild(standin);

		//add the patch class to the element
		e.ele.className += ' standbyme-hidden';
		e.wrapper = wrapper;
		document.body.appendChild(wrapper);

		e.wrapperFlag = true;
	}

	StandByMe.prototype.unwrap = function(){
		var e = this;
			wrapper = e.wrapper;
		
		//remove the patch class on the element
		e.ele.className = e.ele.className.replace(' standbyme-hidden', '');
		document.body.removeChild(wrapper);

		e.wrapper = null;
		e.wrapperFlag = false;
	}

	StandByMe.prototype.stayBottom = function(){
		var e = this,
			wrapper = e.wrapper;

		//set wrapper's correct top value
		wrapper.className = 'standbyme-wrapper-bottom';
		wrapper.style.top = e.parentOffset.bottom - e.offset.height + 'px';

		e.bottomFlag = true;
	}

	StandByMe.prototype.releaseBottom = function(){
		var e = this,
			wrapper = e.wrapper;

		//set wrapper's top value 0
		wrapper.className = 'standbyme-wrapper';
		wrapper.style.top = 0;

		e.bottomFlag = false;
	}

	$.fn.standbyme = function(){
		var settings = {};
		this.each(function(){
			this.standbyme = new StandByMe(this, settings);
		});
	}
}(jQuery));