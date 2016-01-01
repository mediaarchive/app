/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

class Main extends MK.Object {
    constructor(data) {
        super()
        this.jset(data);
        pages._start();
        this.settings = new Settings();
    }
};