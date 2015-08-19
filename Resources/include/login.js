exports.loginView = function(){
	
	Ti.App.Properties.setString("redirectUri","http://www.geewantha.com");
	Ti.App.Properties.setString("clientId","1e1aa9f97e2b4326ac56fcab1fc9a2ad");
	Ti.App.Properties.setString("access_token","");
	Ti.App.Properties.setString("user_id","");
	Ti.App.Properties.setString("username","");
	Ti.App.Properties.setString("profile_pic","");
	
	var login_view = Ti.UI.createView({
		//top: appPixel * 8,
		width: '100%',
		height: '100%',
		border: 0,
		backgroundColor: 'white',
		borderColor: '#aaa',
		// zIndex: -1
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
			height : '70%',
			image : '/images/quit.png',
	});
	imgLogout.addEventListener('click', function(){
		alert('clicked');
	});
	pageHeader.add(profilePic);
	pageHeader.add(imgLogout);
   	
   	login_view.add(pageHeader);
   	
   	
   	var webView = Ti.UI.createWebView({
            top: appPixel * 8,
            width: '100%',
            height: '80%', // new
            //url: pUrl,
            autoDetect: [Ti.UI.AUTODETECT_NONE]
    });
    webView.url = Authorized_URL+'?response_type=token&client_id=1e1aa9f97e2b4326ac56fcab1fc9a2ad&redirect_uri=http://www.geewantha.com&scope=likes+comments&display=touch';
    
    webView.addEventListener('beforeload', function(e){
    	console.log('URL : '+ e.url);
    	if (e.url.indexOf('#access_token') != -1){
            var token = e.url.split("=")[1];
            Ti.App.Properties.setString("access_token",token);
            console.log('>>>> Token : ' + Ti.App.Properties.getString("access_token"));
            webView.stopLoading();
            
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
					console.log('>>> Response text : ' + this.responseText);
					
			        // Ti.API.info(">>>> Usernmae " + JSONObject.data.username);
			        Ti.App.Properties.setString("username",JSONObject.data.username);
			        Ti.App.Properties.setString("user_id",JSONObject.data.id);
			        Ti.App.Properties.setString("profile_pic",JSONObject.data.profile_picture);
			        //alert('success');
			        
			        console.log('>>> Image : ' + Ti.App.Properties.getString("profile_pic"));
			        
			        var toast2 = Ti.UI.createNotification({
						message : "Welcome, "+Ti.App.Properties.getString("username"),
						duration : Ti.UI.NOTIFICATION_DURATION_LONG
					});
					toast2.show();
					Ti.App.Properties.setString("login","1");
					
					main_view.remove(login_view);
					Ti.App.fireEvent('loadImages');
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
            
        } else if (e.url.indexOf('error=access_denied') != -1) {
            //Ti.App.fireEvent('app:instagram_access_denied', {});
            //destroyAuthorizeUI();
            console.log('>>>>> ACESS DENIED');
            var toast1 = Ti.UI.createNotification({
				message : "App Cannot be proceed without your Authorization",
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast1.show();
            webView.stopLoading();
        }
    });
    
    login_view.add(webView);
    
    return login_view;
};
