// KPR Script file
//SETTINGS SCREEN
exports.settingsScreen = new Container({left:0, right:0, top:0, bottom:0, skin: whiteSkin, contents: [ new bottomNavbar()] });

var settingsScreen = exports.settingsScreen


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
settingsScreen.add(new Label({top:350, left: 40, string:"Delete Account", style: settingsTealText}));

var sb = BUTTONS.Button.template(function($){ return{
  skin: $.skin,
  contents:[],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      	nextScreen(qrContainer, nearDevs);
    }}
  })
}});