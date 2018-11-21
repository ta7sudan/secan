# secan
Tools for protecting your javascript code in browser.



## Installation

```shell
$ npm i -P secan
```



## Usage

```javascript
import secan from 'secan';
secan({
   debuggerLoop: true 
});
window.addEventListener('devtoolsopen', () => {
    console.log('What are you doing now?');
    // when you open devtools, this event will be emitted and you will get a debugger and a debugger...
});
```



## Options

* `interval` (`number`) By default, secan will perform a check every 3 seconds, this option can specify another value
* `debug` (`boolean` or `string`) If `true`, secan will not perform check, it is useful in development environment. If a string, for example, `debug: '__debug__'` when the URL of current page has a query string such as  `?__debug__=1`, secan will not perform check, it's a backdoor in production environment...
* `breakIframe` (`boolean`) If `true`, when current page in a `<iframe>`, secan will redirect `window.top` to current page, default `true`. But you still need to set a header `X-Frame-Options`, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options), this is the right way
* `debuggerLoop` (`boolean`) When secan detected the devtools open, secan will start a debugger loop to interfere debugging
* `hookFn` (`boolean`) If `true`, secan will hook `eval` `console` `alert`, and when these method called, secan will emit `window.addEventListener('eval')`, `window.addEventListener('console')` and `window.addEventListener('alert')`, if someone perform a XSS test, this may be useful
* `baitURL` (`string`) Must be a URL start with `https`, when sslstrip occurred, this URL will be `http` not `https` and secan can detect then emit a event `window.addEventListener('sslstrip')`
* `allowInlineScript` (`boolean`) Default `true`, secan will check all `<script>`, if `src` of `<script>` not in `scriptDomain`, secan will emit a event `window.addEventListener('invalidscript')`, if `allowInlineScript` is `true`, secan will also emit this event
* `scriptDomain` (`string` or `string[]`) A domain whitelist of `<script>` src, if a src of `<script>` not in `scriptDomain`, secan will emit a event `window.addEventListener('invalidscript')`
* `pageDomain` (`string`) If current domain is not `pageDomain`, secan will emit a event `window.addEventListener('invaliddomain')`



## Events

* `window.addEventListener('eval')` If `hookFn` is `true`, this event will be emitted when `eval` called, and the `event.detail.args` can get the arguments of this call
* `window.addEventListener('console')` If `hookFn` is `true`, this event will be emitted when `console[<method>]` called, and the `event.detail.args` can get the arguments of this call
* `window.addEventListener('alert')` If `hookFn` is `true`, this event will be emitted when `alert` called, and the `event.detail.args` can get the arguments of this call
* `window.addEventListener('invaliddomain')` If `pageDomain` set, and domain of current page is not `pageDomain`, this event will be emitted, and the `event.detail.url` can get the URL of current page
* `window.addEventListener('sslbreak')` If the URL of current page is not HTTPS, this event will be emitted
* `window.addEventListener('sslstrip')` If secan detected sslstrip, this event will be emitted
* `window.addEventListener('iniframe')` If secan detected that current page is in a `<iframe>`, this event will be emitted
* `window.addEventListener('headlessbrowser')` If secan detected that current page is in a headless browser, such as puppeteer or phantomJS, this event will be emitted
* `window.addEventListener('invalidscript')` Secan will check all `<script>`, if `src` of `<script>` not in `scriptDomain`, this event will be emitted
* `window.addEventListener('devtoolsopen')` If secan detected that devtools is open, this event will be emitted