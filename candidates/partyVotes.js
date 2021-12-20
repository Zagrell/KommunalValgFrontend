const partyVotesDiv = document.getElementById("party-votes-div");

function fetchPartyVotes() {
    fetch("http://localhost:8080/parties/" + sortSelect.value)
        .then(response => response.json())
        .then(totalPartyVotes)
}

function totalPartyVotes(party) {

    fetch("http://localhost:8080/parties/" + party.id + "/totalvotes")
        .then(response => response.json())
        .then(votes => {
            return constructPartyVoteDiv(party,votes);
        })
}

function constructPartyVoteDiv(party, totalVotes) {
    console.log(totalVotes);
    partyVotesDiv.innerHTML = `
   <p>${escapeHTML(party.name)} har ${escapeHTML(totalVotes.toString())} stemmer </p>
   `;
}
