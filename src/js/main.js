(function () {
    'use strict';
    var promptForPlayer = function () {
        var name = prompt("Please enter your name", "");
        Game.addPlayer(name);
    }
    var rollDice = function (faces) {
        return Math.floor((Math.random() * faces) + 1);
    }


    var Game = {
        players: [],
        currentPlayer: 0,

        init: function () {
            promptForPlayer();
            this.render();
        },

        switchGender: function () {
            this.players[this.currentPlayer].changeGender();
            this.render();
        },

        addPlayer: function (name) {
            this.players.push(new Player(name));
            this.render();
        },

        alterLevel: function (modifier) {
            this.players[this.currentPlayer].alterLevel(modifier);
            this.render();
        },

        alterGear: function (modifier) {
            this.players[this.currentPlayer].alterGear(modifier);
            this.render();
        },

        changeRace: function (race) {
            this.players[this.currentPlayer].changeRace(race);
        },

        changeGameClass: function (gameClass) {
            this.players[this.currentPlayer].changeGameClass(gameClass);
        },

        changeCurrentUser: function (index) {
            this.currentPlayer = index;
            Game.render();
        },

        stepCurrentUser: function (direction) {
            this.currentPlayer += direction;
            this.currentPlayer = this.currentPlayer >= this.players.length ? 0 : this.currentPlayer;
            this.currentPlayer = this.currentPlayer < 0 ? this.players.length - 1 : this.currentPlayer;
            Game.render();
        },

        printPlayers: function () {
        },

        render: function () {
            var currentPower = this.players[this.currentPlayer].getLevel() + this.players[this.currentPlayer].getGear();
            $("#current-user").html(this.players[this.currentPlayer].getName());
            $("#current-gender").html(this.players[this.currentPlayer].getGender());
            $("#current-level").html(this.players[this.currentPlayer].getLevel());
            $("#current-gear").html(this.players[this.currentPlayer].getGear());
            $("#current-power").html(currentPower);
            $('#races option[value="' + this.players[this.currentPlayer].getRace() + '"]').attr("selected", "selected");
            $('#classes option[value="' + this.players[this.currentPlayer].getGameClass() + '"]').attr("selected", "selected");

            var playersList = "";
            var classList;
            for(var i = 0; i < this.players.length; i++) {
                currentPower = this.players[i].getLevel() + this.players[i].getGear();
                classList = this.currentPlayer == i ? "selected-player" : "";
                classList += " user-links"
                playersList += "<li>";
                playersList += "<a href='#' class='" + classList + "' data-user-index='" + i + "'>";
                playersList += this.players[i].getName() + " (" + currentPower + ")";
                playersList += "</a>";
                playersList += "</li>";
            }
            $("#playerList").html(playersList);
            $(".user-links").on("click", function (e) {
                Game.changeCurrentUser($(e.target).data("user-index"));
            });
        }
    };

    $( document ).ready( function () {
        Game.init();

        $(".add-player-field .button").on("click", promptForPlayer);
        $(".level-modifier").on("click", function(e) {
            var modifier = e.target.innerHTML;
            Game.alterLevel(modifier);
        });
        $(".gear-modifier").on("click", function(e) {
            var modifier = e.target.innerHTML;
            Game.alterGear(modifier);
        });

        $(".dice-button").on("click", function (e) {
            var nrOfFaces = $(e.currentTarget).data("faces");

            $('#dice-result').html(rollDice(nrOfFaces));
            $('#myModal').foundation('reveal', 'open');
        });

        $(".step-user").on("click", function (e) {
            var direction = parseInt($(e.currentTarget).data("direction"));
            Game.stepCurrentUser(direction);
        });

        $("#current-gender").on("click", function () {
            Game.switchGender();
        });
        $("#races").on("change", function (e) {
            var race = $("#races").val();
            Game.changeRace(race);
        });
        $("#classes").on("change", function (e) {
            var gameClass = $("#classes").val();
            Game.changeGameClass(gameClass);
        });
    });
}());