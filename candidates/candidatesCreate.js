const newCandidateModal = document.getElementsByClassName("modal")[0];
const newCandidatePartySelect = document.getElementById("new-candidate-party-select");

fillPartySelect(newCandidatePartySelect, 0);


document.getElementById("new-candidate-submit").onclick = function () {
    const nameInput = document.getElementById("new-candidate-name-input");

    const newCandidate = {
        name: nameInput.value,
        party: {
            id: Number(newCandidatePartySelect.value),
            name: newCandidatePartySelect.options[newCandidatePartySelect.selectedIndex].text
        },
        votes: 0
    }
    fetch("http://localhost:8080/candidates",{
        method : "POST",
        headers : {"Content-type": "application/json; charset=UTF-8"},
        body : JSON.stringify(newCandidate)
    }).then(response => {
        if (response.status === 200){
            return response.json();
        }
    }).then(createdCandidate => {
        createTableRow(createdCandidate);
        nameInput.value = "";
        newCandidateModal.style.display = "none";
    });


}


document.getElementById("new-candidate-button").onclick = function () {
    newCandidateModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === newCandidateModal) {
        newCandidateModal.style.display = "none";
    }
}


document.getElementsByClassName("close")[0].onclick = function () {
    newCandidateModal.style.display = "none";
}
