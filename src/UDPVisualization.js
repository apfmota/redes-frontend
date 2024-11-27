import { Table } from "antd";


const UDPVisualization = ({ jsonResponse }) => {
    const columns = [
        {
            title: 'IP de origem',
            dataIndex: 'src_ip',
            key: 'src_ip',
        },
        {
            title: 'Serviços de origem',
            dataIndex: 'service_src',
            key: 'service_src',
            ellipsis: true,
        },
        {
            title: 'Pacotes',
            dataIndex: 'packets',
            key: 'packets',
            width: 100,
        },
        {
            title: 'Portas de destino',
            dataIndex: 'dst_port',
            key: 'dst_port',
            ellipsis: true,
        },
        {
            title: 'Serviços de destino',
            dataIndex: 'service_dst',
            key: 'service_dst',
            ellipsis: true,
        },
    ];

    const dataSource = Object.keys(jsonResponse).map((key) => ({
        src_ip: jsonResponse[key].src_ip,
        dst_port: jsonResponse[key].dst_port.filter((port) => port).join(", "),
        packets: jsonResponse[key].packets,
        service_src: jsonResponse[key].service_src.filter((service) => service).join(", "),
        service_dst: jsonResponse[key].service_dst.filter((service) => service).join(", "),
    }));

    return (
        <Table columns={columns} dataSource={dataSource} title={() => "Tráfego de Rede: Interações entre IPs, Portas e Serviços"} />
    );
}

export default UDPVisualization;
