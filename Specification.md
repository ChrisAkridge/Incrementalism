# "Incrementalism"
Code Louisville 2017 Frontend Class Project
Specification

A simple incremental game modeled off the Code Louisville classroom.

## The Basics
The user starts with a bank of 0 units. They can click the bank to increase it by 1 unit. They can use units to buy **Items**, which give units automatically at a given rate, **Upgrades**, which boost an item's rate, reduce its price, etc., and **Specials**, which provide powerful boosts.

Gameplay is divided into three phases:
* Phase I: From the start of the game until the "Complete Classroom" upgrade is bought (lifetime earnings should be about 30,000 units or so). The user can buy items and upgrades for those items.
** Phase II: At the end of Phase I until the "Complete Syllabus" upgrade is bought (lifetime earnings should be about 2 billion or so). The user can bring in mentors and enroll students to reduce prices and increase the rate of income, respectively.
*** Phase III: At the end of Phase II until the "Graduation" upgrade is bought (lifetime earnings should be about 1 decillion or so). The user gets a series of powerful upgrades and boosts.

## Items
An item is thing the user can buy with units. Each item provides a certain number of units per second, called its rate. The price of each successive item is 15% higher than the last, compounded.

(subject to change over time)

* Phase I Items:
    * HDMI Cables:
	    * Initial Cost: 10 units
		* Rate: 0.1 units/second
	* Whiteboard Wall:
	    * Initial Cost: 125 units
		* Rate: 2 units/second
	* SMART Board:
	    * Initial Cost: 375 units
		* Rate: 8 units/second
	* Lighting Deck:
	    * Initial Cost: 1,250 units
		* Rate: 17.5 units/second
* Phase II Items:
	* WIOA Paperwork:
		* Initial Cost: 14,000 units
		* Rate: 35 units/second
	* Orientation Presentation:
	    * Initial Cost: 85,000 units
		* Rate: 75 units/second
	* Stand-up Guide:
	    * Initial Cost: 190,000 units
		* Rate: 140 units/second
	* Front-end Class Project:
	    * Initial Cost: 485,000 units
		* Rate: 325 units/second
* Phase III Items:
	* Treehouse Courses:
	    * Initial Cost: 2,250,000 units
		* Rate: 1,090 units/second
	* GitHub Account:
	    * Initial Cost: 11,850,000 units
		* Rate: 4,320 units/second
	* Tech Events:
	    * Initial Cost: 62,810,000 units
		* Rate: 8,900 units/second
	* Final Project:
	    * Initial Cost: 489,275,000 units
		* Rate: 64,250 units/second
		
## Upgrades
Upgrades are one-time purchases that improve some metric of the game (cost, income, etc.). Upgrades are unlocked when certain conditions are met, and can be bought at a given cost.

* Phase I Upgrades:
    * Touchpad:
	    * Unlocked when the user has made 25 units from clicking
	    * Cost: 40 units
	    * Effect: Clicking power is doubled
	* Wooden Cube Mouse:
		* Unlocked when the user has made 175 units from clicking
	    * Cost: 200 units
	    * Effect: Clicking gains 10% of the rate
	* Microsoft Intellimouse:
		* Unlocked when the user has made 500 units from clicking
	    * Cost: 2,950 units
	    * Effect: Clicking gains 20% of the rate
	* 4K Video Support (HDMI Cable upgrade):
		* Unlocked when the bank reaches 140 units
	    * Cost: 180 units
	    * Effect: HDMI Cables produce 20% more for each Whiteboard Wall owned. Whiteboard Walls produce +1% more for every HDMI Cable owned.
	* Rainbow Markers (Whiteboard Wall upgrade):
		* Unlocked when the bank reaches 750 units
	    * Cost: 1,250 units
	    * Effect: SMART Boards are 25% cheaper
	* Dedicated Speakers (SMART Board upgrade):
		* Unlocked when the bank reaches 1750 units
	    * Cost: 3,750 units
	    * Effect: HDMI Cables have their rate doubled
	* Grated Light Fixture (Lighting Deck upgrade):
		* Unlocked when the bank reaches 1,875 units.
	    * Cost: 2,500 units
	    * Effect: HDMI Cables are 25% cheaper
	* Mentor's Assistance:
		* Unlocked when the bank reaches 2,020 units
	    * Cost: 5,100 units
	    * Effect: All income is doubled
	* Complete Classroom:
		* Unlocked when the user has 20 HDMI Cables, 8 Whiteboard Walls, 1 SMART Board, and 8 Lighting Fixtures
	    * Cost: 15,000 units
	    * Effect: All income is doubled
* Phase II Upgrades:
	* Optical Wireless Mouse:
		* Unlocked when the user has made 25,000 units from clicking.
		* Cost: 89,500 units
		* Effect: Clicking gains 10% of the rate.
	* Logitech Bluetooth Mouse:
		* Unlocked when the user has made 400,000 units from clicking.
		* Cost: 455,000 units
		* Effect: Clicking gains 15% of the rate.
	* Miniature Travel Mouse:
		* Unlocked when the user has made 1,200,000 units from clicking.
		* Cost: 9,550,000 units
		* Effect: Clicking gains 25% of the rate.
	* Enrollment Parking:
		* Unlocked when the bank reaches 11,000 units.
		* Cost: 28,800 units.
		* Effect: Stand-Up Guides get +1% for every WIOA Paperwork you own. HDMI Cables get +200% for every Stand-Up Guide you own.
	* Library Card:
		* Unlocked when the bank reaches 100,000 units.
		* Cost: 195,000 units.
		* Effect: Front-end Class Projects are 30% cheaper.
	* Concise Explanation:
		* Unlocked when the bank reaches 225,000 units.
		* Cost: 450,000 units.
		* Effect: Orientation Presentations have their rate doubled.
	* Video Communications Center:
		* Unlocked when the bank reaches 450,000 units.
		* Cost: 985,000 units.
		* Effect: WIOA Paperworks gain +5% for every Stand-Up Guide. Lighting Decks gain +10% for every Front-end Class Project.
	* Weekly Meeting:
		* Unlocked when all Phase II mouse and item upgrades are purchased.
		* Cost: 1,000,000 units.
		* Effect: All income is tripled.
	* Start the Courses:
		* Unlocked when the user has bought 10 WIOA Paperworks, 1 Orientation Presentation, 4 Stand-Up Guides, and 1 Front-End Class Project.
		* Cost: 10,000,000 units.
		* Effect: All income is tripled. Phase II is completed.

## Achievements

* Phase I Achievements
    * A Thought: Earn 1 unit.
	* An Idea: Earn 10 units.
	* Research: Earn 100 units.
	* Team-building: Earn 1,000 units.
	* Office Purchase: Earn 10,000 units.
	* Earn It: Make 1 unit from clicking.
	* .click(): Make 10 units from clicking.
	* Mouse-Up: Make 100 units from clicking.
	* Callbacks: Make 1,000 units from clicking.
	* Penny Stocks: Reach a rate of 0.1 units/second.
	* Low-Yield Bonds: Reach a rate of 1 unit/second.
	* Inflow: Reach a rate of 10 units/second.
	* Income: Reach a rate of 100 units/second.
	* Interest: Reach a rate of 1,000 units/second.
	* Unified Media Transport: Buy 1 HDMI Cable.
	* 19 Pins: Buy 10 HDMI Cables.
	* 2160p60: Buy 50 HDMI Cables.
	* Dry-Erase: Buy 1 Whiteboard Wall.
	* Glossy Acrylic: Buy 10 Whiteboard Walls.
	* Heit's Legacy: Buy 50 Whiteboard Walls.
	* Interactivity: Buy 1 SMART Board.
	* Wireless Learning: Buy 10 SMART Boards.
	* Integrated Tech: Buy 50 SMART Boards.
	* Candela: Buy 1 Lighting Deck.
	* Lux: Buy 10 Lightning Decks.
	* Lumen: Buy 50 Lightning Decks.
	* Shop Around: Buy 1 of every Phase I item.
	* Quality Brand: Buy 10 of every Phase I item.
	* Preferred Shopper: Buy 50 of every Phase I item.
	* The Start of It All: Buy "Complete Classroom".
* Phase II Achievements
    * Word-of-Mouth: Earn 100,000 units.
	* Visit Our Website: Earn 1,000,000 units.
	* Waiting List: Earn 10,000,000 units.
	* Pre-Work: Earn 100,000,000 units.
	* Orientation: Earn 1 billion units.
	* Dividends: Reach a rate of 10,000 units/second.
	* Capital Gains: Reach a rate of 100,000 units/second.
	* Certificates of Deposit: Reach a rate of 100,000 units/second.
	* Sign Here, Please: Own 1 WIOA Paperwork.
	* Legal Procedures: Own 10 WIOA Paperworks.
	* Read Carefully: Own 50 WIOA Paperworks.
	* Welcome to the Library: Own 1 Orientation Presentation.
	* The Conference Hall: Own 10 Orientation Presentation.
	* Welcome to the Program: Own 50 Orientation Presentation.
	* What are You Working On?: Own 1 Stand-Up Guide.
	* Are You Stuck On Anything?: Own 10 Stand-Up Guides.
	* What is Your Plan for the Week?: Own 50 Stand-Up Guides.
	* The GitHub Repository: Own 1 Front-end Class Project.
	* First Commit: Own 10 Front-end Class Projects.
	* The Work for the Meeting: Own 50 Front-end Class Projects.
	* The Student's Path: Own 1 of every Phase II building.
	* Proper Direction: Own 10 of every Phase II building.
	* Ready for the Course: Own 50 of every Phase II building.
	* Everything's Ready: Buy "Start the Courses".