export default function secan(options: {
	debug: boolean | string,
	breakIframe: boolean,
	debuggerLoop: boolean,
	interval: number,
	hookFn: boolean,
	baitURL: string,
	allowInlineScript: boolean,
	pageDomain: string,
	scriptDomain: string | string[]
}): void;
