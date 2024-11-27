import { Table } from 'antd';
import { getUniqueEl } from './Main';

function DNSVisualization({ jsonResponse }) {
    const columns = [
        {
            title: 'IP de Origem',
            dataIndex: 'src_ip',
            key: 'src_ip',
        },
        {
            title: 'Domínio',
            dataIndex: 'domains',
            key: 'domains',
            ellipsis: true,
        },
        {
            title: 'Número de Consultas',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Tipo de Consulta',
            dataIndex: 'types',
            key: 'types',
            filters: getUniqueEl(jsonResponse, 'types').map((type) => ({
                text: type,
                value: type,
            })),
            render: (types) => types.join(', '),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.types.includes(value),
            ellipsis: true,

        },
        {
            title: 'IPs do Domínio',
            dataIndex: 'domains_ips',
            key: 'domains_ips',
            render: (ips) => ips.join(', '),
            ellipsis: true,
        },
    ];

    return <Table columns={columns} dataSource={jsonResponse} pagination={{ pageSize: 8, }} style={{ overflow: "scroll" }} />;
}

export default DNSVisualization;