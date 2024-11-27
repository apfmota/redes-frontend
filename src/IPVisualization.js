// import { Graph } from "react-d3-graph";
// import { useMemo, useState, useEffect } from "react";
// import { message, Tabs } from "antd";
// import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
// import { useContextProvider } from "./context/context";

// const IPVisualization = ({ jsonResponse }) => {

//     const { pendingReloads, setPendingReloads } = useContextProvider();

//     const { graph, ipsInfo } = jsonResponse;

//     const [view, setView] = useState(1);

//     const nodesSet = useMemo(() => new Set(), []);
//     const links = [];

//     // Iterar para preencher nós e links, contando as frequências
//     for (let ipSrc in graph) {
//         nodesSet.add(ipSrc);
//         for (let ipDst in graph[ipSrc]) {
//             nodesSet.add(ipDst);

//             links.push({
//                 source: ipSrc,
//                 target: ipDst,
//                 strokeWidth: graph[ipSrc][ipDst].times
//             });
//         }
//     }

//     const nodes = useMemo(() => Array.from(nodesSet).map(node => ({ id: node })), [nodesSet]);

//     const data = {
//         nodes: nodes,
//         links: links,
//         focusedNodeId: nodes[0].id
//     };

//     // A configuração do grafo
//     const myConfig = {
//         height: 600,
//         nodeHighlightBehavior: true,
//         maxZoom: 10,
//         minZoom: 0.3,
//         node: {
//             color: "lightgreen",
//             size: 120,
//             highlightStrokeColor: "blue",
//         },
//         link: {
//             highlightColor: "lightblue",
//             renderLabel: true,
//         },
//         d3: {
//             gravity: -1000,
//             linkLength: 200,
//             linkStrength: 0.1,
//         },
//     };

//     // Funções de clique para nós e links
//     const onClickNode = (nodeId) => {
//         message.info({
//             content: `IP ${nodeId}`,
//         })
//     };

//     const onClickLink = (source, target) => {
//         message.info({
//             content: `O IP ${source} comunicou-se ${graph[source][target].times}x com o IP ${target}`,
//         })
//     };

//     const handleChange = (key) => {
//         if (key === 1) setPendingReloads(5);
//         setView(key);
//     };

//     useEffect(() => {
//         if (pendingReloads > 0) {
//             setTimeout(() => {
//                 setPendingReloads(pendingReloads - 1);
//             }, 800);
//         }
//     })

//     return (
//         <>
//             <Tabs
//                 defaultActiveKey="1"
//                 type="card"
//                 size="middle"
//                 items={
//                     [
//                         {
//                             label: "Grafo",
//                             key: 1,
//                         },
//                         {
//                             label: "Mapa",
//                             key: 2,
//                         }
//                     ]
//                 }
//                 onChange={handleChange}
//             />

//             {view === 1 &&
//                 <Graph
//                     id="graph-id" // id is mandatory
//                     data={data}
//                     config={myConfig}
//                     onClickNode={onClickNode}
//                     onClickLink={onClickLink}
//                 />
//             }

//             {view === 2 && <MapContainer style={{ width: '100%', height: '100%' }} center={[0, 0]} zoom={2} scrollWheelZoom={true}>
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 {Object.keys(ipsInfo).map(ip => (
//                     <Marker position={[ipsInfo[ip].lat, ipsInfo[ip].lng]}>
//                         <Popup>{ip}</Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>}
//         </>
//     )
// }

// export default IPVisualization;


import { useEffect, useRef, useState, useMemo } from "react";
import { message, Tabs } from "antd";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";

const IPVisualization = ({ jsonResponse }) => {
  const { graph, ipsInfo } = jsonResponse;

  const [view, setView] = useState(1);

  const nodesSet = useMemo(() => new Set(), []);
  const links = [];

  // Iterar para preencher nós e links, contando as frequências
  for (let ipSrc in graph) {
    // Filtrando nós "No IP"
    if (ipSrc === "No IP") continue;

    nodesSet.add(ipSrc);
    for (let ipDst in graph[ipSrc]) {
      // Filtrando nós "No IP"
      if (ipDst === "No IP") continue;

      nodesSet.add(ipDst);

      links.push({
        source: ipSrc,
        target: ipDst,
        strokeWidth: graph[ipSrc][ipDst].times, // Número de pacotes
      });
    }
  }

  const nodes = useMemo(() => Array.from(nodesSet).map(node => ({ id: node })), [nodesSet]);

  const data = {
    nodes: nodes,
    edges: links.map(link => ({
      from: link.source,
      to: link.target,
      label: `${link.strokeWidth} packets`, // Exibir o número de pacotes na aresta
      title: `Times: ${link.strokeWidth}`, // Exibir o número de pacotes ao passar o mouse
      width: link.strokeWidth, // Ajustar a largura da aresta conforme o número de pacotes
    })),
  };

  const myConfig = {
    height: "600px",
    width: "100%",
    nodes: {
      shape: "dot",
      size: 20,
      color: "lightgreen",
      font: {
        size: 14,
        color: "black",
      },
    },
    edges: {
      color: "lightblue",
      arrows: { to: false }, // Remove as setas
      font: {
        size: 12,
        align: "middle",
      },
    },
    physics: {
      enabled: true,
      // Aumentar o nodeDistance para afastar mais os nós
      repulsion: {
        nodeDistance: 300,  // Aumenta o espaçamento entre os nós
        centralGravity: 0.0,  // Remove a atração central
      },
      // Ajuste do comprimento da "corda" entre os nós
      hierarchicalRepulsion: {
        springLength: 300, // Aumenta o comprimento das "cordas" para afastar mais os nós
        springConstant: 0.01,
        nodeDistance: 300,  // Aumenta a distância mínima entre os nós
      },
      // Estabilização para garantir que o layout se ajuste melhor
      stabilization: {
        iterations: 1000, // Mais iterações para estabilizar o layout
        updateInterval: 25,
      },
    },
  };

  const containerRef = useRef(null);

  // Funções de clique para nós e links
  const onClickNode = (nodeId) => {
    message.info({
      content: `IP ${nodeId}`,
    });
  };

  const onClickLink = (event) => {
    const { from, to } = event;
    const times = graph[from][to].times;
    message.info({
      content: `O IP ${from} comunicou-se ${times}x com o IP ${to}`,
    });
  };

  const handleChange = (key) => {
    setView(key);
  };

  useEffect(() => {
    if (view === 1) {
      const network = new Network(containerRef.current, data, myConfig);

      // Adiciona os listeners de clique
      network.on("click", function (params) {
        if (params.nodes.length) {
          onClickNode(params.nodes[0]);
        } else if (params.edges.length) {
          const edge = params.edges[0];
          const source = data.edges.find(e => e.id === edge).from;
          const target = data.edges.find(e => e.id === edge).to;
          onClickLink({ from: source, to: target });
        }
      });
    }
  }, [data, view]);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={[
          {
            label: "Grafo",
            key: 1,
          },
          {
            label: "Mapa",
            key: 2,
          }
        ]}
        onChange={handleChange}
      />

      {view === 1 && (
        <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      )}

      {view === 2 && (
        <MapContainer style={{ width: '100%', height: '100%' }} center={[0, 0]} zoom={2} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.keys(ipsInfo).map(ip => (
            ip !== "No IP" && (
              <Marker position={[ipsInfo[ip].lat, ipsInfo[ip].lng]} key={ip}>
                <Popup>{ip}</Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default IPVisualization;
