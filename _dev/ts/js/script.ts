/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
// ↑ jQueryを使う場合パスを通す

'use strict'
/* common */

class Hello {
	holder: Element;

	constructor() {
		this.holder = document.getElementById('hello');
		this.int();
	}

	int() {
		this.writeHello();
	}

	writeHello() {
		this.holder.textContent = '完全に理解した';
	}
}

const hello = new Hello;
