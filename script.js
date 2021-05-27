"use strict";

const screenPosition = {
    x: 0,
    y: 0,
    scale: 0
}

const TEST = {
    players: [
        {name: 'test_1', position: {x: 50, y: 50}},
        {name: 'test_2', position: {x: 131, y: 430}},
        {name: 'test_3', position: {x: 350, y: 520}},
        {name: 'test_4', position: {x: 550, y: 510}},
    ]
};

const screen = document.getElementById('screen');

const moveTo = {
    x: 0,
    y: 0
}

const player = {
    needMove: false,
    elem: null,
    position: {
        x: 0,
        y: 0
    }
}

screen.addEventListener('contextmenu', startMoveTo);

function startMoveTo(e) {
    e.preventDefault();
    const newPositionX = screenPosition.x + e.clientX;
    const newPositionY = screenPosition.y + e.clientY;
    console.log(newPositionX, newPositionY);
    if (moveTo.x !== newPositionX && moveTo.y !== newPositionY) {
        player.needMove = true;
        moveTo.x = newPositionX;
        moveTo.y = newPositionY;
    }
};


function repositionPlayers(player, targetPoint) {
    if (!player.needMove) return;
    
    if (player.position.x > targetPoint.x) {
        player.position.x-= 1
    } else if (player.position.x < targetPoint.x) {
        player.position.x+= 1
    }
    if (player.position.y > targetPoint.y) {
        player.position.y-= 1
    } else if (player.position.y < targetPoint.y) {
        player.position.y+= 1
    }
    if (targetPoint.x === player.position.x && targetPoint.y === player.position.y) {
        player.needMove = false;
    }
}

function visualisationPlayer(player) {
    const elem = document.createElement('div');
    elem.style.position = 'absolute';
    elem.style.top = `${player.position.y}px`;
    elem.style.left = `${player.position.x}px`;
    elem.style.width = '10px';
    elem.style.height = '10px';
    elem.style.backgroundColor = 'red';
    player.elem = elem;
    screen.append(elem);
}

function reVisualisationPlayer(player) {
    if (!player.needMove) return;
    player.elem.style.top = `${player.position.y}px`;
    player.elem.style.left = `${player.position.x}px`;
}

visualisationPlayer(player);

function intervalFuncList() {
    repositionPlayers(player, moveTo);
    reVisualisationPlayer(player);
}

setInterval(intervalFuncList, 10);




