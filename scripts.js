// Incrementalism
// An incremental browser game for the Code Louisville September 2017 Front-End class.
// by Chris Akridge.

// ==== Helper Functions ====
var numberNames = ['billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion'];

function beautify(number, places = 3) {
	// Numbers less than 1 billion
	var numberText;
	if (number < 1e9) {
		numberText = number.toLocaleString('en-US', {maximumFractionDigits: places});
	} else if (number < 1e42) {
		var powerOf10 = Math.log10(number);
		var powerOf1000 = Math.floor(powerOf10 / 3);
		var numberNameIndex = (powerOf1000 - 3);
		var mantissa = number / Math.pow(1000, powerOf1000);

		numberText = mantissa.toFixed(3) + " " + numberNames[numberNameIndex];
	} else if (Number.isNaN(number)) {
		numberText = "Not-a-Number :(";
	} else if (!Number.isFinite(number)) { numberText = number.toString(); } else {
		var powerOf10 = Math.floor(Math.log10(number));
		numberText = (number / Math.pow(10, powerOf10)).toFixed(3) + "e" + powerOf10;
	}
	return numberText;
}

function percent(number, places = 2) {
	if (Number.isNaN(number)) { return "N/A"; }
	return (number * 100).toLocaleString('en-US', {maximumFractionDigits: places}) + "%";
}

function timeDisplay(seconds) {
	var minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;

	var secondsText = (seconds < 10) ? '0' + seconds : seconds;
	return minutes + ':' + secondsText;
}

function getUnixNowMS() {
	// https://stackoverflow.com/a/9575869/2709212
	return (new Date()).getTime();
}

// ==== Define Items, Upgrades, and Achievements ====

var phasesUnlocked = [true, false, false];

var items = [];
var upgrades = [];
var achievements = [];

// ==== Items ====
// Phase 1
var hdmiCables = {
	name: "HDMI Cables",
	phase: 1,
	cost: 10,
	baseRate: 0.1,
	rate: 0.1,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(14); }
		if (this.owned >= 10) { unlockAchievement(15); }
		if (this.owned >= 50) { unlockAchievement(16); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(hdmiCables);

var whiteboardWall = {
	name: "Whiteboard Wall",
	phase: 1,
	cost: 125,
	baseRate: 2,
	rate: 2,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(17); }
		if (this.owned >= 10) { unlockAchievement(18); }
		if (this.owned >= 50) { unlockAchievement(19); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(whiteboardWall);

var smartBoard = {
	name: "SMART Board",
	phase: 1,
	cost: 375,
	baseRate: 8,
	rate: 8,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(20); }
		if (this.owned >= 10) { unlockAchievement(21); }
		if (this.owned >= 50) { unlockAchievement(22); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(smartBoard);

var lightingDeck = {
	name: "Lighting Deck",
	phase: 1,
	cost: 1250,
	baseRate: 17.5,
	rate: 17.5,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(23); }
		if (this.owned >= 10) { unlockAchievement(24); }
		if (this.owned >= 50) { unlockAchievement(25); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(lightingDeck);

// Phase 2
var wioaPaperwork = {
	name: "WIOA Paperwork",
	phase: 2,
	cost: 14000,
	baseRate: 35,
	rate: 35,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		standUpGuide.checkRate();
		updateItemInfo(6 /* Stand-up Guide */)

		if (this.owned >= 1) { unlockAchievement(38); }
		if (this.owned >= 10) { unlockAchievement(39); }
		if (this.owned >= 50) { unlockAchievement(40); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(wioaPaperwork);

var orientationPresentation = {
	name: "Orientation Presentation",
	phase: 2,
	cost: 85000,
	baseRate: 75,
	rate: 75,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(41); }
		if (this.owned >= 10) { unlockAchievement(42); }
		if (this.owned >= 50) { unlockAchievement(43); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(orientationPresentation);

var standUpGuide = {
	name: "Stand-up Guide",
	phase: 2,
	cost: 190000,
	baseRate: 140,
	rate: 140,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(44); }
		if (this.owned >= 10) { unlockAchievement(45); }
		if (this.owned >= 50) { unlockAchievement(46); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(standUpGuide);

var frontEndClassProject = {
	name: "Front-end Class Project",
	phase: 2,
	cost: 485000,
	baseRate: 325,
	rate: 325,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		lightingDeck.checkRate();
		updateItemInfo(3 /* Lighting Deck */);

		if (this.owned >= 1) { unlockAchievement(47); }
		if (this.owned >= 10) { unlockAchievement(48); }
		if (this.owned >= 50) { unlockAchievement(49); }
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(frontEndClassProject);

// Phase 3
var treehouseCourses = {
	name: "Treehouse Courses",
	phase: 3,
	cost: 2.25e6,
	baseRate: 1090,
	rate: 1090,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(treehouseCourses);

var githubAccount = {
	name: "GitHub Account",
	phase: 3,
	cost: 11.85e6,
	baseRate: 4320,
	rate: 4320,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(githubAccount);

var techEvents = {
	name: "Tech Events",
	phase: 3,
	cost: 62.81e6,
	baseRate: 8900,
	rate: 8900,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;
	}
};
items.push(techEvents);

var finalProject = {
	name: "Final Project",
	phase: 3,
	cost: 489.275e6,
	baseRate: 64250,
	rate: 64250,
	synergyPower: 0,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
	},
	checkRate: function() {
		this.rate = this.baseRate * (1 + this.synergyPower);
		this.totalRate = this.owned * this.rate;

		if (readme.bought) {
			var otherItemsOwned = totalItemsOwned - this.owned;
			this.synergyPower = 0.001 * otherItemsOwned;
		}
	}
};
items.push(finalProject);

var itemsByPhase = [[], [], []];
for (var i in items) {
	var phase = Math.floor(i / 4);
	itemsByPhase[phase].push(items[i]);
}

/* ==== Upgrades ==== */
// Phase 1
var touchpad = {
	name: "Touchpad",
	desc: "Your clicking power is doubled.",
	phase: 1,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 25;
	},
	unlocked: false,
	cost: 40,
	bought: false,
	onBuy: function() {
		baseClickPower *= 2;
		recalcUnitsPerClick();
	}
};
upgrades.push(touchpad);

var woodenCubeMouse = {
	name: "Wooden Cube Mouse",
	desc: "Clicking gains +10% of your rate.",
	phase: 1,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 175;
	},
	unlocked: false,
	cost: 200,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.1;
		recalcUnitsPerClick();
	}
};
upgrades.push(woodenCubeMouse);

var microsoftIntellimouse = {
	name: "Microsoft IntelliMouse",
	desc: "Clicking gains +20% of your rate.",
	phase: 1,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 500;
	},
	unlocked: false,
	cost: 2950,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.2;
		recalcUnitsPerClick();
	}
};
upgrades.push(microsoftIntellimouse);

var fourKVideoSupport = {
	name: "4K Video Support",
	desc: "HDMI Cables produce 20% more for each Whiteboard Wall you own. Whiteboard Walls produce 1% more for each HDMI cable you own.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 140;
	},
	unlocked: false,
	cost: 180,
	bought: false,
	onBuy: function() {
		synergyUpgrades[0].enabled = true;
		synergyUpgrades[1].enabled = true;

		initialCheckSynergy(whiteboardWall, 0);
		initialCheckSynergy(hdmiCables, 1);

		recalculateRate();
	}
};
upgrades.push(fourKVideoSupport);

var rainbowMarkers = {
	name: "Rainbow Markers",
	desc: "SMART Boards are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 750;
	},
	unlocked: false,
	cost: 1250,
	bought: false,
	onBuy: function() {
		smartBoard.cost *= 0.75;
		updateItemInfo(2 /* SMART Boards */)
	}
};
upgrades.push(rainbowMarkers);

var dedicatedSpeakers = {
	name: "Dedicated Speakers",
	desc: "HDMI Cables produce double the units.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 1750;
	},
	unlocked: false,
	cost: 3750,
	bought: false,
	onBuy: function() {
		hdmiCables.baseRate = 0.2;
		hdmiCables.checkRate();
		recalculateRate();
		updateItemInfo(0 /* HDMI Cables */);
	}
};
upgrades.push(dedicatedSpeakers);

var gratedLightFixture = {
	name: "Grated Light Fixture",
	desc: "HDMI Cables are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 1875;
	},
	unlocked: false,
	cost: 2500,
	bought: false,
	onBuy: function() {
		hdmiCables.cost *= 0.75;
		updateItemInfo(0 /* HDMI Cables */);
	}
};
upgrades.push(gratedLightFixture);

var mentorsAssistance = {
	name: "Mentor's Assistance",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 2020;
	},
	unlocked: false,
	cost: 5100,
	bought: false,
	onBuy: function() {
		multiplier *= 2;
		for (var i in items) { updateItemInfo(i); }
	}
};
upgrades.push(mentorsAssistance);

var completeClassroom = {
	name: "Complete Classroom",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		// 20 HDMI Cables, 8 Whiteboard Walls, 1 SMART Board, 8 Lighting Fixtures
		return hdmiCables.owned >= 20 &&
			   whiteboardWall.owned >= 8 &&
			   smartBoard.owned >= 1 &&
			   lightingDeck.owned >= 8;
	},
	unlocked: false,
	cost: 15000,
	bought: false,
	onBuy: function() {
		multiplier *= 2;
		for (var i in items) { updateItemInfo(i); }

		// Complete Phase 1!
		phasesUnlocked[1] = true;
		$("#stars").css('display', 'flex');
		$("#phase-1-star").show();
		$("#phase-1-special").css('display', 'flex');
		$("#phase-2-items").css('display', 'flex');
		$("#phase-2-items").css('flex-direction', 'column');
		unlockAchievement(29);
	}
};
upgrades.push(completeClassroom);

// Phase 2

var opticalWirelessMouse = {
	name: 'Optical Wireless Mouse',
	desc: 'Clicking gains another +10% of your rate.',
	phase: 2,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 25000;
	},
	unlocked: false,
	cost: 89500,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.1;
		recalcUnitsPerClick();
	}
};
upgrades.push(opticalWirelessMouse);

var logitechBluetoothMouse = {
	name: 'Logitech Bluetooth Mouse',
	desc: 'Clicking gains another +15% of your rate.',
	phase: 2,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 400000;
	},
	unlocked: false,
	cost: 455000,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.15;
		recalcUnitsPerClick();
	}
};
upgrades.push(logitechBluetoothMouse);

var miniatureTravelMouse = {
	name: 'Miniature Travel Mouse',
	desc: 'Clicking gains another +25% of your rate.',
	phase: 2,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 1.2e6;
	},
	unlocked: false,
	cost: 9.55e6,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.25;
		recalcUnitsPerClick();
	}
};
upgrades.push(miniatureTravelMouse);

var enrollmentParking = {
	name: 'Enrollment Parking',
	desc: 'Stand-Up Guides get +1% for every WIOA Paperwork you own. HDMI Cables gain +200% for every Stand-Up Guide you own.',
	phase: 2,
	checkUnlock: function() {
		return bank >= 11000;
	},
	unlocked: false,
	cost: 28800,
	bought: false,
	onBuy: function() {
		synergyUpgrades[2].enabled = true;
		synergyUpgrades[3].enabled = true;

		initialCheckSynergy(wioaPaperwork, 2);
		initialCheckSynergy(standUpGuide, 3);

		recalculateRate();
	}
};
upgrades.push(enrollmentParking);

var libraryCard = {
	name: 'Library Card',
	desc: 'Front-End Class Projects are 30% cheaper.',
	phase: 2,
	checkUnlock: function() {
		return bank >= 100000;
	},
	unlocked: false,
	cost: 195000,
	bought: false,
	onBuy: function() {
		frontEndClassProject.cost *= 0.7;
		updateItemInfo(7 /* Front-End Class Projects */);
	}
};
upgrades.push(libraryCard);

var conciseExplanation = {
	name: 'Concise Explanation',
	desc: 'Orientation Presentations produce double the units.',
	phase: 2,
	checkUnlock: function() {
		return bank >= 225000;
	},
	unlocked: false,
	cost: 195000,
	bought: false,
	onBuy: function() {
		orientationPresentation.baseRate *= 2;
		orientationPresentation.checkRate();
		updateItemInfo(5 /* Orientation Presentations */);
	}
};
upgrades.push(conciseExplanation);

var videoCommunicationsCenter = {
	name: 'Video Communications Center',
	desc: 'WIOA Paperworks gain +5% for every Stand-Up Guide. Lighting Decks gain +10% for every Front-End Class Project.',
	phase: 2,
	checkUnlock: function() {
		return bank >= 450000;
	},
	unlocked: false,
	cost: 985000,
	bought: false,
	onBuy: function() {
		synergyUpgrades[4].enabled = true;
		synergyUpgrades[5].enabled = true;

		initialCheckSynergy(standUpGuide, 4);
		initialCheckSynergy(frontEndClassProject, 5);
	}
};
upgrades.push(videoCommunicationsCenter);

var weeklyMeeting = {
	name: 'Weekly Meeting',
	desc: 'All income is tripled.',
	phase: 2,
	checkUnlock: function() {
		for (var i = 0; i < upgrades.length; i++) {
			if (upgrades[i].phase === 2 && upgrades[i].name !== 'Start the Courses!' && upgrades[i].name !== 'Weekly Meeting') {
				if (!upgrades[i].bought) { return false; }
			}
		}
		return true;
	},
	unlocked: false,
	cost: 1e6,
	bought: false,
	onBuy: function() {
		multiplier *= 3;
	}
};
upgrades.push(weeklyMeeting);

var startTheCourses = {
	name: 'Start the Courses!',
	desc: 'All income is tripled!',
	phase: 2,
	checkUnlock: function() {
		return (wioaPaperwork.owned >= 10) &&
			   (orientationPresentation.owned >= 1) &&
			   (standUpGuide.owned >= 4) &&
			   (frontEndClassProject.owned >= 1);
	},
	unlocked: false,
	cost: 10e6,
	onBuy: function() {
		multiplier *= 3;

		/* Phase II is completed! */
		phasesUnlocked[2] = true;
		unlockAchievement(53);
		$("#stars").css('display', 'flex');
		$("#phase-2-star").show();
		$("#phase-3-items").css('display', 'flex');
		$("#phase-3-items").css('flex-direction', 'column');

		$("#powerup-timer").show();
		startUnlockTimer();
	}
};
upgrades.push(startTheCourses);

// Phase 3

var trackballMouse = {
	name: 'Trackball Mouse',
	desc: 'Clicking gains another +10% of your rate.',
	phase: 3,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 360e6;
	},
	unlocked: false,
	cost: 420e6,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.1;
		recalcUnitsPerClick();
	}
}
upgrades.push(trackballMouse);

var multitouchScreen = {
	name: 'Multi-Touch Screen',
	desc: 'Clicking gains the last +10% of your rate.',
	phase: 3,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 10.8e9;
	},
	unlocked: false,
	cost: 168e9,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.1;
		recalcUnitsPerClick();
	}
}
upgrades.push(multitouchScreen);

var speedControls = {
	name: 'Speed Controls',
	desc: 'Tech Events get +1% for every Treehouse Course you own. Treehouse Courses get +5% for every Tech Event you own.',
	phase: 3,
	checkUnlock: function() {
		return bank >= 1e6;
	},
	unlocked: false,
	cost: 10e6,
	bought: false,
	onBuy: function() {
		synergyUpgrades[6].enabled = true;
		synergyUpgrades[7].enabled = true;

		initialCheckSynergy(treehouseCourses, 6);
		initialCheckSynergy(techEvents, 7);
	}
}
upgrades.push(speedControls);

var pullRequests = {
	name: 'Pull Requests',
	desc: 'GitHub Accounts get +0.1% for every HDMI Cable owned. HDMI Cables get +400% for every GitHub Account owned.',
	phase: 3,
	checkUnlock: function() {
		return speedControls.bought;
	},
	unlocked: false,
	cost: 10e9,
	bought: false,
	onBuy: function() {
		synergyUpgrades[8].enabled = true;
		synergyUpgrades[9].enabled = true;

		initialCheckSynergy(hdmiCables, 8);
		initialCheckSynergy(githubAccount, 9);
	}
}
upgrades.push(pullRequests);

var hackathon = {
	name: 'Hackathon',
	desc: 'Tech Events get +2% for every WIOA Paperwork you own. WIOA Paperworks get +50% for every Tech Event you own.',
	phase: 3,
	checkUnlock: function() {
		return pullRequests.bought;
	},
	unlocked: false,
	cost: 10e12,
	bought: false,
	onBuy: function() {
		synergyUpgrades[10].enabled = true;
		synergyUpgrades[11].enabled = true;

		initialCheckSynergy(wioaPaperwork, 10);
		initialCheckSynergy(techEvents, 11);
	}
}
upgrades.push(hackathon);

var readme = {
	name: 'README.md',
	desc: 'Final Projects get +0.01% for every other item owned.',
	phase: 3,
	checkUnlock: function() {
		return hackathon.bought;
	},
	unlocked: false,
	cost: 10e15,
	bought: false,
	onBuy: function() {
		updateItemInfo(11 /* Final Project */);
	}
}
upgrades.push(readme);

var storeLoyaltyCard = {
	name: 'Store Loyalty Card',
	desc: 'Each mentor now reduces item prices by 5%.',
	phase: 3,
	checkUnlock: function() {
		return readme.bought;
	},
	unlocked: false,
	cost: 10e18,
	bought: false,
	onBuy: function() {
		var totalMentorDiscount = Math.pow(0.99, mentors.owned);
		var newMentorDiscount = Math.pow(0.95, mentors.owned);
		mentors.discountPower = 0.05;

		for (var i in items) {
			items[i].cost *= (1 / totalMentorDiscount);
			items[i].cost *= newMentorDiscount;
			updateItemInfo(i);
		}

		$("#mentor-info").text('Bring in a Mentor (-5% to all item prices)');
	}
}
upgrades.push(storeLoyaltyCard);

var exponentialGrowth = {
	name: 'Exponential Growth',
	desc: 'Each students now increases the rate by 5%.',
	phase: 3,
	checkUnlock: function() {
		return storeLoyaltyCard.bought;
	},
	unlocked: false,
	cost: 10e21,
	bought: false,
	onBuy: function() {
		students.exponentialGrowthBought();
	}
}
upgrades.push(exponentialGrowth);

var responsiveDesign = {
	name: 'Responsive Design',
	desc: 'The next powerups only take 3:00 to charge and last for 2:45.',
	phase: 3,
	checkUnlock: function() {
		return exponentialGrowth.bought;
	},
	unlocked: false,
	cost: 10e24,
	bought: false,
	onBuy: function() {
		msToUnlock = 180000;
		powerupLengthMs = 165000;
	}
}
upgrades.push(responsiveDesign);

var marketStreet = {
	name: 'Market Street',
	desc: 'All income is tripled.',
	phase: 3,
	checkUnlock: function() {
		return responsiveDesign.bought;
	},
	unlocked: false,
	cost: 10e27,
	bought: false,
	onBuy: function() {
		multiplier *= 3;
		for (var i in items) {
			updateItemInfo(i);
		}
	}
}
upgrades.push(marketStreet);

var pleaseAndThankYou = {
	name: 'Please and Thank You',
	desc: 'All income is quadrupled.',
	phase: 3,
	checkUnlock: function() {
		return marketStreet.bought;
	},
	unlocked: false,
	cost: 10e27,
	bought: false,
	onBuy: function() {
		multiplier *= 4;
		for (var i in items) {
			updateItemInfo(i);
		}
	}
}
upgrades.push(pleaseAndThankYou);

var codeLouisville = {
	name: 'Code Louisville',
	desc: 'All income is multiplied by 10. All prices cut by 99.9999%.',
	phase: 3,
	checkUnlock: function() {
		return pleaseAndThankYou.bought;
	},
	unlocked: false,
	cost: 10e33,
	bought: false,
	onBuy: function() {
		multiplier *= 10;
		for (var i in items) {
			items[i].cost *= 0.000001;
			updateItemInfo(i);
		}

		/* Phase III and the game is completed! */
		// unlockAchievement(53);
		$("#phase-3-star").show();
		// Show a modal box saying that you won
	}
}
upgrades.push(codeLouisville);

upgrades.sort(function(a, b) { return a.cost - b.cost; });

var upgradesByPhase = [[], [], []];
for (var i in upgrades) {
	upgradesByPhase[upgrades[i].phase - 1].push(upgrades[i]);
}

// ==== Achievements ====
// Phase 1
achievements.push({name: "A Thought", desc: "Earn 1 unit.", unlocked: false}); // 0
achievements.push({name: "An Idea", desc: "Earn 10 units.", unlocked: false}); // 1
achievements.push({name: "Research", desc: "Earn 100 units.", unlocked: false}); // 2
achievements.push({name: "Team-building", desc: "Earn 1,000 units.", unlocked: false}); // 3
achievements.push({name: "Office Purchase", desc: "Earn 10,000 units.", unlocked: false}); // 4
achievements.push({name: "Earn It", desc: "Click for 1 unit.", unlocked: false}); // 5
achievements.push({name: ".click()", desc: "Click for 10 units.", unlocked: false}); // 6
achievements.push({name: "Mouse-Up", desc: "Click for 100 units.", unlocked: false}); // 7
achievements.push({name: "Callbacks", desc: "Click for 1,000 units.", unlocked: false}); // 8
achievements.push({name: "Penny Stocks", desc: "Reach a rate of 0.1 units/second.", unlocked: false}); // 9
achievements.push({name: "Low-Yield Bonds", desc: "Reach a rate of 1 unit/second.", unlocked: false}); // 10
achievements.push({name: "Inflow", desc: "Reach a rate of 10 units/second.", unlocked: false}); // 11
achievements.push({name: "Income", desc: "Reach a rate of 100 units/second.", unlocked: false}); // 12
achievements.push({name: "Interest", desc: "Reach a rate of 1,000 units/second.", unlocked: false}); // 13
achievements.push({name: 'Unified Media Transport', desc: 'Buy 1 HDMI Cable.', unlocked: false}); // 14
achievements.push({name: '19 Pins', desc: 'Buy 10 HDMI Cables.', unlocked: false}); // 15
achievements.push({name: '2160p60', desc: 'Buy 50 HDMI Cables.', unlocked: false}); // 16
achievements.push({name: 'Dry-Erase', desc: 'Buy 1 Whiteboard Wall.', unlocked: false}); // 17
achievements.push({name: 'Glossy Acrylic', desc: 'Buy 10 Whiteboard Walls.', unlocked: false}); // 18
achievements.push({name: 'Heit\'s Legacy', desc: 'Buy 50 Whiteboard Walls.', unlocked: false}); // 19
achievements.push({name: 'Interactivity', desc: 'Buy 1 SMART Board.', unlocked: false}); // 20
achievements.push({name: 'Wireless Learning', desc: 'Buy 10 SMART Boards.', unlocked: false}); // 21
achievements.push({name: 'Integrated Tech', desc: 'Buy 50 SMART Boards.', unlocked: false}); // 22
achievements.push({name: 'Candela', desc: 'Buy 1 Lighting Deck.', unlocked: false}); // 23
achievements.push({name: 'Lux', desc: 'Buy 10 Lighting Decks.', unlocked: false}); // 24
achievements.push({name: 'Lumen', desc: 'Buy 50 Lighting Decks.', unlocked: false}); // 25
achievements.push({name: 'Shop Around', desc: 'Buy 1 of every Phase I item.', unlocked: false}); // 26
achievements.push({name: 'Quality Brand', desc: 'Buy 10 of every Phase I item.', unlocked: false}); // 27
achievements.push({name: 'Preferred Shopper', desc: 'Buy 50 of every Phase I item.', unlocked: false}); // 28
achievements.push({name: 'The Start of It All', desc: 'Buy "Complete Classroom".', unlocked: false}); // 29

// Phase 2
achievements.push({name: 'Word-of-Mouth', desc: 'Earn 100,000 units.', unlocked: false}); // 30
achievements.push({name: 'Visit Our Website', desc: 'Earn 1,000,000 units.', unlocked: false}); // 31
achievements.push({name: 'Waiting List', desc: 'Earn 10,000,000 units.', unlocked: false}); // 32
achievements.push({name: 'Pre-Work', desc: 'Earn 100,000,000 units.', unlocked: false}); // 33
achievements.push({name: 'Orientation', desc: 'Earn 1 billion units.', unlocked: false}); // 34
achievements.push({name: 'Dividends', desc: 'Reach a rate of 10,000 units/second.', unlocked: false}); // 35
achievements.push({name: 'Capital Gains', desc: 'Reach a rate of 100,000 units/second.', unlocked: false}); // 36
achievements.push({name: 'Certificate of Deposit', desc: 'Reach a rate of 1,000,000 units/second.', unlocked: false}); // 37
achievements.push({name: 'Sign Here, Please', desc: 'Own 1 WIOA Paperwork.', unlocked: false}); // 38
achievements.push({name: 'Legal Procedure', desc: 'Own 10 WIOA Paperworks.', unlocked: false}); // 39
achievements.push({name: 'Read Carefully', desc: 'Own 50 WIOA Paperworks.', unlocked: false}); // 40
achievements.push({name: 'Welcome to the Library', desc: 'Own 1 Orientation Presentation.', unlocked: false}); // 41
achievements.push({name: 'The Conference Hall', desc: 'Own 10 Orientation Presentations.', unlocked: false}); // 42
achievements.push({name: 'Welcome to the Program', desc: 'Own 50 Orientation Presentations.', unlocked: false}); // 43
achievements.push({name: 'What are You Working On?', desc: 'Own 1 Stand-Up Guide.', unlocked: false}); // 44
achievements.push({name: 'Are You Stuck on Anything?', desc: 'Own 10 Stand-Up Guides.', unlocked: false}); // 45
achievements.push({name: 'What is Your Plan for the Week?', desc: 'Own 50 Stand-Up Guides.', unlocked: false}); // 46
achievements.push({name: 'The GitHub Repository', desc: 'Own 1 Front-end Class Project.', unlocked: false}); // 47
achievements.push({name: 'First Commit', desc: 'Own 10 Front-end Class Projects.', unlocked: false}); // 48
achievements.push({name: 'The Work for the Meetings', desc: 'Own 50 Front-end Class Projects.', unlocked: false}); // 49
achievements.push({name: 'The Student\'s Path', desc: 'Own 1 of every Phase II Item.', unlocked: false}); // 50
achievements.push({name: 'Proper Direction', desc: 'Own 10 of every Phase II Item.', unlocked: false}); // 51
achievements.push({name: 'Ready for the Course', desc: 'Own 50 of every Phase II Item.', unlocked: false}); // 52
achievements.push({name: 'Everything\'s Ready', desc: 'Buy "Start the Courses!"', unlocked: false}); // 53

// ==== Phase 1 Specials ====
var mentors = {
	cost: 100,
	priceMultiplier: 1.5,
	discountPower: 0.01,
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		for (var i in items) {
			items[i].cost *= (1 - this.discountPower);
			updateItemInfo(i);
		}
		$("#hired-mentors").text(this.owned);
		$("#mentor-cost").text("Cost: " + beautify(this.cost, 0));
		checkSpecialsUnlocked();
	}
}

var students = {
	cost: 100,
	priceMultiplier: 2,
	studentPower: 0.01,
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		studentMultiplier += this.studentPower;
		for (var i in items) {
			updateItemInfo(i);
		}
		$("#enrolled-students").text(this.owned);
		$("#student-cost").text("Cost: " + beautify(this.cost, 0));
		recalculateRate();
		checkSpecialsUnlocked();
	},
	exponentialGrowthBought: function() {
		this.studentPower = 0.05;
		studentMultiplier = 1 + (this.owned * this.studentPower);
		recalculateRate();
		for (var i in items) {
			updateItemInfo(i);
		}
		$('#student-info').text('Enroll a Student (+5% to the rate)');
	}
}

// ==== Phase 2 Specials ====
var nextUnlockTime;
var unlockCountdownActive = false;
var powerupCountdownActive = false;
var powerupExpiresTime;
var currentItemAffected = -1;		// -1 means no item, 0-11 indicates the index of an item
var currentPowerupType = 0;			// 0: no powerup, 1: discount, 2: rate increase, 3: global rate increase
var msToUnlock = 300000;
var powerupLengthMs = 120000;

function startUnlockTimer() {
	// Set the powerup to be unlocked five minutes from now
	var now = getUnixNowMS();
	nextUnlockTime = now + msToUnlock;
	unlockCountdownActive = true;

	// Hide the powerup container and show the timer
	$("#powerup-container").css('display', 'none');
	$("#powerup-timer").css('display', 'block');
}

function unlockPowerups() {
	$("#powerup-timer").hide();
	$("#powerup-container").css('display', 'flex');
}

function startPowerup(powerupType) {
	currentItemAffected = Math.floor(Math.random() * 12);
	powerupExpiresTime = getUnixNowMS() + powerupLengthMs;
	currentPowerupType = powerupType;
	powerupCountdownActive = true;
}

$("#price-powerup-container").click(function() {
	startPowerup(1);

	items[currentItemAffected].cost *= 0.1;
	updateItemInfo(currentItemAffected);

	startUnlockTimer();
});

$("#singlerate-powerup-container").click(function() {
	startPowerup(2);

	items[currentItemAffected].synergyPower += getSingleRatePower(currentItemAffected);
	items[currentItemAffected].checkRate();
	recalculateRate();
	updateItemInfo(currentItemAffected);

	startUnlockTimer();
});

$("#globalrate-powerup-container").click(function() {
	startPowerup(3);

	multiplier *= 3;
	recalculateRate();

	startUnlockTimer();
});

function getSingleRatePower(index) {
	// Final Projects should get 2x to their rate with a single-item rate increase
	// HDMI Cables should get a 200x increase
	// The scale is linear, so each item's multiplier should be 18x more than the last

	return 2 + ((11 - index) * 18);
}

function updateTimers() {
	// The #powerup-timer div counts down to the next powerup
	// Discounted items have a discount amount and timer next to their price (i.e. "Cost: 1 (-90% for 1:32)")
	// Increased rate on a single item has an amount and timer next to their rate (i.e. "Rate: 20 (200x for 1:32)")
	// Global rate increase gives an amount and timer next to the rate (i.e. "20.00 units per second (3x for 1:32)")
	var now = getUnixNowMS();

	if (unlockCountdownActive) {
		var secondsTillUnlock = Math.floor((nextUnlockTime - now) / 1000);

		if (secondsTillUnlock < 0) {
			unlockPowerups();
			unlockCountdownActive = false;
		} else {
			$("#powerup-timer").text(timeDisplay(secondsTillUnlock));
		}
	}

	if (powerupCountdownActive) {
		if (currentPowerupType === 1) {
			updateDiscountTimer();
		} else if (currentPowerupType === 2) {
			updateSingleRateTimer();
		} else if (currentPowerupType === 3) {
			updateGlobalRateTimer();
		}
	}
}

function updateDiscountTimer() {
	var item = items[currentItemAffected];
	var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
	updateItemInfo(currentItemAffected);

	if (secondsLeft < 0) {
		item.cost *= 10;
		updateItemInfo(currentItemAffected)
		currentItemAffected = -1;
		currentPowerupType = 0;
		powerupCountdownActive = false;
	}
}

function updateSingleRateTimer() {
	var item = items[currentItemAffected];
	var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
	updateItemInfo(currentItemAffected);

	if (secondsLeft < 0) {
		item.synergyPower -= getSingleRatePower(currentItemAffected);
		item.checkRate();
		updateItemInfo(currentItemAffected);
		recalculateRate();
		currentItemAffected = -1;
		currentPowerupType = 0;
		powerupCountdownActive = false;
	}
}

function updateGlobalRateTimer() {
	var $rateDiv = $("#rate");
	var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
	$("#rate").text(getRateText());

	if (secondsLeft < 0) {
		multiplier /= 3;
		recalculateRate();
		currentPowerupType = 0;
		powerupCountdownActive = false;
	}
}

// ==== Build HTML for Items, Upgrades, and Achievements

function buildItemHTML(item, index) {
	var itemsDivName = "#phase-" + item.phase + "-items";
	var itemsDiv = $(itemsDivName);
	itemsDiv.append('<div class="item" id="item-' + index + '"></div>');

	var itemHTML = $("#item-" + index);
	itemHTML.addClass("disabled-item-" + item.phase);
	itemHTML.append('<div class="owned" id="owned-' + index + '">0</div>');
	itemHTML.append('<div class="item-info-container">');

	var infoContainer = itemHTML.find('.item-info-container');
	infoContainer.append('<div class="item-name"></div>');
	infoContainer.append('<div class="item-cost" id="cost-' + index + '"></div>');
	infoContainer.append('<div class="item-rate" id="rate-' + index + '"></div>');

	infoContainer.find('.item-name').html(item.name);
	$("#cost-" + index).html('Cost: ' + beautify(item.cost));
	$("#rate-" + index).html('Rate: ' + beautify(item.rate));
}

function buildUpgradeHTML(upgrade, index) {
	if (/* !upgrade.unlocked */ false) { return; }
	var upgradesContainer = $("#upgrades-container");
	upgradesContainer.append('<div class="upgrade" id="upgrade-' + index + '"></div>');

	var upgradeHTML = $("#upgrade-" + index);
	if (/* bank < upgrade.cost */ true) { upgradeHTML.addClass('disabled-upgrade'); }
	upgradeHTML.append('<div class="upgrade-name"></div>');
	upgradeHTML.append('<div class="upgrade-info"></div>');

	upgradeHTML.find('.upgrade-name').html(upgrade.name);
	upgradeHTML.find('.upgrade-info').html('Cost: ' + beautify(upgrade.cost, 3) + '<br><em>' + upgrade.desc + '</em>');
}

function buildAchievementHTML(achievement, index) {
	var lockImage = '<img class="achievement-lock" src="lock.png">';
	var checkmarkSymbol = '&#x2714;&#xFE0F;';

	var achievementsContainer = $("#achievements-container");
	achievementsContainer.append('<div class="achievement" id="achievement-' + index + '"></div>');

	var achievementHTML = $("#achievement-" + index);
	achievementHTML.append('<span class="achievement-unlocked"></span>')
	achievementHTML.append('<span class="achievement-name"></span>');
	achievementHTML.append('<span class="achievement-desc"></span>');

	var unlocked = achievementHTML.find(".achievement-unlocked");
	var name = achievementHTML.find(".achievement-name");
	var desc = achievementHTML.find(".achievement-desc");

	if (!achievement.unlocked) {
		achievementHTML.addClass("achievement-disabled");
		unlocked.html(lockImage);
		unlocked.css('font-size', '0.75rem');
		achievementHTML.css('padding', '0');
		name.css('display', 'none');
		desc.css('display', 'none');
	} else {
		unlocked.html(checkmarkSymbol);
	}
	name.html(achievement.name);
	desc.html(achievement.desc);
}

// Put these three for loops into load()
for (var i in items) {
	buildItemHTML(items[i], i);
}

for (var i in upgrades) {
	buildUpgradeHTML(upgrades[i], i);
}

for (var i in achievements) {
	buildAchievementHTML(achievements[i], i);
}

// Many upgrades are of the form "X's get +Y% for every Z you own"
// We could do it with quite a few if statements, or we could try to condense it a bit
var synergyUpgrades = [];
synergyUpgrades.push({forEvery: whiteboardWall, poweredUnit: hdmiCables, power: 0.2, enabled: false});			// 0 [4K Video Support]
synergyUpgrades.push({forEvery: hdmiCables, poweredUnit: whiteboardWall, power: 0.01, enabled: false});			// 1
synergyUpgrades.push({forEvery: wioaPaperwork, poweredUnit: standUpGuide, power: 0.01, enabled: false});		// 2 [Enrollment Parking]
synergyUpgrades.push({forEvery: standUpGuide, poweredUnit: hdmiCables, power: 2, enabled: false});				// 3
synergyUpgrades.push({forEvery: standUpGuide, poweredUnit: wioaPaperwork, power: 0.05, enabled: false});		// 4 [Video Communications Center]
synergyUpgrades.push({forEvery: frontEndClassProject, poweredUnit: lightingDeck, power: 0.1, enabled: false});	// 5
synergyUpgrades.push({forEvery: treehouseCourses, poweredUnit: techEvents, power: 0.01, enabled: false});		// 6 [Speed Controls]
synergyUpgrades.push({forEvery: techEvents, poweredUnit: treehouseCourses, power: 0.05, enabled: false});		// 7
synergyUpgrades.push({forEvery: hdmiCables, poweredUnit: githubAccount, power: 0.001, enabled: false});			// 8 [Pull Requests]
synergyUpgrades.push({forEvery: githubAccount, poweredUnit: hdmiCables, power: 4, enabled: false});				// 9
synergyUpgrades.push({forEvery: wioaPaperwork, poweredUnit: techEvents, power: 0.02, enabled: false});			// 10 [Hackathon]
synergyUpgrades.push({forEvery: techEvents, poweredUnit: wioaPaperwork, power: 0.5, enabled: false});			// 11

function checkSynergy(item) {
	for (var i in synergyUpgrades) {
		var upgrade = synergyUpgrades[i];
		if (upgrade.forEvery === item && upgrade.enabled) {
			upgrade.poweredUnit.synergyPower += upgrade.power;
			upgrade.poweredUnit.checkRate();
			updateItemInfo(items.indexOf(upgrade.poweredUnit));
		}
	}
}

function initialCheckSynergy(item, upgradeIndex) {
	var upgrade = synergyUpgrades[upgradeIndex];
	var totalPower = item.owned * upgrade.power;
	upgrade.poweredUnit.synergyPower += totalPower;
	upgrade.poweredUnit.checkRate();
	updateItemInfo(items.indexOf(upgrade.poweredUnit));
}

// ==== Core Variables and Functionality ====
var bank = 0;
var rate = 0;
var multiplier = 1;
var studentMultiplier = 1;

var baseClickPower = 1;
var clickPercentOfRate = 0;
var unitsPerClick = 1;

var itemPriceIncreaseFactor = 1.15;

// On mobile browsers, having a bank above 1 billion or so can cause the text to overflow its container.
// So we reduce the size of the bank text when it reaches this level.
var smallBankText = false;

// Statistics
var totalUnitsEarned = 0;
var totalUnitsSpent = 0;
var totalClicks = 0;
var totalUnitsMadeFromClicking = 0;
var totalItemsOwned = 0;
var totalUpgradesUnlocked = 0;
var totalAchievementsUnlocked = 0;

function update() {
	// Updates the bank based on the rate.
	// Assumes 30 fps.

	var newEarnings = rate / 30;
	bank += newEarnings;
	totalUnitsEarned += newEarnings;

	updateGameInfo();
}

function recalcUnitsPerClick() {
	var clickPowerFromRate = rate * clickPercentOfRate;
	unitsPerClick = baseClickPower + clickPowerFromRate;
	$("#units-per-click").text("Units Per Click: " + beautify(unitsPerClick, 0));
}

function recalculateRate() {
	rate = 0;
	for (var i in items) {
		rate += items[i].owned * items[i].rate;
	}

	rate *= studentMultiplier;
	rate *= multiplier;

	recalcUnitsPerClick();

	$("#rate").html(getRateText());
}

// ==== Update Locked and Unlocked Objects ====
function checkItemsUnlocked() {
	for (var i in items) {
		checkItemUnlocked(i);
	}
}

function checkItemUnlocked(index) {
	var $itemDiv = $("#item-" + index);
	var disabledClassName = "disabled-item-" + items[index].phase;
	if (bank >= items[index].cost) {
		$itemDiv.removeClass(disabledClassName);
	} else {
		$itemDiv.addClass(disabledClassName);
	}
}

function checkUpgradesUnlocked() {
	for (var i in upgrades) {
		checkUpgradeUnlocked(i);
	}
}

function checkUpgradeUnlocked(index) {
	var $upgradeDiv = $("#upgrade-" + index);
	var upgrade = upgrades[index];

	if (phasesUnlocked[upgrade.phase - 1] && (!upgrade.unlocked && upgrade.checkUnlock())) {
		upgrade.unlocked = true;
		$upgradeDiv.show();
	}

	if (bank >= upgrade.cost) {
		$upgradeDiv.removeClass("disabled-upgrade");
	} else {
		$upgradeDiv.addClass("disabled-upgrade");
	}
}

function checkSpecialsUnlocked() {
	if (bank < mentors.cost) {
		$("#mentor-container").addClass('phase-1-special-disabled');
	} else {
		$("#mentor-container").removeClass('phase-1-special-disabled');
	}

	if (bank < students.cost) {
		$("#student-container").addClass('phase-1-special-disabled');
	} else {
		$('#student-container').removeClass('phase-1-special-disabled');
	}
}

// ==== Event Handlers ====

// At the start of the game, there's some instruction text. We want to remove
// it when the user has clicked to make 10 units, but we don't want to keep
// calling an event handler that checks whether we've made 10 units yet every
// time the user clicks the bank. So, here, I add two event handlers to the
// bank's "click" event, the latter of which is coded to remove itself once the
// "made 10 units by clicking" condition has been met. This way, we don't keep
// checking to hide the instructions all the time.
function onBankClick() {
	var newEarnings = unitsPerClick;
	bank += newEarnings;
	totalUnitsEarned += newEarnings;
	totalClicks++;
	totalUnitsMadeFromClicking += newEarnings;
}

function checkDismissInstructions() {
	if (totalUnitsMadeFromClicking >= 10) {
		$("#instructions").hide();
		$("#bank").off('click', checkDismissInstructions);
	}
}

$("#bank").on('click', onBankClick);
$("#bank").on('click', checkDismissInstructions);

$("#rate").click(function() {
	// Speed cheat!
	var oldBank = bank;
	bank *= 1000;
	totalUnitsEarned += (bank - oldBank);
});

function assignItemClickHandlers() {
	for (var i in items) {
		$("#item-" + i).click({index: i}, function(event) {
			var index = Number(event.data.index);
			var item = items[index];
			if (bank < item.cost) {
				return;
			} else {
				bank -= item.cost;
				totalUnitsSpent += item.cost;
				item.cost *= itemPriceIncreaseFactor;
				item.owned++;
				totalItemsOwned++;
				item.totalRate = item.rate * item.owned;
				item.onBuy();
				checkSynergy(item);
				if (readme.bought) {
					finalProject.checkRate();
					updateItemInfo(11 /* Final Project */);
				}
				recalculateRate();
				updateItemInfo(index);
				checkItemUnlocked(index);
				checkItemsOwnedAchievements();
			}
		});
	}
}

function assignUpgradeClickHandlers() {
	for (var i in upgrades) {
		$("#upgrade-" + i).click({index: i}, function(event) {
			var upgrade = upgrades[event.data.index];
			if (bank < upgrade.cost) {
				return;
			} else {
				bank -= upgrade.cost;
				totalUnitsSpent += upgrade.cost;
				upgrade.bought = true;
				totalUpgradesUnlocked++;
				upgrade.onBuy();
				recalculateRate();
				$("#upgrade-" + event.data.index).hide();
			}
		});
	}
}

$("#mentor-container").click(function() {
	if (bank >= mentors.cost) {
		mentors.onBuy();
	}
});

$("#student-container").click(function() {
	if (bank >= students.cost) {
		students.onBuy();
	}
});

$("#stats-link").click(function(event) {
	event.preventDefault();
	$("#stats-overlay").show();
	$("#stats-page").show();
	$("body").css('overflow', 'hidden');
});

$("#close-stats").click(function(event) {
	event.preventDefault();
	$("#stats-overlay").hide();
	$("#stats-page").hide();
	$("body").css('overflow', 'scroll');
});

// ==== UI Update ====
function updateGameInfo() {
	$("#bank").html(beautify(bank, 0) + " units");

	if (bank >= 1e9 && !smallBankText) {
		// Here we reduce the size of the text if the bank reaches 1 billion
		// AND the window is less than 960px wide (the mobile breakpoint).

		// Since this code is ran 30 times per second, we do a clever trick to ensure
		// we don't do too much work here if necessary. We will only reduce the font size
		// if the bank is over 1 billion and we haven't already reduced the font size (which
		// is tracked by the smallBankText variable). Checking a number and a boolean is cheap,
		// and it saves us from having to do a jQuery select 30 times a second.

		if ($(window).width() < 1e9 /* set the width very high just so we can see if it works */) {
			$('#bank').css('font-size', '2rem');
			smallBankText = true;
		}
	} else if (bank < 1e9 && smallBankText) {
		$('#bank').css('font-size', '3rem');
		smallBankText = false;
	}
}

function getRateText() {
	var base = beautify(rate) + " units per second";

	if (powerupCountdownActive && currentPowerupType === 3) {
		var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
		if (secondsLeft < 0) { return base; }
		base += ' (3x for ' + timeDisplay(secondsLeft) + ')';
	}

	return base;
}

function updateItemInfo(index) {
	var item = items[index];
	$("#owned-" + index).text(item.owned);
	$("#cost-" + index).text("Cost: " + beautify(item.cost, 0) + getCostPowerupText(index));
	$("#rate-" + index).text("Rate: " + beautify(item.rate * multiplier * studentMultiplier) + getRatePowerupText(index));
}

function getCostPowerupText(index) {
	if (currentPowerupType === 1 && currentItemAffected === index) {
		var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
		if (secondsLeft < 0) { return ''; }
		return ' (-90% for ' + timeDisplay(secondsLeft) + ')';
	} else {
		return '';
	}
}

function getRatePowerupText(index) {
	if (currentPowerupType === 2 && currentItemAffected === index) {
		var secondsLeft = Math.floor((powerupExpiresTime - getUnixNowMS()) / 1000);
		if (secondsLeft < 0) { return ''; }
		return ' (' + getSingleRatePower(index) + 'x for ' + timeDisplay(secondsLeft) + ')';
	} else {
		return '';
	}
}

function unlockAchievement(index) {
	if (!achievements[index].unlocked) {
		var achievement = achievements[index];
		var $achievementDiv = $('#achievement-' + index);

		$achievementDiv.removeClass('achievement-disabled');
		$achievementDiv.find(".achievement-lock").hide();
		$achievementDiv.find(".achievement-name").show();
		$achievementDiv.find(".achievement-desc").show();

		achievement.unlocked = true;

		totalAchievementsUnlocked++;
	}
}

var upgradeCount = upgrades.length;
var achievementsCount = achievements.length;
function updateStatsPanel() {
	$("#total-units-earned").text("Total units earned: " + beautify(totalUnitsEarned, 0));
	$("#total-units-spent").text("Total units spent: " + beautify(totalUnitsSpent, 0) + ' (' + percent(totalUnitsSpent / totalUnitsEarned) + ')');
	$("#total-clicks").text("Total clicks: " + beautify(totalClicks, 0));
	$("#total-units-made-from-clicking").text("Total units made from clicking: " + beautify(totalUnitsMadeFromClicking, 0));
	$("#total-items-owned").text("Total items owned: " + beautify(totalItemsOwned, 0));
	$("#total-upgrades-unlocked").text("Total upgrades unlocked: " + totalUpgradesUnlocked + "/" + upgradeCount + " (" + percent(totalUpgradesUnlocked / upgradeCount, 0) + ")");
	$('#total-achievements-unlocked').text('Total achievements unlocked: ' + totalAchievementsUnlocked + '/' + achievementsCount + " (" + percent(totalAchievementsUnlocked / achievementsCount, 0) + ")");
}

function checkAchievements() {
	if (totalUnitsEarned >= 1) { unlockAchievement(0); }
	if (totalUnitsEarned >= 10) { unlockAchievement(1); }
	if (totalUnitsEarned >= 100) { unlockAchievement(2); }
	if (totalUnitsEarned >= 1000) { unlockAchievement(3); }
	if (totalUnitsEarned >= 10000) { unlockAchievement(4); }
	if (totalUnitsEarned >= 100000) { unlockAchievement(30); }
	if (totalUnitsEarned >= 1e6) { unlockAchievement(31); }
	if (totalUnitsEarned >= 10e6) { unlockAchievement(32); }
	if (totalUnitsEarned >= 100e6) { unlockAchievement(33); }
	if (totalUnitsEarned >= 1e9) { unlockAchievement(34); }

	if (totalUnitsMadeFromClicking >= 1) { unlockAchievement(5); }
	if (totalUnitsMadeFromClicking >= 10) { unlockAchievement(6); }
	if (totalUnitsMadeFromClicking >= 100) { unlockAchievement(7); }
	if (totalUnitsMadeFromClicking >= 1000) { unlockAchievement(8); }

	if (rate >= 0.1) { unlockAchievement(9); }
	if (rate >= 1) { unlockAchievement(10); }
	if (rate >= 10) { unlockAchievement(11); }
	if (rate >= 100) { unlockAchievement(12); }
	if (rate >= 1000) { unlockAchievement(13); }
	if (rate >= 10000) { unlockAchievement(35); }
	if (rate >= 100000) { unlockAchievement(36); }
	if (rate >= 1e6) { unlockAchievement(37); }
}

function checkItemsOwnedAchievements(phase) {
	/* Unlock achievements when the user owns a 1, 10, or 50 of all items in the same phase */
	var phaseItems = itemsByPhase[phase - 1];
	var achievementIndices = [[26, 27, 28],
		[50, 51, 52],
		[]];

	var lowestOwned = Infinity;
	for (var i in phaseItems) {
		if (phaseItems[i].owned < lowestOwned) {
			lowestOwned = phaseItems[i].owned;
		}
	}

	if (lowestOwned >= 1) { unlockAchievement(achievementIndices[phase - 1][0]); }
	if (lowestOwned >= 10) { unlockAchievement(achievementIndices[phase - 1][1]); }
	if (lowestOwned >= 50) { unlockAchievement(achievementIndices[phase - 1][2]); }
}

// Update Stats panel once per second
setInterval(update, 33.333);

function oncePerSecondUpdate() {
	checkItemsUnlocked();
	checkUpgradesUnlocked();
	checkSpecialsUnlocked();
	updateStatsPanel();
	checkAchievements();
	checkItemsOwnedAchievements(1);
	checkItemsOwnedAchievements(2);
	updateTimers();

	// Update the page title to reflect how many units the user has.
	document.title = beautify(Math.floor(bank), 3) + " units - Incrementalism";
}

setInterval(oncePerSecondUpdate, 1000);

// ==== Loader ====
function load() {
	assignItemClickHandlers();
	assignUpgradeClickHandlers();

	$(".upgrade").hide();
}

load();