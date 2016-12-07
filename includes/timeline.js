/*  JavaScript Document                      */
var timelineWidth = 0;
var panelWidth = 0;
var firstRun = true;
var totalPanels = 0;
var currentPanel = 0;

$(document).ready(function(){

	panelWidth = $('.timeline .panel').width();  //grabs width of individual panel (340px)
	timelineWidth = $('.timeline').width();      //grabs width of entire page wrapper (1439px)
	totalPanels = $('.timeline .panel').length;  //grabs the total number of .panel elements
	adjustLayout();
 	setInterval(checkWindowSize, 1000);


});

function adjustLayout(){

	$('.timeline .panel').each(function(index){  //traverses each .panel and  gets index #
		var newX = panelWidth * index;           //this value will become the left position for each .panel
		$(this).css('left',newX+'px');           //each .panel gets assigned its left position width

		var newLabel = $(this).find('.label').html();              //grabs html w/in .label (nested in .panel)
		$('.timeline nav').append('<a href="#">'+newLabel+'</a>'); //slaps anchors around it and appends to a new nav element (all positioned in css sheet)

	});

	currentPanel = $('.timeline nav a:last-child()').index();      //initially reps value of index of last nav anchor tag

	activateNavigation();   //this function activates when any of the nav a's are clicked

}

function activateNavigation() {

	$('.timeline nav a').on('click',function(){
		currentPanel = $(this).index();  //grabs the index # of the nav a that's been clicked
		timelineWidth = $('.timeline').width(); /* We've re-inserted this line because when function runs we want to RE-CHECK 
		the width in case screen size has changed and make sure that new screen size/.timeline width is used for the calculation
		thus no matter what the screen size, the panel when anchor is clicked will always go to center! */

		$('.timeline nav a').removeClass('selected');  //removes a.selected status from all nav a's
		$(this).addClass('selected');  //nav a that's been clicked keeps a.selected status (fromm CSS style sheet)

		var timelineOffset = (timelineWidth-panelWidth) * .5;  //left position # that is center of page
		var newPosition = ((currentPanel*panelWidth)* -1) + timelineOffset; 
		/*ie: let's say nav a index #3 is clicked (1990-99); (3*340)* -1= -1020 (this 4th .panel is at 
		left: 1020px) -1020 + left position center # (which on this page is 549.5) would calculate this
		panel in the position of (-1020 + 549.5 = -470.5 !), but remember we don't want this .panel to be at -470.5 left
		which would move it off page, BUT move it -470.5 to the left........*/
		$('.panel_slider').animate({left:newPosition+'px'}, 1000);
		/* Therefore we will move the entire .panel_slider
		div container to the left by -470.5px; either way that 3 index anchor that's been clicked
		  will place that .panel in the center postion!!! */

		//below is code for moving the img.background
		var backgroundWidth = $('.timeline .background_slider img').width();
		var moveAmount = (backgroundWidth - timelineWidth) / totalPanels;
		if( currentPanel != 0 ){
			var multiplier = currentPanel + 1;
		}else{
			var multiplier = 0;
		}
		var newBackgroundPosition = (moveAmount * multiplier) * -1;
		$('.background_slider img.background').animate({left:newBackgroundPosition+'px'},1000);



	})
}



function checkWindowSize(){

	var newTimelineWidth = $('.timeline').width();

	if(newTimelineWidth > 500 && timelineWidth > 500){
		//do nothing
	}else if(newTimelineWidth < 500 && timelineWidth < 500){
		//do nothing
	}else{
		if(newTimelineWidth > 500 && timelineWidth < 500){
			firstRun = true;
		}
	}

	timelineWidth = newTimelineWidth;


	/* The 1st if statement below will automatically load page w/ the 6th and last anchor as clicked
	remember, cause currentPanel value was set = to the last anchor above by default before clicked*/
	if (firstRun == true) {
		$('.timeline nav a:nth-child('+(currentPanel+1)+')').trigger('click');
		firstRun = false;
	};
}















