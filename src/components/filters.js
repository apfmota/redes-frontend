import "../styles/filters.css";
import { useContextProvider } from "../context/context";
import { getJsonResponse } from "../APIFunctions";
import { useState } from "react";
import { Button, Select, Upload, message, Spin } from "antd";
import { UploadOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

const Filters = () => {
    const { selectedProtocol, setSelectedProtocol, setCurrentProtocolVisualization, setJsonResponse, loading, setLoading, setPendingReloads } = useContextProvider();

    const [messageApi, contextHolder] = message.useMessage();

    const [fileList, setFileList] = useState([]);

    const sendFile = async () => {
        if (fileList.length === 0) {
            messageApi.open({
                type: "error",
                content: "Adicione um arquivo."
            });
            return;
        }

        if (selectedProtocol === null) {
            messageApi.open({
                type: "error",
                content: "Selecione um protocolo."
            });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', fileList.at(-1).originFileObj);

        setJsonResponse(await getJsonResponse(formData, selectedProtocol))
        setCurrentProtocolVisualization(selectedProtocol)


        if (selectedProtocol === "IP") setPendingReloads(5);

        setLoading(false);
    }

    const removeFile = () => {
        setFileList([]);
    };

    const handleChange = (protocol) => {
        setSelectedProtocol(protocol)
    }

    const handleWithFile = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const items = [
        { value: "IP", label: "IP" },
        { value: "ARP", label: "ARP" },
        { value: "RIP", label: "RIP" },
        { value: "UDP", label: "UDP" },
        { value: "TCP", label: "TCP" },
        { value: "HTTP", label: "HTTP" },
        { value: "DNS", label: "DNS" },
        { value: "SNMP", label: "SNMP" },
    ]


    return (
        <div className="file--container">
            {contextHolder}
            <div style={{ display: "flex", gap: ".3rem" }}>
                <Upload
                    beforeUpload={() => true}
                    showUploadList={false}
                    onChange={handleWithFile}
                    fileList={fileList}
                >
                    <Button icon={<UploadOutlined />}>{fileList.at(-1) ? fileList.at(-1).originFileObj.name : "Adicionar arquivo"}</Button>
                </Upload>

                {fileList.length !== 0 && (
                    <Button color="danger" variant="text" shape="circle" icon={<DeleteOutlined />} onClick={removeFile} />
                )}
            </div>

            <Select
                showSearch
                placeholder={"Protocolo"}
                optionFilterProp="label"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={items}
            />

            <Button type="primary" shape="round" size="middle" onClick={sendFile}>Enviar</Button>

            {loading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
        </div>
    );

}

export default Filters;


{/* <div className="icon--load--container">
                <i className="icon--load hidden fa-solid fa-circle-notch fa-xl"></i>
            </div> */}

{/* <button type="button" className="send--file--button" onClick={() => sendFile(selectedProtocol, file)}>Enviar</button> */ }


{/* <div className="protocol--container">
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
            </div> */}