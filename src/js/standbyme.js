(function($){
	var StandByMe = function(element, settings){
		var e = this;

		e.jQueryObj = $(element);
		e.offset = e.jQueryObj.offset();
		e.wrapperFlag = false;

		e.init();
	}

	StandByMe.prototype.init = function(){
		var e = this;
		//bind events
		$(window).on('scroll.standbyme', {ele : e}, e.onScroll);	
	}

	StandByMe.prototype.onScroll = function(event){
		var ele = event.data.ele;
		//check if the element is out of the screen
		if((window.scrollY - ele.offset.top) > 0){
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

	StandByMe.prototype.wrap = function(){
		var e = this,
			wrapper = document.createElement('div');

		wrapper.className = 'standbyme wrapper';

		document.body.appendChild(wrapper);

		e.wrapperFlag = true;
		alert('wrapped');
	}

	StandByMe.prototype.unwrap = function(){
		var e = this;
			wrapper = document.getElementsByClassName('standbyme wrapper');
		
		document.body.removeChild(wrapper[0]);

		e.wrapperFlag = false;
		alert('unwrapped');
	}

	$.fn.standbyme = function(){
		var settings = {};
		this.each(function(){
			this.standbyme = new StandByMe(this, settings);
		});
	}
}(jQuery));
