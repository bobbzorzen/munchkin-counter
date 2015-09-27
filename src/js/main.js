(function () {
    'use strict';

    $( document ).ready( function () {
        Game.init("World");
    });

    var test = function () {
        console.log("Hello ")
    };

    var echo = function (string) {
        test();
        console.log(string);
    };

    window.Game = {
        "init": echo
    };
    console.log("Game ready!");
}());