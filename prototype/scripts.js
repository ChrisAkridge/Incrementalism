var bank = 0;
var rate = 0;

var mentors = 0;
var mentorPrice = 1000;
var mentorPriceMult = 1;

var students = 0;
var studentPrice = 950;
var studentRateMult = 1;

$(".cheat").click(function() {
	bank *= 1000;
});

var update = function() {
	var newIncome = rate / 10;
	bank += newIncome;

	$("#bank").text(bank.toFixed(0));
};

var updateBG = function() {
	var powerOf10 = Math.floor(Math.log10(bank));
	if (powerOf10 < 1) { $("#bank").removeClass(); }
	else {
		if (powerOf10 > 10) { powerOf10 = 10; }
		var className = "bg-" + powerOf10;
		$("#bank").addClass(className);
	}
}

var recalc = function() {
	rate = 0;
	for (var i in buildings) {
		rate += buildings[i].totalRate;
	}
	
	rate *= studentRateMult;
	
	clickPower = baseClickPower + (rate * (clickMult - 1)); 
	
	$("#rate").text(rate.toFixed(2) + " per second");
}

var baseClickPower = 1;
var clickPower = 1;
var clickMult = 1;

$("#bank").click(function() {
	bank += clickPower;
});

$("#mentorBox").click(function() {
	if (bank >= mentorPrice) {
		bank -= mentorPrice;
		mentorPrice *= 1.55;
		
		mentors++;
		$("#mentorInfo").text("Cost: " + mentorPrice.toFixed(0) + " | Mentors: " + mentors);
		
		mentorPriceMult *= 0.99;
		for (var i in buildings) {
			buildings[i].cost *= 0.99;
			$("#buildingCost" + i).text("Cost: " + buildings[i].cost.toFixed(0));
		}
	}
});

$("#studentBox").click(function() {
	if (bank >= studentPrice) {
		bank -= studentPrice;
		studentPrice *= 1.15;
		
		students++;
		$("#studentInfo").text("Cost: " + studentPrice.toFixed(0) + " | Students: " + students);
		
		studentRateMult += 0.01;
		recalc();
	}
});

var buildings = [];

function buy(num) {
	var building = buildings[num];
	
	if (bank >= building.cost) {
		bank -= building.cost;
		building.cost *= 1.15;
		building.totalRate += building.rate;
		building.owned++;
		$("#buildingCost" + num).text("Cost: " + building.cost.toFixed(0));
		$("#buildingRate" + num).text("Rate: " + building.rate.toFixed(2));
		$("#buildingOwned" + num).text("Owned: " + building.owned);
		building.onBuy();
		recalc();
	}
}

var hdmiCables = {
	cost: 10,
	rate: 0.1,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
	}
};

var whiteboardWall = {
	cost: 125,
	rate: 2,
	owned: 0,
	totalRate: 0,
	hdmiUpgradeBought: false,
	onBuy: function() {
		if (this.hdmiUpgradeBought) {
			var multiplier = 1 + (this.owned * 0.2);
			hdmiCables.rate = ((upgrades[2].bought) ? 0.2 : 0.1) * multiplier; // Bug: buying the second HDMI cable x2 upgrade isn't accounted for here
			hdmiCables.totalRate = hdmiCables.owned * hdmiCables.rate;
			$("#buildingRate0").text("Rate: " + hdmiCables.rate.toFixed(1));
			
			var whiteboardMult = 1 + (hdmiCables.owned * 0.01);
			this.rate = 2 * whiteboardMult;
			this.totalRate = this.owned * this.rate;
			$("#buildingRate1").text("Rate: " + this.rate.toFixed(1));
		}
	}
};

var smartBoard = {
	cost: 375,
	rate: 8,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
}

var lightingDeck = {
	cost: 1250,
	rate: 17.5,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};

buildings.push(hdmiCables);
buildings.push(whiteboardWall);
buildings.push(smartBoard);
buildings.push(lightingDeck);

$("#building0").click(function() {
	buy(0);
});

$("#building1").click(function() {
	buy(1);
});

$("#building2").click(function() {
	buy(2);
});

$("#building3").click(function() {
	buy(3);
});

// ==== Upgrades ====

/* Upgrade example HTML:
 * <div class="upgrade" id="upgrade0">
 * 	<p class="upgradeName">Upgrade Name</p>
 *	<p class="upgradeDesc">Upgrade description.</p>
 *	<span class="upgradeInfo">Cost: 100</span>
 * </div>
 */
 
 var upgrades = [];
 
 upgrades.push({
	name: "Touchpad",
	desc: "Clicking is twice as powerful.",
	unlock: 25,
	unlocked: false,
	cost: 40,
	bought: false,
	onBuy: function() {
		baseClickPower *= 2;
	}
 });
 
 upgrades.push({
	name: "4K Video Support",
	desc: "HDMI Cables gain +20% to their rate for each Whiteboard Wall owned. Whiteboard Walls gain +1% to their rate for every HDMI Cable owned.",
	unlock: 140,
	unlocked: false,
	cost: 180,
	bought: false,
	onBuy: function() {
		whiteboardWall.hdmiUpgradeBought = true;
	}
 });
 
 upgrades.push({
	name: "Rainbow Markers",
	desc: "SMART Boards are 25% cheaper.",
	unlock: 750,
	unlocked: false,
	cost: 1250,
	bought: false,
	onBuy: function() {
		smartBoard.cost *= 0.75;
		$("#buildingCost2").text("Cost: " + smartBoard.cost.toFixed(0));
	}
 });
 
 upgrades.push({
	name: "Microsoft Intellimouse",
	desc: "Clicking gains +20% of your rate.",
	unlock: 500,
	unlocked: false,
	cost: 2950,
	bought: false,
	onBuy: function() {
		clickMult += 0.2;
	}
 });
 
 upgrades.push({
	name: "Dedicated Speakers",
	desc: "HDMI Cables have their rate doubled.",
	unlock: 750,
	unlocked: false,
	cost: 3750,
	bought: false,
	onBuy: function() {
		hdmiCables.rate *= 2;
		hdmiCables.totalRate = hdmiCables.rate * hdmiCables.owned;
		$("#buildingRate0").text("Rate: " + hdmiCables.rate.toFixed(1));
	}
 });
 
upgrades.push({
	name: "Mentor's Assistance",
	desc: "All profit x2.",
	unlock: 1020,
	unlocked: false,
	cost: 5100,
	bought: false,
	onBuy: function() {
		for (var i in buildings) {
			buildings[i].rate *= 2;
			buildings[i].totalRate = buildings[i].rate * buildings[i].owned;
			$("#buildingRate" + i).text("Rate: " + buildings[i].rate);
		}
	}
});

upgrades.push({
	name: "Wooden Cube Mouse",
	desc: "Clicking gains +10% of your rate.",
	unlock: 175,
	unlocked: false,
	cost: 200,
	bought: false,
	onBuy: function() {
		clickMult += 0.1;
	}
});

upgrades.push({
	name: "Grated Light Fixtures",
	desc: "HDMI Cables are 25% cheaper.",
	unlock: 1875,
	unlocked: false,
	cost: 2500,
	bought: false,
	onBuy: function() {
		hdmiCables.cost *= 0.75;
		$("#buildingCost0").text("Cost: " + hdmiCables.cost.toFixed(0));
	}
});

upgrades.push({
	name: "Complete Classroom",
	desc: "All profits are doubled.",
	unlock: 10000,
	unlocked: false,
	cost: 15000,
	bought: false,
	onBuy: function() {
		for (var i in buildings) {
			buildings[i].rate *= 2;
			buildings[i].totalRate = buildings[i].rate * buildings[i].owned;
			$("#buildingRate" + i).text("Rate: " + buildings[i].rate);
		}
		
		// Finish stage 1!
		$("#stars").show();
		$("#star0").show();
		$("#stage2Boxes").css("display", "flex");
	}
});


 
function makeUpgradeHTML(num) {
	var upgrade = upgrades[num];
	
	var pane = $("<div />");
	pane.addClass("upgrade");
	pane.attr("id", "upgrade" + num);
	
	var name = $('<p class="upgradeName"></p>');
	var desc = $('<p class="upgradeDesc"></p>');
	var cost = $('<span class="upgradeInfo"></span>');
	
	name.text(upgrade.name);
	desc.text(upgrade.desc);
	cost.text(upgrade.cost.toFixed(0));
	pane.append(name);
	pane.append(desc);
	pane.append(cost);
	
	pane.click(function() {
		buyUpgrade(upgrade);
	});
	$("#upgradeContainer").append(pane);
 }
 
 function rebuildUpgrades() {
	$("#upgradeContainer").empty();
	upgrades.sort(function(a, b) {
		return a.cost - b.cost;
	});
	
	for (var i = 0; i < upgrades.length; i++) {
		var upgrade = upgrades[i];
		var upgradeID = "#upgrade" + i;
		if (bank >= upgrade.unlock && !upgrade.bought) {
			upgrade.unlocked = true;
		}
		
		if (upgrade.unlocked && !upgrade.bought) {
			makeUpgradeHTML(i);
			if (bank < upgrade.cost) {
				$(upgradeID).addClass("disabled");
			}
		}
	}
 }
 
 function updateUpgrades() {
	rebuildUpgrades();
 
	for (var i = 0; i < upgrades.length; i++) {
		var upgrade = upgrades[i];
		var upgradeID = "#upgrade" + i;
		if (bank >= upgrade.cost) {
			$(upgradeID).removeClass("disabled");
		}
	}
 }
 
 function buyUpgrade(upgrade) {
	if (bank >= upgrade.cost) {
		upgrade.bought = true;
		bank -= upgrade.cost;
		upgrade.onBuy();
		rebuildUpgrades();
		recalc();
	}
 }

rebuildUpgrades();
setInterval(update, 100);
setInterval(updateUpgrades, 1000);