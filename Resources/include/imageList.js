exports.getImageList = function(){
	
	updateProfileDetails();
	var mainView = Ti.UI.createView({
		layout : 'vertical',
		height : '100%',
		width : '100%',
	});
	var pageHeader = Ti.UI.createView({
		height : appPixel * 8,
		top : appPixel * 0,
		width : '100%',
		backgroundColor : '#009ce6',
		zIndex: 999,
	});
	var profilePic = Ti.UI.createImageView({
			left : '2.5%',
			height : '80%',
			image : Ti.App.Properties.getString("profile_pic"),
	});
	var imgLogout = Ti.UI.createImageView({
			right : '2.5%',
			height : '70%',
			image : '/images/quit.png',
	});
	
	// logout event
	imgLogout.addEventListener('click', function(){
		appLogoffConf.show();
		//mainView.remove(imagesView);
		//Ti.App.fireEvent('logout');
	});
	
	
	var appLogoffConf = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Yes', 'No'],
		message: 'Are you sure you want to logout now?',
	});
		
	appLogoffConf.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		    // cancel area
		}else{
		    //var activity = Titanium.Android.currentActivity; activity.finish();
		    Ti.App.fireEvent('openLoadingScreen');
		    mainView.remove(imagesView);
		    mainView.remove(pageHeader);
			Ti.App.fireEvent('logout');
			var toast1 = Ti.UI.createNotification({
				message : "You've Succesfully Logged Out",
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast1.show();
		}
	});
	
	pageHeader.add(profilePic);
	pageHeader.add(imgLogout);
	main_view.add(pageHeader);
	
	main_view.add(appLogoffConf);
	
	var imagesView = Ti.UI.createView({
		top : appPixel * 8,
		layout : 'vertical',
		height : appPixel * 92,
	});
	
	//---- image table view ---
	var imageTableView = Ti.UI.createTableView({
		
	});
	
	imagesView.add(imageTableView);
	loadImages();
	
	//---- EOF Image table View ---
	mainView.add(imagesView);
	
	var imageTableData = [];
	
	function loadImages(){
		var params = {
			access_token : Ti.App.Properties.getString("access_token"),
		};
		var url = UserFeeds_URL+Ti.App.Properties.getString("user_id")+'/media/recent/';
		var xhr = Ti.Network.createHTTPClient({
        	timeout : 5000, // in milliseconds
			autoEncodeUrl : false,
		    // function called when the response data is available
		    
		    onreadystatechange: function(){
		    	if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3){
		    		Ti.App.fireEvent('openLoadingScreen');
		    	}else if(this.readyState == 4){
		    		Ti.App.fireEvent('hideLoadingScreen');
		    	}		    	
			},
		    onload : function(e) {
		    	var JSONObject = [];
				var JSONObject = JSON.parse(this.responseText);
		        for(var i = 0 ; i < JSONObject.data.length; i++){
		        	var tableRow = Ti.UI.createTableViewRow({
						className : 'forumEvent', // used to improve table performance
						rowIndex : i, // custom property, useful for determining the row during events
						id : JSONObject.data[i].id,
						height : appPixel * 50,
						backgroundSelectedColor : '#99deff',
						title: JSONObject.data[i].images.standard_resolution.url,
					});
					
					var imageView = Ti.UI.createImageView({
						image : JSONObject.data[i].images.standard_resolution.url,
						
					});
					tableRow.add(imageView);
					imageTableData.push(tableRow);
		        }
		        imageTableView.data = imageTableData;
		        
		    },
		    // function called when an error occurs, including a timeout
		    onerror : function(e) {
		        Ti.API.debug(e.error);
		    },
		 });
		 // Prepare the connection.
		 xhr.open("GET", url);
		 // Send the request.
		 xhr.send(params);
	}
	
	function updateProfileDetails(){
		var params = {
			access_token : Ti.App.Properties.getString("access_token"),
		};
        var xhr = Ti.Network.createHTTPClient({
        	timeout : 5000, // in milliseconds
			autoEncodeUrl : false,
		    // function called when the response data is available
		    onload : function(e) {
		    	var JSONObject = [];
				var JSONObject = JSON.parse(this.responseText);      
		        profilePic.image = Ti.App.Properties.getString("profile_pic");
		    },
		    // function called when an error occurs, including a timeout
		    onerror : function(e) {
		        Ti.API.debug(e.error);
		    },
		 });
		 // Prepare the connection.
		 xhr.open("GET", UserDetails_URL);
		 // Send the request.
		 xhr.send(params);
	}
	
	return mainView;
};
