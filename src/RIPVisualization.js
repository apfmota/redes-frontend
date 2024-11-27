import { Table, Tabs } from "antd";

function RIPVisualization({ jsonResponse }) {
    return (
        <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            style={{
                height: "100%",
            }}
            items={jsonResponse.map((obj, i) => {
                const columns = [
                    {
                        title: 'IP',
                        dataIndex: 'IP',
                        key: 'IP',
                    },
                    {
                        title: 'Mask',
                        dataIndex: 'mask',
                        key: 'mask',
                    },
                    {
                        title: 'Next',
                        dataIndex: 'next',
                        key: 'next',
                    },
                ];


                return {
                    label: `${obj.src} - ${obj.dst}`,
                    key: i,
                    children: <Table key={i} dataSource={obj.table} columns={columns} title={() => `Tabela de rotas ${obj.src} para ${obj.dst}`}/>,
                };
            })}
        />


    )
}

export default RIPVisualization;