$(document).ready(function(){

	var followers = []; 
	var logo;
	var status;
	var name;
	url="https://api.twitch.tv/kraken/streams/freecodecamp";

	$.getJSON(url, function(response1){
		if(response1.stream === null){
			$("#fccstatus").text("OOPS!! FREECODECAMP CURRENTLY OFFLINE!!");
		}else{
			$("#fccstatus").text("WELCOME TO FREECODECAMP TWITCH TV!!");
		}
	});

	$.getJSON("https://api.twitch.tv/kraken/users/freecodecamp/follows/channels", function(response2){
		for(var i=0; i<response2.follows.length; i++){
		followers.push(response2.follows[i].channel.display_name);
		}
	

	for(var i=0; i<followers.length; i++){
		var url1= "https://api.twitch.tv/kraken/streams/" + followers[i] + "/?callback=?";
		$.getJSON(url1).done(function(response3){
			if(response3.error){
				logo = "images.png";
				status = response3.error;
				name = response3.message;
				listUser();
			}
			else if(response3.stream === null){
				$.getJSON(response3._links.channel, function(response4){
					if(response4.logo === null){
						logo = "images.png";
					}else{
						logo = response4.logo;
					}
					name = response4.display_name;
					status = "Offline";
					listUser();
				});
			}else{
				if(response3.stream.channel.logo === null){
					logo = "images.png";
				}else{
					logo = response3.stream.channel.logo;
				}
				name = response3.stream.channel.display_name;
				status = "ONLINE";
				listUser();
				}

		});
	}
	
	});

function listUser(){
	$("#list").prepend("<div class='row col-md-offset-4 text-center list'><div class='col-md-2'>"+
		 "<img src='"+ logo +"'></div><div class='col-md-2 name'><a target='_blank' href='https://www.twitch.tv/"+name+"'>"+
		 name +"</a></div><div class='col-md-2 status'>"+ 
		 status +"</div></div>");
	return;
}

});