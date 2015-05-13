//@program

var DEFAULT = new Style({ font:"30px", color:"black", horizontal:"center", vertical:"middle" });
var GREEN = new Style({ font:"bold 30px", color:"green", horizontal:"center", vertical:"middle" });
var RED = new Style({ font:"bold 30px", color:"red", horizontal:"center", vertical:"middle" });
var NOTE = new Style({ font:"italic 30px", color:"red", horizontal:"center", vertical:"middle" });
var inUse = new Label({left: 0, right: 120, style: RED, string:"IN USE: " });
var inUseTwo = new Label({left: 0, right: 120, style: RED, string:"IN USE: " });
var available = new Label({left: 0, right: 55, style: GREEN, string:"AVAILABLE: " });
var availableTwo = new Label({left: 0, right: 55, style: GREEN, string:"AVAILABLE: " });
var availWash = [4, 7, 8, 9, 10];
var inUseWash = [1, 2, 3, 5, 6];
var availVend = [1, 2, 3];
var inUseVend = [];
var type = "washing";
var inUseWashingMachines = new Text({left: 0, right: 0, style: DEFAULT, string: inUseWash.toString() });
var availableWashingMachines = new Text({left: 0, right: 0, style: DEFAULT, string: availWash.toString() });
var inUseVendingMachines = new Text({left: 0, right: 0, style: DEFAULT, string: inUseVend.toString() });
var availableVendingMachines = new Text({left: 0, right: 0, style: DEFAULT, string: availVend.toString() });

var errorMessage = new Text({left: 0, right: 0, style: NOTE, string: "Error cannot be in both laundromat and mall at once!" });

var machineMessage = new Label({left: 0, right: 0, style: NOTE, string: " " });
var received = new Label({left: 0, right: 0, style: NOTE, string: " received payment of " });
var amountMessage = new Label({left: 0, right: 0, style: NOTE, string: " " });

var giftFrom = new Label({left: 0, right: 0, style: NOTE, string: " " });
var giftTo = new Label({left: 0, right: 0, style: NOTE, string: " " });
var giftAmount = new Label({left: 0, right: 0, style: NOTE, string: " " });
var gifter = new Label({left: 0, right: 0, style: NOTE, string: "User " });
var given = new Label({left: 0, right: 0, style: NOTE, string: " has given " });
var giftee = new Label({left: 0, right: 0, style: NOTE, string: " to user " });

var mall = false;
var laundry = false;
var mallPic = false;
var laundPic = false;
var showPayment = false;
var showGift = false;
var showError = false;

Handler.bind("/atLaundromat", {
	onInvoke: function(handler, message) {
		application.distribute("onLaundChanged", message.requestObject);
	}
});

Handler.bind("/atMall", {
	onInvoke: function(handler, message) {
		application.distribute("onMallChanged", message.requestObject);
	}
});

function getMachine(words) {
    var n = words.split("#");
    return n[1];

}


Handler.bind("/setInUse", Behavior({
	onInvoke: function(handler, message){
		var machineNum = JSON.parse(message.requestText).machine;
		var amountNum = JSON.parse(message.requestText).amount;
		machineMessage.string = machineNum
		amountMessage.string = amountNum;
		var machine = getMachine(machineNum);
		machine = parseInt(machine);
		showPayment = true;
		if (type == "washing"){
	  		var index = availWash.indexOf(machine);
	  		var inUse = availWash.splice(index, 1);
	  		inUseWash.push(inUse[0]);
	  		inUseWashingMachines.string = inUseWash.toString();
	  		availableWashingMachines.string = availWash.toString();
			application.replace(washInfo, paymentLine);
		}else{
			var index = availVend.indexOf(machine);
	  		var inUse = availVend.splice(index, 1);
	  		inUseVend.push(inUse[0]);
   	  		inUseVendingMachines.string = inUseVend.toString();
	  		availableVendingMachines.string = availVend.toString();
	  		application.replace(vendInfo, paymentLine);
		}
		application.wait(3000);
	}
}));


Handler.bind("/sendMoney", Behavior({
	onInvoke: function(handler, message){
		var fromUser = JSON.parse(message.requestText).fromUser;
		var toUser = JSON.parse(message.requestText).toUser;
		var amountNum = JSON.parse(message.requestText).amount;
		giftFrom.string = fromUser;
		giftTo.string = toUser;
		giftAmount.string = amountNum;
		showGift = true;
		if (type == "washing"){
			application.replace(washInfo, giftLine);
		}else {
			application.replace(vendInfo, giftLine);
		}
		application.wait(3000);
	}
}));

Handler.bind("/getNearbyDevices", Behavior({
	onInvoke: function(handler, message){
		if (type == "washing"){
			message.responseText = JSON.stringify( {machineType: type, inUse: inUseWash, available: availWash } );
		}else {
			message.responseText = JSON.stringify( {machineType: type, inUse: inUseVend, available: availVend } );
		}
		message.status = 200;
	}
}));

var laundryPicture = new Column({left:0, right:0, top:0, bottom:0, 
			contents: [
				new Picture({url:"laundry.JPG"}),
			]
		});
		
var vendingPicture = new Column({left:0, right:0, top:0, bottom:0, 
			contents: [
				new Picture({url:"vending.jpg"}),
			]
		});

var errorLine = new Column({left:0, right:0, top:0, bottom: 0, contents:[errorMessage]});

var paymentLine = new Column({left:0, right:0, top:0, bottom: 0, 
	contents:
		[	
			machineMessage,
			received,
			amountMessage
		]
	});


var giftLine = new Column({left:0, right:0, top:0, bottom: 0, 
	contents:
		[
			gifter,
			giftFrom,
			given,
			giftAmount,
			giftee,
			giftTo
		]
	});

var washInfo = new Column({
				left:0, right:0, top:0, bottom:0,
				contents: [
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"washIcon.jpg", left: 125}),
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"checkmark.jpg", left: 60}),
							available
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, contents:[availableWashingMachines]}),
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"red_x.jpg", left: 60}),
							inUse
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, contents:[inUseWashingMachines]}),
				]
			});

var vendInfo = new Column({
				left:0, right:0, top:0, bottom:0,
				contents: [
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"vendIcon.jpg", left: 125}),
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"checkmark.jpg", left: 60}),
							availableTwo
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, contents:[availableVendingMachines]}),
					new Line({left:0, right:0, top:0, bottom: 0, 
						contents:[
							new Picture({url:"red_x.jpg", left: 60}),
							inUseTwo
						]
					}),
					new Line({left:0, right:0, top:0, bottom: 0, contents:[inUseVendingMachines]}),
				]
			});


var model = application.behavior = Object.create(Object.prototype, {

   onComplete: { value: function(application, message) {
      // After the BLLs have been configured, build the UI and issue single/repeated commands to the BLL
   	  if (mallPic){
   	  	mallPic = false;
   	  	application.replace(vendingPicture, vendInfo);
   	  } else if (laundPic){
   	  	laundPic = false;
   	  	application.replace(laundryPicture, washInfo);
   	  } else if (showError){
   	  	showError = false;
   	  	if (type == "vending"){
			application.replace(errorLine, vendInfo);
		}else{
			application.replace(errorLine, washInfo);
		}
   	  } else if (showPayment){
   	  	showPayment = false;
   	  	if (type == "vending"){
   	  		trace(paymentMessage.string);
			application.replace(paymentLine, vendInfo);
		}else{
			application.replace(paymentLine, washInfo);
		}
   	  } else if (showGift){
   	  	showGift = false;
   	  	if (type == "vending"){
			application.replace(giftLine, vendInfo);
		}else{
			application.replace(giftLine, washInfo);
		}
   	  }else{
   	  	application.invoke(new MessageWithObject("pins:/atLaundromat/read?repeat=on&callback=/atLaundromat&interval=20"));
   	  	application.invoke(new MessageWithObject("pins:/atMall/read?repeat=on&callback=/atMall&interval=20"));
   	  	application.skin = new Skin({ fill: "white" });
   	  	application.add(washInfo);
   	  }
   }},
   
   onLaunch: { value: function(application) {
      // Configure the BLLs used by this application
        application.invoke(new MessageWithObject("pins:configure", {
            atLaundromat: {
                require: "atLaundromat",
                pins: {
               // Specify the pins required by this BLL
               		availableDevices: {type: "A2D"}
                }
            },
            atMall: {
                require: "atMall",
                pins: {
               // Specify the pins required by this BLL
               		devicesInUse: {type: "A2D"}
                }
            }
            }), Message.TEXT);
        application.shared = true;
    }},
    onQuit: function(application) {
		application.shared = false;
	},
	onLaundChanged: { value: function(application, value) {
		if (value == 1 && !laundry){
			laundry = true;
			if (mall && laundry){
				if (type == "vending"){
					application.replace(vendInfo, errorLine);
				}else{
					application.replace(washInfo, errorLine);
				}
				showError = true;
				application.wait(2000);
			}else{
				if (type == "vending"){
					application.replace(vendInfo, laundryPicture);
				}else{
					application.replace(washInfo, laundryPicture);
				}
				laundPic = true;
				type = "washing";
				application.wait(2000);
			}
		}
		if (value == 0 && laundry){
			laundry = false;
		}
	}},
	onMallChanged: { value: function(application, value) {
		if (value == 1 && !mall){
			mall = true;
			if (mall && laundry){
				if (type == "vending"){
					application.replace(vendInfo, errorLine);
				}else{
					application.replace(washInfo, errorLine);
				}
				showError = true;
				application.wait(2000);
			}else{
				if (type == "vending"){
					application.replace(vendInfo, vendingPicture);
				}else{
					application.replace(washInfo, vendingPicture);
				}
				mallPic = true;
				type = "vending";
				application.wait(2000);
			}
		}
		if (value == 0 && mall){
			mall = false;
		}
	}}
});
