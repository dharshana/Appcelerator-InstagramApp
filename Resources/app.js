// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;
var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
if (ex_height > ex_width) {
	var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
} else {
	var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
}
var appPixel = deviceHeight / 100;
var deviceWidth = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);

var Authorized_URL = 'https://instagram.com/oauth/authorize/'; 		// Login and authrize URL , 
var UserDetails_URL = 'https://api.instagram.com/v1/users/self/';	// URL to get user details using access token, 
var UserFeeds_URL = 'https://api.instagram.com/v1/users/';			// URL to get latest feeds from user, https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN

// main window
var win = Ti.UI.createWindow({
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
});
// Main view
var main_view = Ti.UI.createView({
	width: '100%',
	height: '100%',
});
win.add(main_view);

// Event listener for signoff  
Ti.App.addEventListener('logout', function(){
	// reset config parameters
	Ti.App.Properties.removeProperty("login");
	main_view.remove(view_imageList);
	Ti.App.fireEvent('loadLoginView');
});

// event listener for Image loading 
Ti.App.addEventListener('loadImages', function(){	
	var objImageList = require('include/imageList');
	var view_imageList = objImageList.getImageList(); 	 
	main_view.add(view_imageList);
});

// event listener for Login view
Ti.App.addEventListener('loadLoginView', function(){	
	var objloginView = require('include/login');
	var loginView = objloginView.loginView(); 	 
	main_view.add(loginView);
});




if(!Ti.App.Properties.hasProperty("login") ){
	
	//
	Ti.App.fireEvent('loadLoginView');

    
   // main_view.add(login_view);
    
}else { 
	Ti.App.fireEvent('loadImages');
}

win.open();
