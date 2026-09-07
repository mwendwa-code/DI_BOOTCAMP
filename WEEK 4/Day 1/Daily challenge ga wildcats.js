const gameInfo = [
	{
		username: "Elvis",
		team: "red",
		score: 55,
		items: ["ball", "eraser", "pen"],
	},
	{
		username: "stephanie",
		team: "green",
		score: 1,
		items: ["book", "pen"],
	},
];

const usernames = gameInfo.map((player) => `${player.username}!`);
console.log(usernames);

const winners = gameInfo
	.filter((player) => player.score > 5)
	.map((player) => player.username);
console.log(winners);

const totalScore = gameInfo.reduce((total, player) => total + player.score, 0);
console.log(totalScore);
