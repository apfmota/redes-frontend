import IPVisualization from "./IPVisualization";

// Esse componente chama os componentes específicos para cada protocolo
function DataVisualization({ protocol, jsonResponse }) {
    if (protocol == null) {
        return (
            "Nada a mostrar"
        )
    } else if (protocol === "IP") {
        return <IPVisualization jsonResponse={jsonResponse}/>
    } else {
        return (
            <div>Exibindo protocolo {protocol}</div>
        )
    }
}

export default DataVisualization;