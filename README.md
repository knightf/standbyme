# standbyme
a jQuery plugin to keep elements fixed when scrolling

# Structure design
To start, record the initial y coordinate value of the element.
Bind the event of scrolling, check if it has been scrolled out of the screen.
## For the scroll event
check if it is already out of the screen by flag:
if true then do nothing;
if false, then check if it is about to get out of the screen:
	if true, add a wrapper to it and the wrapper will have fixed postion so that it will always stays at the top of the page, and set the flag of this element to be outofscreen.
	if false, then do nothing.

