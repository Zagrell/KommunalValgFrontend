const tableBody = document.getElementById("candidates-tbody");
const sortSelect = document.getElementById("sort-by-party-select");
fillPartySelect(sortSelect,0);

fetchCandidates();

function fetchCandidates(){
    tableBody.innerHTML = "";
    if(sortSelect.value === "all"){
        fetchAll();
    }else {
        fetchPartyCandidates(sortSelect.value);
        fetchPartyVotes();
    }
}

function fetchPartyCandidates(partyId) {
    fetch("http://localhost:8080/candidates/party/" + partyId)
        .then(response => response.json())
        .then(candidates => {
            candidates.map(createTableRow)
        });
}

function fetchAll(){
    fetch("http://localhost:8080/candidates")
        .then(response => response.json())
        .then(candidates => {
            candidates.map(createTableRow)
        });
}

function createTableRow(candidate) {
    const tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    constructTableRow(tableRow, candidate);
}

function constructTableRow(tableRow, candidate) {
    tableRow.innerHTML = "";
    const tableData = []
    for (let i = 0; i < 4; i++) {
        tableData.push(document.createElement("td"))
        tableRow.appendChild(tableData[i]);
    }

    const updateButton = document.createElement("button");
    updateButton.innerText = "✏️";
    updateButton.onclick = () => updateCandidate(candidate, tableData, updateButton, submitUpdateButton);

    const submitUpdateButton = document.createElement("button");
    submitUpdateButton.innerText = "✔️";
    submitUpdateButton.style.display = "none";
    submitUpdateButton.onclick = () => submitUpdateCandidate(candidate, tableData, tableRow);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.onclick = () => deleteCandidate(candidate, tableRow);

    tableData[0].innerText = candidate.name;
    tableData[1].innerText = candidate.party.name;
    tableData[2].innerText = candidate.votes;
    tableData[3].appendChild(updateButton);
    tableData[3].appendChild(submitUpdateButton);
    tableData[3].appendChild(deleteButton);
}

function updateCandidate(candidate, tableData, updateButton, submitUpdateButton) {
    tableData[0].innerText = "";
    tableData[1].innerText = "";
    tableData[2].innerText = "";

    const nameInput = document.createElement("input");
    const partySelect = document.createElement("select");
    const votesInput = document.createElement("input");
    votesInput.type = "number";

    nameInput.value = candidate.name;
    fillPartySelect(partySelect, candidate.party.id)
    votesInput.value = candidate.votes;

    tableData[0].appendChild(nameInput);
    tableData[1].appendChild(partySelect);
    tableData[2].appendChild(votesInput);
    updateButton.style.display = "none";
    submitUpdateButton.style.display = "";
}

function fillPartySelect(partySelect, previousPartyId) {
    fetch("http://localhost:8080/parties")
        .then(response => response.json())
        .then(parties => {
            parties.map(party => {
                const partyOption = document.createElement("option");
                partySelect.appendChild(partyOption);
                partyOption.value = party.id;
                partyOption.text = party.name;
                if (party.id === previousPartyId)
                    partyOption.selected = true;
            });
        });
}

function submitUpdateCandidate(previousCandidate, tableData, tableRow) {
    const newCandidate = {
        name: tableData[0].firstChild.value,
        party: {
            id: Number(tableData[1].firstChild.value),
            name: tableData[1].firstChild.options[tableData[1].firstChild.selectedIndex].text
        },
        votes: Number(tableData[2].firstChild.value)
    };

    fetch("http://localhost:8080/candidates/" + previousCandidate.id, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newCandidate)
    }).then(response => {
        if (response.status === 200) {
            newCandidate.id = previousCandidate.id;
            constructTableRow(tableRow, newCandidate);
            fetchPartyVotes(sortSelect.value)
        }
    })

}

function deleteCandidate(candidate, tableRow) {
    if (confirm("er du sikker på at du vil slette " + candidate.name)) {
        fetch("http://localhost:8080/candidates/" + candidate.id, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                tableRow.remove();
            }
        })
    }

}

sortSelect.addEventListener("change",fetchCandidates);