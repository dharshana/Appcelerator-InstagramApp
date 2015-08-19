exports.getImageList = function(){
	
	updateProfileDetails();
	
	var mainView = Ti.UI.createView({
		layout : 'vertical',
		height : '100%',
		width : '100%',
		//backgroundColor : '#ccc',
	});
	var pageHeader = Ti.UI.createView({
		height : appPixel * 8,
		top : appPixel * 0,
		width : '100%',
		backgroundColor : '#009ce6',
	});
	var profilePic = Ti.UI.createImageView({
			left : '2.5%',
			height : '80%',
			image : Ti.App.Properties.getString("profile_pic"),
		});
		
		var imgLogout = Ti.UI.createImageView({
			right : '2.5%',
			height : '80%',
			image : '/images/quit.png',
		});
	pageHeader.add(profilePic);
	pageHeader.add(imgLogout);
	main_view.add(pageHeader);
	
	var imagesView = Ti.UI.createView({
		top : deviceHeight * 0.08,
		layout : 'vertical',
		height : deviceHeight * 0.92,
	});
	
	////////////////// Image view //////////////////

	var imageContainerView = Ti.UI.createView({
		top : 0,
		width : '100%',
		height : '75%',
		backgroundColor : '#111111'
	});
	
	var mainImageView = Ti.UI.createImageView({
		image:'/images/A.png',
		height:'90%',
		width:'90%',
		//left : '1%',
	});
	
	imageContainerView.add(mainImageView);
	////////////////// EoF Image view //////////////////
	
	////////////////// slider view //////////////////

	var view1 = Ti.UI.createView({
		backgroundColor : '#111',
	});
	
	var view1Image1 = Ti.UI.createImageView({
		image:'/images/A.png',
		height:'96%',
		width:'32%',
		left : '1%',
	});
	
	var view1Image2 = Ti.UI.createImageView({
		image:'/images/B.png',
		height:'96%',
		width:'32%',
	});
	
	var view1Image3 = Ti.UI.createImageView({
		image:'/images/C.png',
		height:'96%',
		width:'32%',
		right : '1%',
	});
	
	view1.add(view1Image1);
	view1.add(view1Image2);
	view1.add(view1Image3);
	
	var view2 = Ti.UI.createView({
		backgroundColor : '#111',
	});
	
	var view2Image1 = Ti.UI.createImageView({
		image:'/images/D.png',
		height:'96%',
		width:'32%',
		left : '1%',
	});
	
	var view2Image2 = Ti.UI.createImageView({
		image:'/images/E.png',
		height:'96%',
		width:'32%',
	});
	
	var view2Image3 = Ti.UI.createImageView({
		image:'/images/F.png',
		height:'96%',
		width:'32%',
		right : '1%',
	});
	
	view2.add(view2Image1);
	view2.add(view2Image2);
	view2.add(view2Image3);
	
	var view3 = Ti.UI.createView({
		backgroundColor : '#111'
	});
	
	var view3Image1 = Ti.UI.createImageView({
		image:'/images/G.png',
		height:'96%',
		width:'32%',
		left : '1%',
	});
	
	var view3Image2 = Ti.UI.createImageView({
		image:'/images/H.png',
		height:'96%',
		width:'32%',
	});
	
	var view3Image3 = Ti.UI.createImageView({
		image:'/images/I.png',
		height:'96%',
		width:'32%',
		right : '1%',
	});
	
	view3.add(view3Image1);
	view3.add(view3Image2);
	view3.add(view3Image3);
	
	var thumbnailContainerView = Ti.UI.createScrollableView({
		bottom : 0,
		width : '100%',
		height : '25%',
		views : [view1, view2, view3],
		backgroundColor : '#111',
		showPagingControl : true
	});
	
	imagesView.add(imageContainerView);
	imagesView.add(thumbnailContainerView);
	mainView.add(imagesView);
	
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
