import ARPVisualization from "./ARPVisualization";
import IPVisualization from "./IPVisualization";
import RIPVisualization from "./RIPVisualization";
import UDPVisualization from "./UDPVisualization";
import TCPVisualization from "./TCPVisualization";
import HTTPVisualization from "./HTTPVisualization";
import DNSVisualization from "./DNSVisualization";
import SNMPVisualization from "./SNMPVisualization";

// Esse componente chama os componentes específicos para cada protocolo
const DataVisualization = ({ protocol, jsonResponse }) => {
    if (protocol === "IP") return <IPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "ARP") return <ARPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "RIP") return <RIPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "UDP") return <UDPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "TCP") return <TCPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "HTTP") return <HTTPVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "DNS") return <DNSVisualization jsonResponse={jsonResponse} />;
    else if (protocol === "SNMP") return <SNMPVisualization jsonResponse={jsonResponse} />;
}

export default DataVisualization;