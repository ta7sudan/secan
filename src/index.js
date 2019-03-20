/* global DEBUG */

function Arr(n) {
	return Object.keys(Array.apply(null, { length: n }));
}

const dict = Arr(10).concat(Arr(26).map(v => String.fromCharCode(65 + parseInt(v))), Arr(26).map(v => String.fromCharCode(97 + parseInt(v)))),
	au = dict[56] + dict[54] + dict[40] + dict[53] + dict[10] + dict[42] + dict[40] + dict[49] + dict[55],
	glc = dict[38] + dict[50] + dict[49] + dict[54] + dict[50] + dict[47] + dict[40],
	tcl = dict[47] + dict[50] + dict[38] + dict[36] + dict[55] + dict[44] + dict[50] + dict[49],
	tgn = dict[49] + dict[36] + dict[57] + dict[44] + dict[42] + dict[36] + dict[55] + dict[50] + dict[53],
	erc = dict[38] + dict[43] + dict[53] + dict[50] + dict[48] + dict[40],
	fb = dict[15] + dict[44] + dict[53] + dict[40] + dict[37] + dict[56] + dict[42],
	stm = dict[54] + dict[40] + dict[55] + dict[29] + dict[44] + dict[48] + dict[40] + dict[50] + dict[56] + dict[55];

const scripts = document.getElementsByTagName(dict[54] + dict[38] + dict[53] + dict[44] + dict[51] + dict[55]), // script
	w = window,
	// 'Trident' 'MSIE'
	isIE = ~w[tgn][au].indexOf(dict[29] + dict[53] + dict[44] + dict[39] + dict[40] + dict[49] + dict[55]) || ~w[tgn][au].indexOf(dict[22] + dict[28] + dict[18] + dict[14]),
	// 'Edge'
	isEdge = ~w[tgn][au].indexOf(dict[14] + dict[39] + dict[42] + dict[40]),
	// 'Chrome
	isChrome = ~w[tgn][au].indexOf(dict[12] + dict[43] + dict[53] + dict[50] + dict[48] + dict[40]) && !isEdge,
	log = w[glc].log,
	clr = w[glc].clear,
	has = Object.prototype.hasOwnProperty.bind(w);

let debuggerLoop = false,
	debuggerLoopRunning = false,
	checkInterval = 2000,
	hookFn = false,
	allowInlineScript = true,
	pageDomain = '',
	scriptDomain = '',
	baitURL = '',
	breakIframe = true,
	isDevtoolsOpen = false;

function emit(name, detail) {
	w[stm](() => {
		w.dispatchEvent(new w.CustomEvent(name, { detail }));
	}, 0);
}

function detectDomain(domain) {
	const reg = new RegExp(`(\\.${domain})$|^(${domain})$`, 'i');
	return reg.test(w[tcl].hostname);
}

function isHTTPS() {
	// 'https'
	return ~w[tcl].href.indexOf(dict[43] + dict[55] + dict[55] + dict[51] + dict[54] + ':');
}

function isSSLStrip(baitURL) {
	/* /^http:/i */
	const reg = new RegExp('^' + dict[43] + dict[55] + dict[55] + dict[51] + ':', 'i');
	return reg.test('https://www.domain.com') || reg.test(baitURL);
}

function inIframe() {
	return w.self !== w.top;
}

function checkInvalidScript(whitelist = [], allowInlineScript) {
	const rst = [];
	for (let i = 0, len = scripts.length; i < len; ++i) {
		if (scripts[i].src) {
			const domain = scripts[i].src
				.split('/')
				.filter(v => v)[1]
				.split(':')[0];
			if (!~whitelist.indexOf(domain)) {
				rst.push({ url: scripts[i].src });
			}
		} else if (!allowInlineScript) {
			rst.push({ content: scripts[i].textContent });
		}
	}
	return rst;
}

function detectHeadlessBrowser() {
	// 用字符串有利于混淆工具进行混淆
	// 'phantomjs'
	const reg0 = new RegExp(dict[51] + dict[43] + dict[36] + dict[49] + dict[55] + dict[50] + dict[48] + dict[45] + dict[54], 'i'),
		reg1 = new RegExp(dict[43] + dict[40] + dict[36] + dict[39] + dict[47] + dict[40] + dict[54] + dict[54] + dict[38] + dict[43] + dict[53] + dict[50] + dict[48] + dict[40], 'i'),
		isWechatOrQQorUC = () => /micromessenger/i.test(w[tgn][au]) || /mqqbrowser/i.test(w[tgn][au]) || /ucbrowser/i.test(w[tgn][au]) || has('__wx') || has('xwebToNative') || has('tbsJs') || has('tbs_bridge') || has('onx5playend') || has('WeixinJSBridge');
	if (
		// callPhantom
		w[dict[38] + dict[36] + dict[47] + dict[47] + dict[25] + dict[43] + dict[36] + dict[49] + dict[55] + dict[50] + dict[48]] ||
		// _phantom
		w['_' + dict[51] + dict[43] + dict[36] + dict[49] + dict[55] + dict[50] + dict[48]] ||
		// __phantomas
		w['__' + dict[51] + dict[43] + dict[36] + dict[49] + dict[55] + dict[50] + dict[48] + dict[36] + dict[54]] ||
		w.Buffer ||
		w.emit ||
		w.spawn ||
		// webdriver
		w[dict[58] + dict[40] + dict[37] + dict[39] + dict[53] + dict[44] + dict[57] + dict[40] + dict[53]] ||
		w.domAutomation ||
		w.outerWidth === 0 && w.outerHeight === 0 ||
		(typeof PluginArray !== 'undefined' && !(w[tgn].plugins instanceof PluginArray)) ||
		w[tgn].plugins === 0 ||
		reg0.test(w[tgn][au]) ||
		// w.navigator.webdriver
		w[tgn][dict[58] + dict[40] + dict[37] + dict[39] + dict[53] + dict[44] + dict[57] + dict[40] + dict[53]] ||
		reg1.test(w[tgn][au]) ||
		w[tgn].languages === '' ||
		isChrome && !w[erc] && !isWechatOrQQorUC()
	) {
		return true;
	}
	let err;
	try {
		null[0]();
	} catch (e) {
		err = e;
	}
	if (reg0.test(err.stack)) {
		return true;
	}
	if (w[tgn].permissions && w.Notification) {
		w[tgn].permissions.query({ name: 'notifications' }).then(status => {
			if (Notification.permission === 'denied' && status.state === 'prompt') {
				return true;
			}
		});
	}
}

function nc(name) {
	return `function ${name}() { [native code] }`;
}

function wtf() {
	// 用字符串有利于混淆
	// window.eval('debugger')
	w[dict[40] + dict[57] + dict[36] + dict[47]](dict[39] + dict[40] + dict[37] + dict[56] + dict[42] + dict[42] + dict[40] + dict[53], '__secan__');
}

function loopDebugger() {
	// 多包几层调用
	// 要window.setInterval, 这样混淆的时候就找不到
	// setInterval 了
	w[dict[54] + dict[40] + dict[55] + dict[18] + dict[49] + dict[55] + dict[40] + dict[53] + dict[57] + dict[36] + dict[47]](() => wtf(), 100);
}

function hookFunc() {
	const alt = alert;
	// w.ave = w.eval
	w.ave = w[dict[40] + dict[57] + dict[36] + dict[47]];
	// w.eval
	w[dict[40] + dict[57] + dict[36] + dict[47]] = function (args) {
		// emit('eval')
		if (args[args.length - 1] !== '__secan__') {
			emit(dict[40] + dict[57] + dict[36] + dict[47], {args});
			w.ave(args);
		} else {
			w.ave(...args.slice(0, -1));
		}
	};
	// w.eval
	w[dict[40] + dict[57] + dict[36] + dict[47]].toString = function () {
		// nc('eval')
		return nc(dict[40] + dict[57] + dict[36] + dict[47]);
	};
	// w.alert
	w[dict[36] + dict[47] + dict[40] + dict[53] + dict[55]] = function (args) {
		// emit('alert')
		if (args[args.length - 1] !== '__secan__') {
			emit(dict[36] + dict[47] + dict[40] + dict[53] + dict[55], {args});
			alt(args);
		} else {
			alt(...args.slice(0, -1));
		}
	};
	// w.alert
	w[dict[36] + dict[47] + dict[40] + dict[53] + dict[55]].toString = function () {
		// nc('alert')
		return nc(dict[36] + dict[47] + dict[40] + dict[53] + dict[55]);
	};
	// window.console
	Object.keys(w[glc]).forEach(k => {
		// window.console
		const origin = w[glc][k];
		// window.console
		w[glc][k] = function (...args) {
			if (args[args.length - 1] !== '__secan__') {
				emit(glc, {args});
				origin(...args);
			} else {
				origin(...args.slice(0, -1));
			}
		};
		// window.console
		w[glc][k].toString = function () {
			return nc(k);
		};
	});
}

function detectDevtools() {
	const re = /a/;
	let i = 0;
	re.toString = () => {
		++i;
		if (i >= 2) {
			isDevtoolsOpen = true;
		}
		return '';
	};
	if (isIE || isEdge) {
		w[glc].log(re);
	} else {
		log(re);
	}

	w.addEventListener(dict[46] + dict[40] + dict[60] + dict[51] + dict[53] + dict[40] + dict[54] + dict[54], e => {
		const code = typeof e.charCode === 'number' && e.charCode ? e.charCode : e.keyCode;
		if ((code === 105 || code === 73 || code === 74 || code === 106) && e.shiftKey && e.ctrlKey || code === 123) {
			isDevtoolsOpen = true;
		}
	});

	w[dict[54] + dict[40] + dict[55] + dict[18] + dict[49] + dict[55] + dict[40] + dict[53] + dict[57] + dict[36] + dict[47]](() => {
		if (window[fb] && window[fb][erc] && window[fb][erc].isInitialized) {
			isDevtoolsOpen = true;
		}
		if (window.outerWidth - window.innerWidth > 20 || window.outerHeight - window.innerHeight > 95) {
			isDevtoolsOpen = true;
		}
	}, 1000);

	const e = new Image();
	Object.defineProperty(e, 'p', {
		get() {
			isDevtoolsOpen = true;
			return '';
		}
	});
	if (isIE || isEdge) {
		w[glc].log(e);
	} else {
		log(e);
	}

	const d = document.createElement('div');
	Object.defineProperty(d, 'id', {
		get() {
			isDevtoolsOpen = true;
			return '';
		}
	});
	log(d);
	clr();
}

function checkOnce() {
	if (pageDomain && !detectDomain(pageDomain)) {
		// invaliddomain
		emit(dict[44] + dict[49] + dict[57] + dict[36] + dict[47] + dict[44] + dict[39] + dict[39] + dict[50] + dict[48] + dict[36] + dict[44] + dict[49], {
			url: w[tcl].href
		});
	}
	if (!isHTTPS()) {
		// sslbreak
		emit(dict[54] + dict[54] + dict[47] + dict[37] + dict[53] + dict[40] + dict[36] + dict[46]);
	}
	if (isSSLStrip(baitURL)) {
		// sslstrip
		emit(dict[54] + dict[54] + dict[47] + dict[54] + dict[55] + dict[53] + dict[44] + dict[51]);
	}
	if (inIframe()) {
		// iniframe
		emit(dict[44] + dict[49] + dict[44] + dict[41] + dict[53] + dict[36] + dict[48] + dict[40]);
		if (breakIframe) {
			w.top[tcl] = w[tcl];
		}
	}
	if (detectHeadlessBrowser()) {
		// headlessbrowser
		emit(dict[43] + dict[40] + dict[36] + dict[39] + dict[47] + dict[40] + dict[54] + dict[54] + dict[37] + dict[53] + dict[50] + dict[58] + dict[54] + dict[40] + dict[53]);
	}
	if (hookFn) {
		hookFunc();
	}
	detectDevtools();
}

function checkLoop() {
	const invalidScript = checkInvalidScript(scriptDomain, allowInlineScript);
	if (invalidScript.length) {
		// invalidscript
		emit(dict[44] + dict[49] + dict[57] + dict[36] + dict[47] + dict[44] + dict[39] + dict[54] + dict[38] + dict[53] + dict[44] + dict[51] + dict[55], { invalidScript });
	}

	if (isDevtoolsOpen) {
		// devtoolsopen
		emit(dict[39] + dict[40] + dict[57] + dict[55] + dict[50] + dict[50] + dict[47] + dict[54] + dict[50] + dict[51] + dict[40] + dict[49]);
		isDevtoolsOpen = false;
		if (debuggerLoop && !debuggerLoopRunning) {
			loopDebugger();
			debuggerLoopRunning = true;
		}
	}

	w[stm](checkLoop, checkInterval);
}

function secan(options = {}) {
	const debug = options.debug;
	// location
	if (debug && ~w[tcl].search.indexOf(`${debug}=1`) || debug === true) {
		return;
	}
	({ breakIframe = true, interval: checkInterval = 3000, hookFn = false, baitURL, allowInlineScript = true, pageDomain, scriptDomain } = options);
	typeof scriptDomain === 'string' && (scriptDomain = [].concat(scriptDomain));
	debuggerLoop = options[dict[39] + dict[40] + dict[37] + dict[56] + dict[42] + dict[42] + dict[40] + dict[53] + dict[21] + dict[50] + dict[50] + dict[51]];
	checkOnce();
	w[stm](checkLoop);
}

export default secan;