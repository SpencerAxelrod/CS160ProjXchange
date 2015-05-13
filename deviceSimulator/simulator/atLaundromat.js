//@module

var PinsSimulators = require ("PinsSimulators");

exports.pins = {
	// Define the types of pins used by this BLL
	availableDevices: {type: "A2D"}
}

exports.configure = function() {
	// Initialize each of the BLL objects by calling their init function
		this.pinsSimulator = shell.delegate("addSimulatorPart", {
		header : { 
			label : "At Laundromat", 
			name : "Room Input", 
			iconVariant : PinsSimulators.SENSOR_LED
		},
		axes : [
			new PinsSimulators.AnalogInputAxisDescription(
				{
					ioType : "input",
					dataType : "boolean",
					valueLabel : "Near Washing Machines:",
					valueID : "laundryRoom",
					value: 1,
                    defaultControl: PinsSimulators.BUTTON
				}
			),
		]
	});
}

exports.close = function() {
	// Close the objects used to communicate with the pins
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}

exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes.laundryRoom;				
};

