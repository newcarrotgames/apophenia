/**
 * Created by David Harris on 12/8/2014.
 */

APOPHENIA.Hive = function(board) {

    function createBug() {
        return new APOPHENIA.enemy();
    }

    this.populateBoard = function() {
        for (var i = 0; i != board.size(); i++) {
            var bug = createBug();
            board.add(bug);
        }
    };
};