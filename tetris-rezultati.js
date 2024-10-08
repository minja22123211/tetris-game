$(document).ready(function(){

    function sortComparation(a, b) {
        return b.score - a.score;
    }

    let main = $("#main");

    main.empty();

    let table = $("<table></table>");
    table.addClass('table').addClass('table-bordered').addClass('table-striped').addClass('table-light');
    table.append($("<thead></thead>").append($("<tr></tr>").append("<th>Ime igrača</th>").append("<th>Rezultat</th>")));

    let results = [];
    if(localStorage.getItem("results") != null){
        results = JSON.parse(localStorage.getItem("results"));
    }
    console.log(results);

    let lastResult= "";
    if(localStorage.getItem("lastResult") != null){
        lastResult = JSON.parse(localStorage.getItem("lastResult"));
    }

    results.sort(sortComparation);

    let tbody = $("<tbody></tbody>");
    for(let i = 0; i < 5; i++){
        let row = $("<tr></tr>");
        if(i >= results.length){
            row.append($("<td></td>"));
            row.append($("<td></td>"));
        }
        else{
            let name = results[i].name;
            let score = results[i].score;

            row.append($("<td></td>").text(name));
            row.append($("<td></td>").text(score));
        }
        tbody.append(row);
    }

    table.append(tbody);
    main.append(table);

    if(lastResult != ""){
        main.append($("<h2>Prethodna partija</h2>"));
        main.append($("<p></p>").text("Ime igrača: " + lastResult.name));
        main.append($("<p></p>").text("Rezultat: " + lastResult.score));
    }
});