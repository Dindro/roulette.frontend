function easeOut(t, b, c, d) {
	const ts = (t /= d) * t;
	const tc = ts * t;
	return b + c * (tc + -3 * ts + 3 * t);
}

export {
	easeOut,
};
