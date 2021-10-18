/**
 * Created by David Harris on 12/5/2014.
 */

/**
 *
 */
APOPHENIA.Board = function(properties) {
    var width = properties.width;
    var height = properties.height;
    var scale = properties.scale;
    var board = [];
    var centerOffset = new THREE.Vector2(width * scale / -2, height * scale / -2);

    /**
     * Adds entity to board, and decides where they should go
     * @param entity The boardless entity
     * @returns {boolean} If there was room on the board or not
     */
    this.add = function(entity) {
        console.log('adding to board');
        entity.board = this;
        var emptyPosition = getEmptyPosition();
        if (emptyPosition !== undefined) {
            entity.boardPosition = emptyPosition;
            board[emptyPosition] = entity;
            entity.setPosition(getXAndYPositionFromIndex(emptyPosition));
            APOPHENIA.addEntityToScene(entity);
            return true;
        } else
            return false;
    };

    /**
     * Removes entity from board
     * @param index Index of entity
     * @returns {boolean} True if entity exists in board and was removed, false if not
     */
    this.remove = function(entity) {
        if (entity.boardPosition !== undefined && board[entity.boardPosition] !== undefined) {
            board[entity.boardPosition] = undefined;
            entity.boardPosition = undefined;
            return true;
        }
        else
            return false;
    };

    var setEntityPosition = function(entity) {
        if (entity.boardPosition === undefined)
            return false;
        var xAndYPosition = getXAndYPositionFromIndex(entity.boardPosition)
        entity.setWorldPosition(xAndYPosition);
    };

    /**
     * Gives you the x and y position in world coordinates from an index
     * @param index Index of entity
     * @returns {*}
     */
    var getXAndYPositionFromIndex = function(index) {
        if (index > board.length - 1) // index does not exist on board
            return undefined;
        return new THREE.Vector2(Math.floor(index / width) * scale,
            (index % width) * scale);//.add(centerOffset);
    };

    /**
     * Returns first empty index
     * @returns {*} Will return index of first empty spot on board, if the board is full, returns undefined
     */
    var getEmptyPosition = function() {
        // go from left to right, up to down, to find empty position in board
        for (var y = 0; y != height; y++)
            for (var x = 0; x != width; x++) {
                var i = y * width + x
                if (board[i] === undefined)
                    return i;
            }
        return undefined;
    };

    this.print = function() {
        for (var y = 0; y != height; y++)
            for (var x = 0; x != width; x++)
            console.log('board[{0}, {1}]'.format(x, y), board[y * width + x])
    };

    /**
     * Returns size of board as if it was an array
     * @returns {number} Width * height
     */
    this.size = function() {
        return width * height;
    };
};