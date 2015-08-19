exports.getImageList = function(){
	
	updateProfileDetails();
	
	var mainView = Ti.UI.createView({
		layout : 'vertical',
		height : '100%',
		width : '100%',
	});
	var pageHeader = Ti.UI.createView({
		height : appPixel * 10,
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
	imgLogout.addEventListener('click', function(){
		alert('clicked');
	});
	pageHeader.add(profilePic);
	pageHeader.add(imgLogout);
	main_view.add(pageHeader);
	
	
	
	
	/*
	var imagesView = Ti.UI.createView({
		top : deviceHeight * 0.08,
		layout : 'vertical',
		height : deviceHeight * 0.92,
	});
	*/
	
	var imagesView = Ti.UI.createView({
		top : appPixel * 10,
		layout : 'vertical',
		height : appPixel * 90,
	});
	
	//---- image table view ---
	var imageTableView = Ti.UI.createTableView({
		
	});
	
	// logout event 
	profilePic.addEventListener('click', function(e){
		console.log(">>>> logout");
		//Ti.App.fireEvent('logout');
	});
	
	imagesView.add(imageTableView);
	loadImages();
	
	//---- EOF Image table View ---
	// mainView.add(imagesView);
	
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
		    onload : function(e) {
		    	var JSONObject = [];
				var JSONObject = JSON.parse(this.responseText);
		        //Ti.App.Properties.setString("profile_pic",JSONObject.data.profile_picture);		       
		        //profilePic.image = Ti.App.Properties.getString("profile_pic");
		        //console.log('>>> Images response  : '+this.responseText);
		        //console.log('>>> Number of Images  : '+JSONObject.data.length);
		        for(var i = 0 ; i < JSONObject.data.length; i++){
		        	console.log('>>> image url : '+JSONObject.data[i].images.standard_resolution.url);
		        	var tableRow = Ti.UI.createTableViewRow({
						className : 'forumEvent', // used to improve table performance
						//selectedBackgroundColor : accountviewdropdownselectedcolor,
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
		        Ti.App.Properties.setString("profile_pic",JSONObject.data.profile_picture);		       
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
