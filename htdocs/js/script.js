/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
// ↑ jQueryを使う場合パスを通す
'use strict';
/* common */
var Hello = /** @class */ (function () {
    function Hello() {
        this.holder = document.getElementById('hello');
        this.int();
    }
    Hello.prototype.int = function () {
        this.writeHello();
    };
    Hello.prototype.writeHello = function () {
        this.holder.textContent = '完全に理解した';
    };
    return Hello;
}());
var hello = new Hello;
