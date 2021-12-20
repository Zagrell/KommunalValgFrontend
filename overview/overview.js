const partyWrapper = document.getElementById("party-wrapper");

fetch("http://localhost:8080/parties/totalvotes/percentages")
    .then(response => response.json())
    .then(partyPercentages => {
        partyPercentages.map(createPartyCard)
    })

function createPartyCard(partyPercentage) {
    const cardElement = document.createElement("div");
    partyWrapper.appendChild(cardElement);

    cardElement.className = "card";
    cardElement.innerHTML = `
        <p>${escapeHTML(partyPercentage.party.name)}</p>
        <p>${escapeHTML(partyPercentage.percentage.toString())}% af stemmerne</p>
        <p>med ${escapeHTML(partyPercentage.votes.toString())} stemmer</p>
    `;
}
