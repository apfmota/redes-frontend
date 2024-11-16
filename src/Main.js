import './Main.css';
import DataVisualization from './DataVisualization'
import {getJsonResponse} from "./APIFunctions";
import {useState} from "react";


function Main() {
    const [currentProtocolVisualization, setCurrentProtocolVisualization] = useState(null)
    const [selectedProtocol, setSelectedProtocol] = useState(null)
    const [jsonResponse, setJsonResponse] = useState(null)

    const sendFile = async (selectedProtocol, file) => {
        //setJsonResponse(await getJsonResponse(file, selectedProtocol))
        setCurrentProtocolVisualization(selectedProtocol)
    }

    return (
        <div className="main card">
            <div className="sidebar">
                <p>v1.1.9</p>
                <h2>Arquivos padrões:</h2>
                <ul className="ul--default--file">
                    <li className="li--default--file">
                        <button className="li--button--file" value="IP"
                                onClick="selectFile(event, event.target.value, `./api/trabalho1.pcapng`)">Arquivo
                            IP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="ARP"
                                onClick="selectFile(event, event.target.value, `./api/arp.pcap`)">
                            Arquivo ARP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="RIP"
                                onClick="selectFile(event, event.target.value, `./api/rip.pcap`)">
                            Arquivo RIP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="UDP"
                                onClick="selectFile(event, event.target.value, `./api/udp.pcap`)">
                            Arquivo UDP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="TCP"
                                onClick="selectFile(event, event.target.value, `./api/tcp.pcap`)">
                            Arquivo TCP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="HTTP"
                                onClick="selectFile(event, event.target.value, `./api/http.pcap`)">
                            Arquivo HTTP
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="DNS"
                                onClick="selectFile(event, event.target.value, `./api/dns.pcap`)">
                            Arquivo DNS
                        </button>
                    </li>
                    <li className="li--default--file">
                        <button className="li--button--file" value="SNMP"
                                onClick="selectFile(event, event.target.value, `./api/snmp.pcap`)">
                            Arquivo SNMP
                        </button>
                    </li>
                </ul>
            </div>
            <div className="container ">
                <form className="file--container">
                    <div className="input--file--container">
                        <label className="input--file--label" htmlFor="input--file">Selecione seu arquivo</label>
                        <input id="input--file" type='file'/>
                        <i className="icon--close fa fa-times fa-lg hidden" aria-hidden="true" onClick="removeFile(event)"></i>
                    </div>
                    <div className="protocol--container">
                        <div>Protocolo</div>
                        <select onChange={(e) => setSelectedProtocol(e.target.value)} id="protocol--select">
                            <option>IP</option>
                            <option>ARP</option>
                            <option>RIP</option>
                            <option>UDP</option>
                            <option>TCP</option>
                            <option>HTTP</option>
                            <option>DNS</option>
                            <option>SNMP</option>
                        </select>
                    </div>
                    <button type="button"  className="send--file--button" onClick={() => sendFile(selectedProtocol, null)}>Enviar</button>
                    <div className="icon--load--container">
                        <i className="icon--load hidden fa-solid fa-circle-notch fa-xl"></i>
                    </div>
                </form>
                <div className="main--api">
                    <DataVisualization protocol={currentProtocolVisualization} jsonResponse={jsonResponse}/>
                </div>
            </div>
        </div>

    );
}

export default Main;
