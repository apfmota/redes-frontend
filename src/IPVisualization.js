import { Graph } from "react-d3-graph";
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'

function IPVisualization({ jsonResponse }) {
    const { graph, ipsInfo }  = jsonResponse;

    const nodesSet = new Set();
    const links = []
    for (let ipSrc in graph) {
        nodesSet.add(ipSrc);
        for (let ipDst in graph[ipSrc]) {
            nodesSet.add(ipDst);
            links.push({
                source: ipSrc,
                target: ipDst
            })
        }
    }

    const nodes = Array.from(nodesSet).map(node => ({ id: node }));

    const data = {
        nodes: nodes,
        links: links,
        focusedNodeId: nodes[0].id
    };

// the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        panAndZoom: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
            renderLabel: true,
        },
        d3: {
            gravity: -300,
            linkLength: 200,
            linkStrength: 0.1,
        },
    };


    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    const onEngineStop = () => {
        document.getElementById("graph-id").dispatchEvent(
            new CustomEvent("zoomToFit", { detail: { duration: 800 } })
        );
    };

    return (
        <div style={{border: '1px solid black'}}>
            <div>
                <Graph
                    id="graph-id" // id is mandatory
                    data={data}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                    onEngineStop={onEngineStop}
                />
            </div>
            <div>
                <MapContainer style={{width: '400px', height: '400px'}} center={[0, 0]} zoom={2} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {Object.keys(ipsInfo).map(ip => (
                        <Marker position={[ipsInfo[ip].lat, ipsInfo[ip].lng]}>
                            <Popup>{ip}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )

}

export default IPVisualization;