// Define matches as an empty array to store ongoing matches
let matches = [];

// Function to start a new game and add it to the scoreboard
function startGame() {
    // Get home team and away team input values from the form
    const homeTeam = document.getElementById('home-team').value.trim();
    const awayTeam = document.getElementById('away-team').value.trim();

    // Validate input values
    if (!homeTeam || !awayTeam) {
        alert("Please enter both home team and away team.");
        return;
    }

    // Add the new match to the matches array with initial score of 0-0
    matches.push({ homeTeam, awayTeam, homeScore: 0, awayScore: 0 });

    // Update the scoreboard to display the new match
    updateScoreboard();
}

// Function to update the score of an ongoing match
function updateScore() {
    // Get home team, away team, home score, and away score input values from the form
    const homeTeam = document.getElementById('home-team').value.trim();
    const awayTeam = document.getElementById('away-team').value.trim();
    const homeScore = parseInt(document.getElementById('home-score').value.trim());
    const awayScore = parseInt(document.getElementById('away-score').value.trim());

    // Validate input values
    if (!homeTeam || !awayTeam || isNaN(homeScore) || isNaN(awayScore)) {
        alert("Please enter valid values for home score and away score.");
        return;
    }

    // Find the index of the match in the matches array
    const matchIndex = matches.findIndex(match => match.homeTeam === homeTeam && match.awayTeam === awayTeam);

    // Update the score of the match if found
    if (matchIndex !== -1) {
        matches[matchIndex].homeScore = homeScore;
        matches[matchIndex].awayScore = awayScore;
    } else {
        alert("Match not found. Please make sure you have started the game.");
    }

    // Update the scoreboard to display the updated score
    updateScoreboard();
}

// Function to finish a game currently in progress
function finishGame(homeTeam, awayTeam) {
    // Filter out the match from the matches array
    matches = matches.filter(match => !(match.homeTeam === homeTeam && match.awayTeam === awayTeam));

    // Update the scoreboard to remove the finished match
    updateScoreboard();
}

// Function to update the scoreboard table
function updateScoreboard() {
    // Get the scoreboard body element
    const scoreboardBody = document.getElementById('scoreboard-body');

    // Clear the existing scoreboard table
    scoreboardBody.innerHTML = '';

    // Sort matches by total score and start time
    const sortedMatches = matches.sort((a, b) => {
        const totalScoreA = a.homeScore + a.awayScore;
        const totalScoreB = b.homeScore + b.awayScore;
        if (totalScoreA !== totalScoreB) {
            return totalScoreB - totalScoreA;
        } else {
            return matches.indexOf(b) - matches.indexOf(a);
        }
    });

    // Iterate over sorted matches to populate the scoreboard table
    sortedMatches.forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${match.homeTeam}</td>
            <td>${match.awayTeam}</td>
            <td>${match.homeScore}</td>
            <td>${match.awayScore}</td>
            <td><button class="action-button" onclick="finishGame('${match.homeTeam}', '${match.awayTeam}')">Finish</button></td>
        `;
        scoreboardBody.appendChild(row);
    });
}

// Example usage with some games already on the table
matches.push({ homeTeam: "Mexico", awayTeam: "Canada", homeScore: 0, awayScore: 5 });
matches.push({ homeTeam: "Spain", awayTeam: "Brazil", homeScore: 10, awayScore: 2 });
matches.push({ homeTeam: "Germany", awayTeam: "France", homeScore: 2, awayScore: 2 });
matches.push({ homeTeam: "Uruguay", awayTeam: "Italy", homeScore: 6, awayScore: 6 });
matches.push({ homeTeam: "Argentina", awayTeam: "Australia", homeScore: 3, awayScore: 1 });
updateScoreboard();


