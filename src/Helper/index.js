function sortAsc(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0;
};

function sortDes(a, b) {
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0;
};

module.exports = {
    sortAsc,
    sortDes
}