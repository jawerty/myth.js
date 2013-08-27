# myth.js (in development)
A lightweight HTML5 game library for a HTML5/node.js mmo game that is currently in closed development.

Basic usage

	canvas = document.getElementById('game_canvas')
	myth = new Myth(canvas);

	myth.load = function(){
		x = 10;
		y = 10;
		height = 100;
		width = 50;
		player_attack = myth.graphics.newSprite('images/player.png', height, width);
	}


	myth.update = function(){
		myth.input.keyDown("right_arrow", function(){
			x += 1;
		});
		myth.input.keyDown("left_arrow", function(){
			x -= 1;
		})
		myth.input.keyDown("up_arrow", function(){
			y -= 1;
		})
		myth.input.keyDown("down_arrow", function(){
			y += 1;
		})
	}

	myth.draw = function(){

		//font
		myth.graphics.fontStyle('italic', '12', 'courier', '#0000ff');
		myth.graphics.fontText('Hello World', 5, 5)

		//drawing rectangles
		myth.graphics.rect(300, 40, 100, 100, '#00FF00');
		myth.graphics.drawSprite(player_state, x, y);
		myth.graphics.circle(100, 400, 60, 1, 'blue', 'fill', 'red');
		myth.graphics.line(300, 320, 500, 270);
	}

	//run game
	myth.run();
