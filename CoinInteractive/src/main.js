//@program
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var TRANSITIONS = require("transitions");
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var MODEL = require('mobile/model');
var TOOL = require('mobile/tool');
var DIALOG = require('mobile/dialog');


var CONTROLS_THEME = require('themes/flat/theme');
var THEME = require('themes/sample/theme');
for ( var i in CONTROLS_THEME ){
    THEME[i] = CONTROLS_THEME[i]
}

//STYLES AND SKINS
var whiteSkin = new Skin({fill:"white"});
var tealSkin = new Skin({fill:"#47bba8"});
var redSkin = new Skin({fill:"#fe8c82"});
var grayskin = new Skin({ fill: 'gray'});
var blueSkin = new Skin({fill: 'blue'});
var whiteButtonBorderSkin = new Skin({fill:"white", borders: {bottom:2 }, stroke: '#fae991'});


var receiptTotal = new Style({font:"bold 45px", color:"white"});
var mediumText = new Style({font:"20px Trebuchet", color:"#333333"});
var sidebarText = new Style({font:"20px", color:"white"});
var mediumTextAvail = new Style({font:"20px Trebuchet", color:"#67C176"});
var mediumTextInUse = new Style({font:"20px Trebuchet", color:"#fe8c82"});
var productNameStyle = new Style({  font: 'bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var titleScreenButtonStyle = new Style({font:"bold 20px", color:"#FFFFFF"});
var bigText2 = new Style({font:"bold 25px", color:"#333333"});
var machineTitleStyle = new Style({font:"bold 25px Trebuchet", color:"white"});
var boldTealText = new Style({font:"bold 15px Trebuchet", color:"#47bba8"});
var lightTealText = new Style({font:"20px Trebuchet", color:"#47bba8"});
var settingsTealText = new Style({font:"15px Trebuchet", color:"#47bba8"});

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: '#47bba8',});
var confirmationSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: '#47bba8', fill:"#E6E6E6"});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldStyle2 = new Style({ color: 'black', font: 'bold 16px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle2 = new Style({ color: '#aaa', font: '16px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });

//top title bar template
var navbar_template = Container.template(function($){ return{left:0, right:0, top:0, bottom:400, skin: tealSkin}});

var backLogoSkin = new Skin({width:32, height:32, texture:new Texture("back_arrow.jpg"), fill:"black"});
//Keep track of data to send device
var machineNumber;
var paymentAmount;
var screenNowFocused = mainContainer;
var typeOfMachine;
var machPic = new Picture({url:"pretty_washer.jpg", bottom: 240, top:70});

/* *********   FUNCTIONS   ********* */
/* *********   FUNCTIONS   ********* */


//NEXT SCREEN TRANSITION
function nextScreen(current, next) {
	//this.currentScreen.run( new TRANSITIONS.CrossFade(), this.currentScreen.last, next, { duration : 600 } );
	//this.currentScreen = next;
	application.remove(current);
	application.add(next);	
	screenNowFocused = next;
}


//BUILD LIST
function buildList(array, numGreen, type) {
	changeMachinePic(type);
	for(i=0; i < array.length; i++){
		if(i >= numGreen){
			columnContainer.first.first.add(new RedListButtonTemplate({textForLabel: type + " #" + array[i], skin: whiteButtonBorderSkin}));	
		} else {
			columnContainer.first.first.add(new GreenListButtonTemplate({textForLabel:type + " #" + array[i], skin: whiteButtonBorderSkin}));	
		}
		
	}
}


/* *********   TEMPLATES   ********* */
/* *********   TEMPLATES   ********* */
/* *********   TEMPLATES   ********* */


//BACK BUTTONS

var BackButton3Template = BUTTONS.Button.template(function($){ return{
  top:10, bottom:410, left:0, right:250, skin: backLogoSkin,
  contents:[],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(qrContainer, nearDevs);
    }}
  })
}});

var BackButton4Template = BUTTONS.Button.template(function($){ return{
  top:10, bottom:410, left:0, right:250, skin: backLogoSkin,
  contents:[],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(deviceOptions ,nearDevs);
    }}
  })
}});

var BackButton5Template = BUTTONS.Button.template(function($){ return{
  top:10, bottom:410, left:0, right:250, skin: backLogoSkin,
  contents:[],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(paymentScreen ,deviceOptions);
    }}
  })
}});

var BackButton6Template = BUTTONS.Button.template(function($){ return{
  top:10, bottom:410, left:0, right:250, skin: backLogoSkin,
  contents:[],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(contactOwnerScreen ,deviceOptions);
    }}
  })
}});


//BUTTONS FOR DEVICES
var qrSkin = new Skin({width:50, height:50, texture:new Texture("qr_white_icon2.jpg"), fill:"black"});

var CameraButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:20, bottom:410, left:0, right:250, skin: qrSkin,
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(nearDevs, qrContainer);
    }}
  })
}});

var GreenListButtonTemplate = BUTTONS.Button.template(function($){ return{
  left:0, right:0, top: 5, height: 45, skin: $.skin,
  contents:[
    new Label({left:60, string:$.textForLabel, style:mediumTextAvail}),
    new Picture({url:"checkmark.jpg", left:10}),
    new Label({right:5, string:">", style:mediumTextAvail})
  ],
  
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	machineNumber = button.first.string;
      	nextScreen(nearDevs, deviceOptions);
      	machineName.string = button.first.string;
      	useButton.first.string = "Use This Machine";
      	useButton.skin = tealSkin;
    }}
  })
}});

var RedListButtonTemplate = BUTTONS.Button.template(function($){ return{
  left:0, right:0, top: 5, height: 45, skin: $.skin,
  contents:[
    new Label({left:60, string:$.textForLabel, style:mediumTextInUse}),
    new Picture({url:"red_x.jpg", left:10}),
    new Label({right:5, string:">", style:mediumTextInUse})
  ],
  
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	machineNumber = button.first.string;
      	nextScreen(nearDevs, deviceOptions);
      	machineName.string = button.first.string;
      	useButton.first.string = "IN USE";
      	useButton.skin = grayskin;
    }}
  })
}});

//REFRESH BUTTON

var RefreshButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:5, bottom:410, left:250, right:0, skin:new Skin({width:32, height:32, texture:new Texture("refres_icon_teal.jpg"), fill:"black"}),
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	//button.skin = blueSkin;
      	button.invoke(new Message(deviceURL + "getNearbyDevices"), Message.JSON);
      	//application.add( new spinny( { speed: 0.5 } ) );
      	
      	//application.add( spinny );
    }},
    onComplete : { value: function(content, message, json){
		
		//parse info
		typeOfMachine = JSON.parse('"'+ json.machineType+ '"');
    	var availArray = JSON.parse("[" + json.available + "]");
    	var usedArray = JSON.parse("[" + json.inUse + "]");
    	var allMachines = availArray.concat(usedArray);
    	//Create list of devices seperated by status of use
    	
    	nearCol.remove(columnContainer);
		columnContainer = new ScreenContainer(data);
		nearCol.add(columnContainer);
    	
    	buildList(allMachines, availArray.length, typeOfMachine.substring(0,1).toUpperCase() + typeOfMachine.substring(1,typeOfMachine.length));
    	
    }}
  })
}});


//NEARBY DEVICES BUTTON
var NearbyButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:340, bottom:50, left:50, right:50, skin: tealSkin,
  contents:[
  	new Label({left:0, right:0, bottom: 5, height:55, string:"Get Started", style:titleScreenButtonStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	
      	button.invoke(new Message(deviceURL + "getNearbyDevices"), Message.JSON);
      	button.skin = blueSkin;
      	//nLabel.string = "Loading...";
      	application.add( spinny );
      	
    }},
    onComplete: { value: function(content, message, json){
    	application.remove( spinny );
    	//nLabel.string = "Find NearBy Devices";
    	typeOfMachine = JSON.parse('"'+ json.machineType+ '"');
    	var availArray = JSON.parse("[" + json.available + "]");
    	var usedArray = JSON.parse("[" + json.inUse + "]");
    	var allMachines = availArray.concat(usedArray);
    	//Create list of devices seperated by status of use
    	
    	nearCol.remove(columnContainer);
		columnContainer = new ScreenContainer(data);
		nearCol.add(columnContainer);
    	
    	buildList(allMachines, availArray.length, typeOfMachine.substring(0,1).toUpperCase() + typeOfMachine.substring(1,typeOfMachine.length));
    	
    	nextScreen(mainContainer, nearDevs);
    }}
  })
}});


//HELP (contact owner) BUTTON
var HelpButtonTemplate = BUTTONS.Button.template(function($){ return{
  top: 320, bottom:95, left:75, right:75, skin: redSkin,
  contents:[
    new Label({left:0, right:0, height:55, string:$.textForLabel, style:titleScreenButtonStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(deviceOptions, contactOwnerScreen); 
    }}
  })
}});


//USE BUTTON
var UseButtonTemplate = BUTTONS.Button.template(function($){ return{
  top: 260, bottom:155, left:65, right:65, skin: tealSkin,
  contents:[
    new Label({left:0, right:0, height:55, string:$.textForLabel, style:titleScreenButtonStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    
    	if (button.first.string === "Use This Machine"){
    		nextScreen(deviceOptions, paymentScreen);
    	}
      	
    }}
  })
}});


//SEND PAYMENT BUTTON


var ButtonBehavior = Behavior.template({
	onCreate: function(label) {
		label.coordinates = {top:0, bottom:0, left:50, right:0,};
            label.skin = tealSkin;
            //label.style = titleScreenButtonStyle;
            label.active = true;
	},
	onTouchBegan: function(label) {
	},

	onTouchEnded: function(label) {
		//label.skin = tealSkin;
		if (field.first.first.string === ""){
		}else{
        	this.onTap(label);
        }
	},
});

var newSend = Container.template(function($) { return {skin:tealSkin, top: 330, bottom:90, left:85, right:85, contents: [], }});
newSend.behaviors = new Array(1);
newSend.behaviors[0] = ButtonBehavior.template({

	onTap: function(label) {
		label.invoke(new Message("/simple"));
	},
})

var sendy = new Label({style: titleScreenButtonStyle, behavior: Object.create((newSend.behaviors[0]).prototype), string: 'Send', });

var SendPayButtonTemplate = new newSend();
SendPayButtonTemplate.add(sendy);

Handler.bind("/simple", Object.create(MODEL.DialogBehavior.prototype, {
	onDescribe: { value: 
		function(query) {
			return {
                    Dialog: DIALOG.Box,
                    title: "Payment Memo",
                    action: "/printResult",
                    items: [
                        {
                            Item: DIALOG.Field,
                            id: "pay_memo",
                            label: "Memo",
                        },
                    ],
                    ok: "OK",
                    cancel: "Cancel",
};},},}));

Handler.bind("/printResult", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: 

		function(handler, query) {
			for (var key in query) {
                var myData = new Message(deviceURL + "setInUse");
    			myData.requestText = JSON.stringify( { machine: machineNumber, amount: paymentAmount });
    			handler.invoke(myData, Message.JSON);
    			receiptMachineName.string = machineNumber;
    			typeLabel.string = "Type: " + typeOfMachine.substring(0,1).toUpperCase() + typeOfMachine.substring(1,typeOfMachine.length) + " Machine";
    			updateRewards(5);
      			nextScreen(paymentScreen, receiptContainer);
      			
            }
		},
	},
}));


//FIELD FOR PAYMENT
var MyField = Container.template(function($) { return { 
  width: 250, height: 36, top:110 ,skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
              		totalLabel.string = "$" + data.name;
              		paymentAmount = label.string;
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"$0.00", name:"hint"
         })
      ]
    })
  ]
}});

//FIELD FOR GIFT AMOUNT

var giftAmount = 0.00;
var MyGiftField = Container.template(function($) { return { 
  width: 250, height: 36, top:110 ,skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
              		totalLabel.string = "$" + data.name;
              		giftAmount = label.string;
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"$0.00", name:"hint"
         })
      ]
    })
  ]
}});

//SEND FEEDBACK BUTTON
var SendFeedbackButtonTemplate = BUTTONS.Button.template(function($){ return{
  top: 380, bottom:50, left:75, right:75, skin: tealSkin,
  contents:[
    new Label({left:0, right:0, height:55, string:$.textForLabel, style:titleScreenButtonStyle})
  ],behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	
      	button.invoke(new Message(deviceURL + "getNearbyDevices"), Message.JSON);
      	feedbackButton.first.string = "Loading...";
      	
    }},
    onComplete: { value: function(content, message, json){
    
    	field2.first.first.string = "";
    
    	feedbackButton.first.string = "Send";
    	typeOfMachine = JSON.parse('"'+ json.machineType+ '"');
    	var availArray = JSON.parse("[" + json.available + "]");
    	var usedArray = JSON.parse("[" + json.inUse + "]");
    	var allMachines = availArray.concat(usedArray);
    	//Create list of devices seperated by status of use
    	
    	nearCol.remove(columnContainer);
		columnContainer = new ScreenContainer(data);
		nearCol.add(columnContainer);
    	
    	buildList(allMachines, availArray.length, typeOfMachine.substring(0,1).toUpperCase() + typeOfMachine.substring(1,typeOfMachine.length));
      	nextScreen(contactOwnerScreen, nearDevs);
    }}
  })
}});
  


//FEEDBACK TEXT
var feedbackText = Container.template(function($) { return { 
  width: 250, height: 70, top:80 ,skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle2, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle2, string:"Tap here to enter your issue...", name:"hint"
         })
      ]
    })
  ]
}});


//FIELD FOR PAYMENT MEMO
var memoText = Container.template(function($) { return { 
  width: 190, height: 70, top:40 ,skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle2, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle2, string:"Enter payment memo...", name:"hint"
         })
      ]
    })
  ]
}});

var giftRec = "Alex McLean";

//SEND GIFT BUTTON
var SendGiftButtonTemplate = BUTTONS.Button.template(function($){ return{
  top: 320, bottom:95, left:75, right:75, skin: tealSkin,
  contents:[
    new Label({left:0, right:0, height:55, string:$.textForLabel, style:titleScreenButtonStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    	var myData = new Message(deviceURL + "sendMoney");
    	myData.requestText = JSON.stringify( { fromUser: "Oski Bear", toUser: giftRec, amount: giftAmount });
    	button.invoke(myData, Message.JSON);
    	updateRewards(5);
      	nextScreen(screenNowFocused, nearDevs); 
    }}
  })
}});


//UPDATE REWARDS FUNCTION
function updateRewards(pointsToAdd){
	rewardPoints = rewardPoints + pointsToAdd;
	pointsLabel.string = rewardPoints;
	profileContainer.remove(currentBadge);
	if(rewardPoints == 15){
		currentBadge = new Picture({top:85, url:"big_spender.jpg"});
		rankLabel = ranks[1];
	} else if(rewardPoints == 30) {
		rankLabel = ranks[2];
	}
	profileContainer.add(currentBadge);
}


//RECEIPT TO MENU BUTTON
var ReceiptToMenuTemplate = BUTTONS.Button.template(function($){ return{
  top: 380, bottom:50, left:75, right:75, skin: tealSkin,
  contents:[
    new Label({left:0, right:0, height:55, string:$.textForLabel, style:titleScreenButtonStyle})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
    
    	button.invoke(new Message(deviceURL + "getNearbyDevices"), Message.JSON);
      	afterReceiptButton.first.string = "Loading...";
    	
      	//nextScreen(receiptContainer, nearDevs); 
    }},
    onComplete: { value: function(content, message, json){
    
    	afterReceiptButton.first.string = "Return to Devices";
    	typeOfMachine = JSON.parse('"'+ json.machineType+ '"');
    	var availArray = JSON.parse("[" + json.available + "]");
    	var usedArray = JSON.parse("[" + json.inUse + "]");
    	var allMachines = availArray.concat(usedArray);
    	//Create list of devices seperated by status of use
    	
    	nearCol.remove(columnContainer);
		columnContainer = new ScreenContainer(data);
		nearCol.add(columnContainer);
    	
    	buildList(allMachines, availArray.length, typeOfMachine.substring(0,1).toUpperCase() + typeOfMachine.substring(1,typeOfMachine.length));
      	nextScreen(receiptContainer, nearDevs);
    }}
    
  })
}});

function changeMachinePic(type) {
	deviceOptions.remove(machPic);
	if(type == "Vending"){
		machPic = new Picture({url:"vending_picture.jpg", bottom: 240, top:70});
	} else if(type == "Washing"){
		machPic = new Picture({url:"pretty_washer.jpg", bottom: 240, top:70});
	}
	deviceOptions.add(machPic);
}

/* *********   LAYOUT   ********* */
/* *********   LAYOUT   ********* */
/* *********   LAYOUT   ********* */

//SPINNER
var BusyPicture = Picture.template(function($) { return {top: 60, behavior: Object.create((BusyPicture.behaviors[0]).prototype), url: './assets/waiting.png', }});
BusyPicture.behaviors = new Array(1);
BusyPicture.behaviors[0] = Behavior.template({

	onCreate: function(picture, data) {
		this.bump = data.speed * 20;
				if ( 0 == this.bump )
					this.bump = 1;
	},

	onLoaded: function(picture) {
		picture.origin = { x:picture.width >> 1, y:picture.height >> 1 };
				picture.scale = { x:0.5, y:0.5 };
				picture.rotation = 0;
				picture.start();
	},

	onTimeChanged: function(picture) {
		var rotation = picture.rotation;
				rotation -= this.bump;
				if (rotation < 0) rotation = 360;
				picture.rotation = rotation;
	},
})

var spinny = new BusyPicture({ speed: 0.5 }, {});


//MAIN CONTAINER BUTTONS INITS
var nearbyButton = new NearbyButtonTemplate();

//MAIN CONTAINER 
var mainContainer = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin});


//MAIN CONTAINER INIT
mainContainer.add(nearbyButton);
mainContainer.add(new Picture({url:"exchangeicontransp.png", bottom: 200, top:60}));



//QR CODE CONTAINER
var qrContainer = new Container({left:0, right:0, top:0, bottom:0, skin: tealSkin});
qrContainer.add(new Label({ top:200, height:55, string:"camera not found", style:mediumText}));
qrContainer.add(new BackButton3Template({}));


//NEAR DEVICES CONTAINER
var nearDevs = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin,});
var nearCol = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin,});


//NEAR DEVICES INIT	
rButton = new RefreshButtonTemplate();
nearDevs.add(nearCol);
nearDevs.add(new navbar_template());
nearDevs.add(new CameraButtonTemplate());
nearDevs.add(rButton);
nearDevs.add(new Label({left:70, right:0, top:5, height:55, string:"Nearby Devices", style:machineTitleStyle}));




//DEVICE COLUMN INIT

var data = new Object();
var ScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:55, bottom:60,
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. */ 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});

var columnContainer = new ScreenContainer(data);

function ListBuilder(element, index, array) {
	columnContainer.first.first.add(new ProcessorLine(element));
}

nearCol.add(columnContainer);


//DEVICE OPTIONS CONTAINER
var deviceOptions = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin});
var machineName = new Label({top:5, height:55, string:"HELLO", style:machineTitleStyle});
var modelNumber = new Label({top:210, height:55, string:"Serial #:‎ MHWC7500YW", style:boldTealText});

//DEVICE OPTIONS INIT
deviceOptions.add(new navbar_template());
deviceOptions.add(new BackButton4Template({}));
deviceOptions.add(machineName);
deviceOptions.add(machPic);

deviceOptions.add(new HelpButtonTemplate({textForLabel:"Contact Owner"}));
var useButton = new UseButtonTemplate({textForLabel:"Use This Machine"});
deviceOptions.add(useButton);
deviceOptions.add(modelNumber);


//PAYMENT 1 SCREEN
var keyboardTemplate = Container.template(function($) { return {
  left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, active: true,
  behavior: Object.create(Container.prototype, {
    onTouchEnded: { value: function(content){
      KEYBOARD.hide();
      content.focus();
    }}
  })
}});

var paymentScreen = new keyboardTemplate;


//CONTACT OWNER PAGE
var contactOwnerScreen = new keyboardTemplate;


//FIELD INIT
var field = new MyField({ name: "" });


//PAYMENT 1 SCREEN INIT
paymentScreen.add(new navbar_template());
paymentScreen.add(new Label({top:5, height:55, string:"Transaction",style:machineTitleStyle}));
paymentScreen.add(new Label({left:85, right:0, top:60, height:55, string:"Payment Amount",style:lightTealText}));
paymentScreen.add(new Label({left:85, right:0, top:150, height:55, string:"Payment Method",style:lightTealText}));
paymentScreen.add(field);
paymentScreen.add(SendPayButtonTemplate);
paymentScreen.add(new BackButton5Template({}));

var menuHolder = new Container({left:32, right:32, top:200, bottom:220, skin: grayskin});
var menuHolder2 = new Container({left:32, right:262, top:200, bottom:220, skin: redSkin});
var MyMenuButton = TOOL.MenuButton.template(function($) { return { left: 30, top: 205, }});

var standardsMenuData = {
			action: "/selectStandard?standard=",
			items: [
				{ title: "Visa ***0302", value: "Visa ***0302" },
				{ title: "MasterCard ***9999", value: "MasterCard ***9999" },
				{ title: "AMER EXP ***0000", value: "AMER EXP ***0000" },
				{ title: "Xchange Credits ($0.00)", value: "Xchange Credits ($0.00)" },
				
			],
			selection: 0,
		};
		
Handler.bind("/selectStandard", Object.create(MODEL.CommandBehavior.prototype, {
//@line 56
	onQuery: { value: function(handler, query) {
				var selection = query.standard;
				//trace( "\n selected: " + selection );
				asdf.string = "Paid with: " + selection;
				
			}}
}));
		

var menuButton = new MyMenuButton( standardsMenuData );  
paymentScreen.add(menuHolder); 
paymentScreen.add(menuHolder2); 
paymentScreen.add( menuButton );


//FEEDBACK CONTAINER
var field2 = new feedbackText({ name: "" });


//CONTACT OWNER AND FEEDBACK INIT
contactOwnerScreen.add(new navbar_template());
feedbackButton = new SendFeedbackButtonTemplate({textForLabel:"Send"});
contactOwnerScreen.add(feedbackButton);
contactOwnerScreen.add(field2);

contactOwnerScreen.add(new BackButton6Template({}));

contactOwnerScreen.add(new Label({left:70, right:0, top:5, height:55, string:"Contact Owner", style:machineTitleStyle}));


//RECEIPT MAIN CONTAINER
var receiptContainer = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin,
	contents: [new Container({left:10, right:10, top:70, bottom:150, skin:redSkin,
		contents: [new Label({right:10, top:90, height:55, string:"May 7th, 2015", style:titleScreenButtonStyle}),
				   new Label({left:10, top:90, height:55, string:"Washy's Wash", style:titleScreenButtonStyle})]
	})]
});
var receiptMachineName = new Label({left:20, top:185, height:55, string:"RECEIPT", style:sidebarText});
var typeLabel = new Label({top:230, height:55, string:"Type: Laundry Machine", style:sidebarText});
var deviceIDLabel = new Label({top:250, height:55, string:"Serial #:‎ MHWC7500YW", style:sidebarText});
var totalLabel = new Label({top:65, height:55, string:"$", style:receiptTotal});
var afterReceiptButton = new ReceiptToMenuTemplate({textForLabel:"Return to Devices"});

//RECEIPT INIT
receiptContainer.add(new navbar_template());
receiptContainer.add(new Label({top:5, height:55, string:"#40003256",style:machineTitleStyle}));
receiptContainer.add(receiptMachineName);
receiptContainer.add(typeLabel);
receiptContainer.add(deviceIDLabel);
var asdf = new Label({top:100, height:55, string:"Paid with: Visa ***0302", style:sidebarText})
receiptContainer.add(asdf);
receiptContainer.add(totalLabel);
receiptContainer.add(afterReceiptButton);


/* *********   LAUNCH AND DEVICE STUFF   ********* */
/* *********   LAUNCH AND DEVICE STUFF   ********* */
/* *********   LAUNCH AND DEVICE STUFF   ********* */


//FINDING SIMULATOR ONLAUNCH
var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("devicesimulator");
		application.behavior = new MODEL.ApplicationBehavior(application);
	},
	onQuit: function(application) {
		application.forget("devicesimulator");
	},
})

//USED TO CALL INVOKE
deviceURL = ""; 

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));


//APPLICATION INITIAL SET UP
application.behavior = new ApplicationBehavior();
application.add(mainContainer);


//PAYMENT CONFIRMATION POPUP
var memoField = new memoText({ name: "" });


//NEW ALEX STUFF

//PROFILE STUFF

var ranks = ["Casual Shopper", "Big Spender", "King of the Coins"];
var rewardPoints = 0;

var profileContainer = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin});
var rankLabel = new Label({right:10, top:230, height:55, string:ranks[0], style:mediumText});
var pointsLabel = new Label({right:10, top:260, height:55, string:rewardPoints, style:mediumText});
var currentBadge = new Picture({top:85,url:"casual_shopper.jpg"});

profileContainer.add(currentBadge);
profileContainer.add(new navbar_template());
profileContainer.add(new Label({left:10, top:200, height:55, string:"Display Name", style:lightTealText}));
profileContainer.add(new Label({right:10, top:200, height:55, string:"Oski Bear", style:mediumText}));
profileContainer.add(new Label({left:10, top:230, height:55, string:"XChange Rank", style:lightTealText}));
profileContainer.add(rankLabel);
profileContainer.add(new Label({left:10, top:260, height:55, string:"Reward Points", style:lightTealText}));
profileContainer.add(pointsLabel);
profileContainer.add(new Label({left:10, top:290, height:55, string:"Favorite Machine", style:lightTealText}));
profileContainer.add(new Label({right:10, top:290, height:55, string:"Vending #2", style:mediumText}));
profileContainer.add(new Label({top:5, height:55, string:"My Profile",style:machineTitleStyle}));

//GIFT SCREEN
var giftScreen = new keyboardTemplate;
giftScreen.add(new navbar_template());
giftScreen.add(new Label({top:5, height:55, string:"Give A Gift",style:machineTitleStyle}));
giftScreen.add(new Label({top:60, height:55, string:"Gift Amount",style:lightTealText}));
giftScreen.add(new Label({top:150, height:55, string:"Recipient",style:lightTealText}));
giftScreen.add(new Label({left:65, right:0, top:260, height:55, string:"Friends found via ",style:lightTealText}));
giftScreen.add(new Picture({top:255, right:40, url:"fb_logo.png"}));


var giftMenuHolder = new Container({left:32, right:32, top:200, bottom:220, skin: grayskin});
var giftMenuHolder2 = new Container({left:32, right:262, top:200, bottom:220, skin: redSkin});
var MyGiftMenuButton = TOOL.MenuButton.template(function($) { return { left: 30, top: 205, }});

var friendsMenuData = {
			action: "/selectStandard2?standard=",
			items: [
				{ title: "Alex McLean", value: "Alex McLean" },
				{ title: "Spencer Axelrod", value: "Spencer Axelrod" },
				{ title: "Michelle Ling", value: "Michelle Ling" },
				{ title: "Stephanie Lin", value: "Stephanie Lin" },
				{ title: "Grzegorz Such", value: "Grzegorz Such" }
			],
			selection: 0,
		};
		
Handler.bind("/selectStandard2", Object.create(MODEL.CommandBehavior.prototype, {
//@line 56
	onQuery: { value: function(handler, query) {
				var selection = query.standard;
				//trace( "\n selected: " + selection );
				giftRec = selection;
				
			}}
}));

var friendsMenuButton = new MyGiftMenuButton( friendsMenuData );  
giftScreen.add(giftMenuHolder); 
giftScreen.add(giftMenuHolder2); 
giftScreen.add( friendsMenuButton );
giftScreen.add(new MyGiftField({name:""}));
giftScreen.add(new SendGiftButtonTemplate({textForLabel:"Send Gift"}));

/*
//SETTINGS SCREEN
var settingsScreen = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin});
settingsScreen.add(new navbar_template());
settingsScreen.add(new Label({top:5, height:55, string:"Settings",style:machineTitleStyle}));

settingsScreen.add(new Picture({top:90, right:60, url:"payment_history.jpg"}));
settingsScreen.add(new Picture({top:190, right:60, url:"payment_options.jpg"}));
settingsScreen.add(new Picture({top:290, right:60, url:"about.jpg"}));
settingsScreen.add(new Picture({top:90, left: 60, url:"support.jpg"}));
settingsScreen.add(new Picture({top:190, left: 60, url:"personal_info.jpg"}));
settingsScreen.add(new Picture({top:290, left: 60, url:"delete_account.jpg"}));

settingsScreen.add(new Label({top:150, right: 55, string:"Pay History", style: settingsTealText}));
settingsScreen.add(new Label({top:150, left: 65, string:"Support", style: settingsTealText}));
settingsScreen.add(new Label({top:250, right: 50, string:"Pay Options", style: settingsTealText}));
settingsScreen.add(new Label({top:250, left: 45, string:"Personal Info", style: settingsTealText}));
settingsScreen.add(new Label({top:350, right: 70, string:"About", style: settingsTealText}));
settingsScreen.add(new Label({top:350, left: 40, string:"Delete Account", style: settingsTealText}));*/

//BOTTOM NAV

var ConnectButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:15, left:10, right:240, skin:new Skin({width:40, height:40, texture:new Texture("token_icon.jpg"), fill:"black"}),
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
  		nextScreen(screenNowFocused, nearDevs);
    }}
  })
}});

var ProfileButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:15, left:135, right:60, skin:new Skin({width:40, height:40, texture:new Texture("prof_icon.jpg"), fill:"black"}),
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
  		nextScreen(screenNowFocused, profileContainer);
    }}
  })
}});

var PresentButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:15, left:85, right:165, skin:new Skin({width:40, height:40, texture:new Texture("present_icon.jpg"), fill:"black"}),
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
  		nextScreen(screenNowFocused, giftScreen);
    }}
  })
}});



var SettingButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:15, left:230, right:10, skin:new Skin({width:40, height:40, texture:new Texture("setting_icon.jpg"), fill:"black"}),
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
  		nextScreen(screenNowFocused, settings.settingsScreen);
    }}
  })
}});

//ADD ALL NECESSARY BOTTOM NAVBARS
var bottomNavbar = Container.template(function($){ return{left:0, right:0, top:390, bottom:0, skin: tealSkin,
	contents: [
		new ConnectButtonTemplate(),
		new ProfileButtonTemplate(),
		new PresentButtonTemplate(),
		new SettingButtonTemplate()
	]}});
	
var settings = require("SETTINGS.js");
	
deviceOptions.add(new bottomNavbar());
paymentScreen.add(new bottomNavbar());
profileContainer.add(new bottomNavbar());
nearDevs.add(new bottomNavbar());
giftScreen.add(new bottomNavbar());
