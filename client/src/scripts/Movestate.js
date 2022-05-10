const UP = Symbol('up');
const DOWN = Symbol('down');
const NONE = Symbol('none');

export default class MoveStat {
    static get UP() {
        return UP;
    }

    static get DOWN(){
        return DOWN;
    }

    static get NONE() {
        return NONE;
    }
 }