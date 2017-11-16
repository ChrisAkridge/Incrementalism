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

// ==== Define Items, Upgrades, and Achievements ====

var phasesUnlocked = [true, false, false];

var items = [];
var upgrades = [];
var achievements = [];

// ==== Items ====
var hdmiCables = {
	name: "HDMI Cables",
	phase: 1,
	cost: 10,
	rate: 0.1,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (fourKVideoSupport.bought) {
			this.checkRate();
			whiteboardWall.checkRate();
			updateItemInfo(1 /* Whiteboard Walls */);
		}

		if (this.owned >= 1) { unlockAchievement(14); }
		if (this.owned >= 10) { unlockAchievement(15); }
		if (this.owned >= 50) { unlockAchievement(16); }
	},
	checkRate: function() {
		if (!fourKVideoSupport.bought) {
			this.rate =  0.1;
		} else {
			this.rate = 0.1 * (1 + (whiteboardWall.owned * 0.2));
		}

		if (enrollmentParking.bought) {
			this.rate *= (1 + (standUpGuide.owned * 2));
		}

		if (dedicatedSpeakers.bought) { this.rate *= 2; }

		this.totalRate = this.owned * this.rate;
	}
};
items.push(hdmiCables);

var whiteboardWall = {
	name: "Whiteboard Wall",
	phase: 1,
	cost: 125,
	rate: 2,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (fourKVideoSupport.bought) {
			this.checkRate();
			hdmiCables.checkRate();
			updateItemInfo(0 /* HDMI Cables */)
		}

		if (this.owned >= 1) { unlockAchievement(17); }
		if (this.owned >= 10) { unlockAchievement(18); }
		if (this.owned >= 50) { unlockAchievement(19); }
	},
	checkRate: function() {
		if (!fourKVideoSupport.bought) {
			this.rate =  2;
		} else {
			this.rate = 2 * (1 + (hdmiCables.owned * 0.01));
		}
		this.totalRate = this.owned * this.rate;
	}
};
items.push(whiteboardWall);

var smartBoard = {
	name: "SMART Board",
	phase: 1,
	cost: 375,
	rate: 8,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(20); }
		if (this.owned >= 10) { unlockAchievement(21); }
		if (this.owned >= 50) { unlockAchievement(22); }
	}
};
items.push(smartBoard);

var lightingDeck = {
	name: "Lighting Deck",
	phase: 1,
	cost: 1250,
	rate: 17.5,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (this.owned >= 1) { unlockAchievement(23); }
		if (this.owned >= 10) { unlockAchievement(24); }
		if (this.owned >= 50) { unlockAchievement(25); }
	},
	checkRate: function() {
		if (!videoCommunicationsCenter.bought) {
			this.rate = 17.5;
		} else {
			this.rate = 17.5 * (1 + (frontEndClassProject.owned * 0.1));
		}

		this.totalRate = this.owned * this.rate;
	}
};
items.push(lightingDeck);

var wioaPaperwork = {
	name: "WIOA Paperwork",
	phase: 2,
	cost: 14000,
	rate: 35,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		standUpGuide.checkRate();
		updateItemInfo(6 /* Stand-up Guide */)
	}
};
items.push(wioaPaperwork);

var orientationPresentation = {
	name: "Orientation Presentation",
	phase: 2,
	cost: 85000,
	rate: 75,
	owned: 0,
	totalRate: 0,
	onBuy: function() {},
	checkRate: function() {
		if (conciseExplanation.bought) { this.rate *= 2; }

		this.totalRate = this.owned * this.rate;
	}
};
items.push(orientationPresentation);

var standUpGuide = {
	name: "Stand-up Guide",
	phase: 2,
	cost: 190000,
	rate: 140,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (enrollmentParking.bought) {
			hdmiCables.checkRate();
			updateItemInfo(0 /* HDMI Cables */)
		}
	},
	checkRate: function() {
		if (!enrollmentParking.bought) {
			this.rate = 140;
		} else {
			this.rate = 140 * (1 + (wioaPaperwork.owned * 0.01));
		}

		if (videoCommunicationsCenter.bought) {
			rate *= (1 + (wioaPaperwork.owned * 0.05));
		}

		this.totalRate = this.owned * this.rate;
	}
};
items.push(standUpGuide);

var frontEndClassProject = {
	name: "Front-end Class Project",
	phase: 2,
	cost: 485000,
	rate: 325,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		lightingDeck.checkRate();
		updateItemInfo(3 /* Lighting Deck */);
	}
};
items.push(frontEndClassProject);

var treehouseCourses = {
	name: "Treehouse Courses",
	phase: 3,
	cost: 2.25e6,
	rate: 1090,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(treehouseCourses);

var githubAccount = {
	name: "GitHub Account",
	phase: 3,
	cost: 11.85e6,
	rate: 4320,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(githubAccount);

var techEvents = {
	name: "Tech Events",
	phase: 3,
	cost: 62.81e6,
	rate: 8900,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(techEvents);

var finalProject = {
	name: "Final Project",
	phase: 3,
	cost: 489.275e6,
	rate: 64250,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(finalProject);

var itemsByPhase = [[], [], []];
for (var i in items) {
	var phase = Math.floor(i / 4);
	itemsByPhase[phase].push(items[i]);
}

/* ==== Upgrades ==== */
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
		hdmiCables.checkRate();
		whiteboardWall.checkRate();

		recalculateRate();

		updateItemInfo(0);
		updateItemInfo(1);
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
		unlockAchievement(29);
	}
};
upgrades.push(completeClassroom);

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
		hdmiCables.checkRate();
		updateItemInfo(0 /* HDMI Cables */);

		standUpGuide.checkRate();
		updateItemInfo(6 /* Stand-Up Guides */);
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
		orientationPresentation.checkRate();
		recalculateRate();
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
		/* IMPLEMENT */
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
		$("#stars").css('display', 'flex');
		$("#phase-2-star").show();
		// $("#phase-1-special").css('display', 'flex');
	}
};
upgrades.push(startTheCourses);

upgrades.sort(function(a, b) { return b - a; });

var upgradesByPhase = [[], [], []];
for (var i in upgrades) {
	upgradesByPhase[upgrades[i].phase - 1].push(upgrades[i]);
}

// ==== Achievements ====
achievements.push({name: "A Thought", desc: "Earn 1 unit.", unlocked: false});
achievements.push({name: "An Idea", desc: "Earn 10 units.", unlocked: false});
achievements.push({name: "Research", desc: "Earn 100 units.", unlocked: false});
achievements.push({name: "Team-building", desc: "Earn 1,000 units.", unlocked: false});
achievements.push({name: "Office Purchase", desc: "Earn 10,000 units.", unlocked: false});
achievements.push({name: "Earn It", desc: "Click for 1 unit.", unlocked: false});
achievements.push({name: ".click()", desc: "Click for 10 units.", unlocked: false});
achievements.push({name: "Mouse-Up", desc: "Click for 100 units.", unlocked: false});
achievements.push({name: "Callbacks", desc: "Click for 1,000 units.", unlocked: false});
achievements.push({name: "Penny Stocks", desc: "Reach a rate of 0.1 units/second.", unlocked: false});
achievements.push({name: "Low-Yield Bonds", desc: "Reach a rate of 1 unit/second.", unlocked: false});
achievements.push({name: "Inflow", desc: "Reach a rate of 10 units/second.", unlocked: false});
achievements.push({name: "Income", desc: "Reach a rate of 100 units/second.", unlocked: false});
achievements.push({name: "Interest", desc: "Reach a rate of 1,000 units/second.", unlocked: false});
achievements.push({name: 'Unified Media Transport', desc: 'Buy 1 HDMI Cable.', unlocked: false});
achievements.push({name: '19 Pins', desc: 'Buy 10 HDMI Cables.', unlocked: false});
achievements.push({name: '2160p60', desc: 'Buy 50 HDMI Cables.', unlocked: false});
achievements.push({name: 'Dry-Erase', desc: 'Buy 1 Whiteboard Wall.', unlocked: false});
achievements.push({name: 'Glossy Acrylic', desc: 'Buy 10 Whiteboard Walls.', unlocked: false});
achievements.push({name: 'Heit\'s Legacy', desc: 'Buy 50 Whiteboard Walls.', unlocked: false});
achievements.push({name: 'Interactivity', desc: 'Buy 1 SMART Board.', unlocked: false});
achievements.push({name: 'Wireless Learning', desc: 'Buy 10 SMART Boards.', unlocked: false});
achievements.push({name: 'Integrated Tech', desc: 'Buy 50 SMART Boards.', unlocked: false});
achievements.push({name: 'Candela', desc: 'Buy 1 Lighting Deck.', unlocked: false});
achievements.push({name: 'Lux', desc: 'Buy 10 Lighting Decks.', unlocked: false});
achievements.push({name: 'Lumen', desc: 'Buy 50 Lighting Decks.', unlocked: false});
achievements.push({name: 'Shop Around', desc: 'Buy 1 of every Phase I item.', unlocked: false});
achievements.push({name: 'Quality Brand', desc: 'Buy 10 of every Phase I item.', unlocked: false});
achievements.push({name: 'Preferred Shopper', desc: 'Buy 50 of every Phase I item.', unlocked: false});
achievements.push({name: 'The Start of It All', desc: 'Buy "Complete Classroom".', unlocked: false});

// ==== Phase 1 Specials ====
var mentors = {
	cost: 100,
	priceMultiplier: 1.5,
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		for (var i in items) {
			items[i].cost *= 0.99;
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
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		studentMultiplier += 0.01;
		for (var i in items) {
			updateItemInfo(i);
		}
		$("#enrolled-students").text(this.owned);
		$("#student-cost").text("Cost: " + beautify(this.cost, 0));
		recalculateRate();
		checkSpecialsUnlocked();
	}
}

// ==== Build HTML for Items, Upgrades, and Achievements

function buildItemHTML(item, index) {
	if (/* phasesUnlocked[item.phase - 1] */ true) {
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

// $("#phase-2-items").hide();
// $("#phase-3-items").hide();

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

	$("#rate").html(beautify(rate) + " units per second");
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
			var item = items[event.data.index];
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
				recalculateRate();
				updateItemInfo(event.data.index);
				checkItemUnlocked(event.data.index);
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

function updateItemInfo(index) {
	var item = items[index];
	$("#owned-" + index).text(item.owned);
	$("#cost-" + index).text("Cost: " + beautify(item.cost, 0));
	$("#rate-" + index).text("Rate: " + beautify(item.rate * multiplier * studentMultiplier));
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

	if (totalUnitsMadeFromClicking >= 1) { unlockAchievement(5); }
	if (totalUnitsMadeFromClicking >= 10) { unlockAchievement(6); }
	if (totalUnitsMadeFromClicking >= 100) { unlockAchievement(7); }
	if (totalUnitsMadeFromClicking >= 1000) { unlockAchievement(8); }

	if (rate >= 0.1) { unlockAchievement(9); }
	if (rate >= 1) { unlockAchievement(10); }
	if (rate >= 10) { unlockAchievement(11); }
	if (rate >= 100) { unlockAchievement(12); }
	if (rate >= 1000) { unlockAchievement(13); }
}

function checkItemsOwnedAchievements(phase) {
	/* Unlock achievements when the user owns a 1, 10, or 50 of all items in the same phase */
	var phaseItems = itemsByPhase[phase - 1];
	var achievementIndices = [[26, 27, 28],
		[],
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
}

setInterval(oncePerSecondUpdate, 1000);

// ==== Loader ====
function load() {
	assignItemClickHandlers();
	assignUpgradeClickHandlers();

	$(".upgrade").hide();
}

load();