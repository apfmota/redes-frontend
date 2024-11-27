import "../styles/sidebar.css";
import { fetchFile, getJsonResponse } from "../APIFunctions";
import { Button } from "antd";
import { useContextProvider } from "../context/context";

const Sidebar = () => {
  const defaultFiles = [
    { name: "Arquivo IP", value: "IP", target: '../default-files/trabalho1.pcapng' },
    { name: "Arquivo ARP", value: "ARP", target: '../default-files/arp.pcap' },
    { name: "Arquivo RIP", value: "RIP", target: '../default-files/rip.pcap' },
    { name: "Arquivo UDP", value: "UDP", target: '../default-files/udp.pcap' },
    { name: "Arquivo TCP", value: "TCP", target: '../default-files/tcp.pcap' },
    { name: "Arquivo HTTP", value: "HTTP", target: '../default-files/http.pcap' },
    { name: "Arquivo DNS", value: "DNS", target: '../default-files/dns.pcap' },
    { name: "Arquivo SNMP", value: "SNMP", target: '../default-files/snmp.pcap' },
  ]

  return (
    <div className="sidebar">
      <h2>Arquivos padrões:</h2>
      <ul className="ul--default--file">
        {defaultFiles.map((file, index) => <Item name={file.name} value={file.value} target={file.target} key={index} />)}
      </ul>
    </div>

  );
};

const Item = ({ name, value, target }) => {
  const { setJsonResponse, setCurrentProtocolVisualization, setLoading, setPendingReloads, currentProtocolVisualization} = useContextProvider();

  const handleWithClick = async () => {
    setLoading(true);

    const fileBlob = await fetchFile(target);

    const formData = new FormData();
    formData.append('file', new File([fileBlob], value));

    setJsonResponse(await getJsonResponse(formData, value));
    setCurrentProtocolVisualization(value);

    if (value === "IP") setPendingReloads(5);

    setLoading(false);
  }

  return (
    <li className="li--default--file">
      <Button color="primary" variant={currentProtocolVisualization === value ? "solid" : "outlined"}className="li--button--file" value={value} onClick={handleWithClick}>
        {name}
      </Button>
    </li>
  );
};


export default Sidebar;


/**
 * const selectFile = (event, protocol, filePath) => {
  event.preventDefault();

  const load = document.getElementsByClassName("icon--load")[0];
  load.classList.remove("hidden");

  fetchFile(filePath).then(fileBlob => {
    const formData = new FormData();
    formData.append("file", new File([fileBlob], protocol));

    return fetch(`http://localhost:8000/uploadfile/${protocol}`, {
      method: "POST",
      body: formData,
    });
  }).then(async (response) => {
    const result = await response.json();
    showResults(result, protocol);
  }).catch((error) => {
    console.error('Error:', error);
  });
}

async function fetchFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fileBlob = await response.blob();
    return fileBlob;
  } catch (error) {
    console.error('Error fetching the file:', error);
    throw error;
  }
}
 * 
 * 
 */