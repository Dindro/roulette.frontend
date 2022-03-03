function random(min, max) {
	return min + Math.random() * (max - min);
}

function mixArray(array) {
	return array.map(item => item).sort(() => Math.random()  -0.5);
}

export {
	random,
	mixArray,
};
