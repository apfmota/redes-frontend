import { Graph } from "react-d3-graph";

function IPVisualization({ jsonResponse }) {

    console.log("carreguei o grafico")

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
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
                onEngineStop={onEngineStop}
            />
        </div>
    )

}

export default IPVisualization;