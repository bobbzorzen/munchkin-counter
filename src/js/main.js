(function () {
    'use strict';
    var Game = {
        players: [],

        init: function () {
            console.log("INIT");
        },

        addPlayer: function (name) {
            console.log("Name: ", name);
            this.players.push(name);
        },

        printPlayers: function () {
            console.log(this.players);
        }

    };
    console.log("GAME: ", Game.init());
    $( document ).ready( function () {
        Game.init();
        Game.addPlayer("potato");
        Game.addPlayer("potato2");
        Game.printPlayers();

        $(".level-modifier").on("click", function() {Game.printPlayers();});
    });

    // window.Game = {
    //     "init": Game.init,
    //     "addPlayer": Game.addPlayer,
    // };
    console.log("Game ready!");
}());