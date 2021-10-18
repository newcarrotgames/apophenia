/**
 * Created by David Harris on 12/22/2014.
 */

/**
 * Manages game state
 * @constructor
 */

APOPHENIA.gameStates = {
    INTRO: 0,
    SPACE: 1,
    END: 2
};

APOPHENIA.State = function(entityManager) {
    var self = this;
    var currentState = 0;
    var controls;

    this.setState = function(newState) {
        currentState = newState;

        if (currentState == APOPHENIA.gameStates.SPACE) {
            controls = new APOPHENIA.Controls(entityManager.getPlayer(), APOPHENIA.getRenderer().domElement, self);
        };
    };

    this.getState = function() {
        return currentState;
    };

    this.getControls = function() {
        return controls;
    };
};