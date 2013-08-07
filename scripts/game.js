canvas = document.getElementById('game_canvas')
myth = new Myth(canvas);

myth.load = function(){
	x = 10;
	y = 10;
	h1 = 50;
	w1 = 30;
	h2 = 50;
	w2 = 48;
	player = player_state =  myth.graphics.newSprite('images/swordsman.png', h1, w1);	
	player_attack = myth.graphics.newSprite('images/swordsman_attack.png', h2, w2)
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

	myth.input.keyDown("space", function(){
		player_state = player_attack
	})
	myth.input.keyUp("space", function(){
		player_state = player
	})
}

myth.draw = function(){
	//background
	myth.graphics.setBackgroundColor('#fff');

	//font
	myth.graphics.fontStyle('italic', '12', 'courier', '#0000ff');
	myth.graphics.fontText('Hello World', 32, 32)
	
	//drawing
	myth.graphics.rect(300, 40, 100, 100, '#00FF00');
	myth.graphics.drawSprite(player_state, x, y);
	myth.graphics.circle(100, 400, 60, 1, 'blue', 'fill', 'red');
	myth.graphics.line(300, 320, 500, 270);
}

//run game
myth.run();