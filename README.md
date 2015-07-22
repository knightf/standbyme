# standbyme
It is a jQuery plugin to keep elements fixed in viewport when scrolling.

Say you have 2 columns of content. One of them is an article and the other one is a metabox. Some useful information in that metabox is important and you want it to stay in the window rather than scrolled out. And this small plugin may save you a bit of time.

# Usage
``$('.metabox').standbyme();``

# Compatibility
Chrome, Firefox, Safari, IE 11

# Feature Design
## The wrapper
A wrapper is used to fixe the element's position. The original element's visibility is set to  hidden so that it still pocesses its space in the document. Yet the wrapper's position is set to fixed so that it can be controlled with absolute pixel value.

## To record the initial postition
A function that calculate the element's position in the whole document is adopted to get its top, left, width and hight(including margin), so all the information about this box can be accessed.

This function's reference is [this article](http://javascript.info/tutorial/coordinates). Basically, the absolute offset of one element is its own RoundRect object's value, adjusted with the scrolled pixels and the offset of &lt;html&gt; or &lt;body&gt;.

## To change the postition record dynamically
By adding custom events on the resize event, the element's offset and its parent's offset will change dynamically. More advanced feature will be added in later versions.

## To fix the element in the screen
By adding listeners to scroll event, 2 main checking process will be triggered when the page is being scrolled.

### Whether to wrap
So if the page has not been scrolled to a place below the top of the element, is should not be wrapped. Otherwise, it should be wrapped.

### Whether to stay at the bottom of parent element
If the page has been scrolled to a place below the bottom of the parent element, the target element should stay. Otherwise, it should be displayed in the viewport.

# Future Work
## Multiple elements
It will be great if we can have multiple side metabox at one time, and each one of them has their own start point and end point relative to the main content.
