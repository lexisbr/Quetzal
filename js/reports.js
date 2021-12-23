function renderTablaErrores(tablaErrores) {
    let output = `
 
    <table style="border-collapse: collapse;
    ">
                    <tr>
                        <th style="border: 1px solid black;">Tipo</th>
                        <th style="border: 1px solid black;">Descripcion</th>
                        <th style="border: 1px solid black;">Linea</th>
                        <th style="border: 1px solid black;">Columna</th>
                        <th style="border: 1px solid black;">Ambito</th>
                    </tr>`;
    for (let error of tablaErrores) {
        output += `<tr>
                        <td style="border: 1px solid black;">${error.tipo}</td>
                        <td style="border: 1px solid black;">${error.descripcion}</td>
                        <td style="border: 1px solid black;">${error.linea}</td>
                        <td style="border: 1px solid black;">${error.columna}</td>
                        <td style="border: 1px solid black;">${error.ambito}</td>
                    <tr>`;
    }

    output += `</table>`;

    var win = window.open("", "Reporte de Errores", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
    win.document.body.innerHTML = output;
    win.document.head.innerHTML = `<link rel="stylesheet" href="../css/table.css" />`;


}