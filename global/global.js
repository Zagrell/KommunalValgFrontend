const navBar = document.getElementById("nav-bar");

navBar.innerHTML = `
    <a href="../candidates/candidates.html">Kandidater</a>
    <a href="../overview/overview.html">Stemmefordeling</a>
    `;

function escapeHTML(string) {

    if (!string) {
        return "";
    }
    string = string.replace(`&`, "&amp;");
    string = string.replace(`>`, "&gt;");
    string = string.replace(`<`, "&lt;");
    string = string.replace(`"`, "&quot;");
    string = string.replace(`/`, "&#039;");
    return string;
}