import { Table } from 'antd';

function SNMPVisualization({ jsonResponse }) {
    const agents = Object.keys(jsonResponse.agents).map(ip => ({
        type: "Agente",
        ip,
        SNMPResponse: jsonResponse.agents[ip].SNMPresponse || "-",
        SNMPNext: "-",
    }));

    const managers = Object.keys(jsonResponse.managers).map(ip => ({
        type: "Gerente",
        ip,
        SNMPResponse: "-",
        SNMPNext: jsonResponse.managers[ip].SNMPnext || "-",
    }));

    const tableData = [...agents, ...managers];

    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'Agente',
                    value: 'Agente'
                },
                {
                    text: 'Gerente',
                    value: 'Gerente'
                }
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.type.includes(value),
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'SNMP Response',
            dataIndex: 'SNMPResponse',
            key: 'SNMPResponse',
        },
        {
            title: 'SNMP Next',
            dataIndex: 'SNMPNext',
            key: 'SNMPNext',
        },
    ];

    return <Table dataSource={tableData} columns={columns} pagination={{ pageSize: 8, }} />;
}

export default SNMPVisualization;