/**
 * Created by David Harris on 12/5/2014.
 */

/**
 * Holds all game entities - player, enemies, allies, etc.
 */
APOPHENIA.EntityManager = function() {

    var self = this;
    var player = undefined;
    var entities = [];

    /**
     * Adds entity to board, and decides where they should go
     * @param entity The boardless entity
     * @returns {boolean} If there was room on the board or not
     */
    this.add = function(entity) {
        entities.push(entity);
        APOPHENIA.addEntityToScene(entity);
        if (entity.name == 'player')
            player = entity;
    };

    /**
     * Removes entity from board
     * @param index Index of entity
     * @returns {boolean} True if entity exists in board and was removed, false if not
     */
    this.remove = function(entity) {
        entities.splice(entities.indexOf(entity), 1);
    };

    this.updateEntities = function(delta) {
        entities.forEach(function(e) {
            e.update(delta);
        });
    };

    this.getPlayer = function() {
        return player;
    };
};