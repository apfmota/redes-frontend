import { Table } from "antd";
import { getUniqueEl } from "./Main";

function ARPVisualization({ jsonResponse }) {

    const lista = Object.keys(jsonResponse.IPs).map(key => ({
        IP: jsonResponse.IPs[key],
        MAC: jsonResponse.MACs[key],
        Company: jsonResponse.Company[key]
    }));

    const columns = [
        {
            title: 'IP',
            dataIndex: 'IP',
            key: 'IP',
        },
        {
            title: 'MAC',
            dataIndex: 'MAC',
            key: 'MAC',
        },
        {
            title: 'Empresa',
            dataIndex: 'Company',
            key: 'Company',
            filters: getUniqueEl(lista, 'Company').map((company) => ({
                text: company,
                value: company,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.Company.includes(value),
        },
    ];

    return (
        <Table columns={columns} dataSource={lista} title={() => "Tabela de endereços mac's e sua empresas fabricantes"} pagination={{ pageSize: 8, }} style={{ overflow: "scroll" }} />
    )
}

export default ARPVisualization;