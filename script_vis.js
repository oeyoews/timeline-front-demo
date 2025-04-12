document.addEventListener('DOMContentLoaded', function() {
    // Create a new network instance
    const container = document.getElementById('graph-container');

    // Define node types and their styles for frontend history
    const nodeTypes = [
        { type: 'technology', color: '#3498db' },    // blue - core technologies
        { type: 'framework', color: '#e74c3c' },    // red - frameworks and libraries
        { type: 'milestone', color: '#2ecc71' },   // green - important milestones
        { type: 'browser', color: '#9b59b6' },     // purple - browsers
        { type: 'person', color: '#f1c40f' }       // yellow - key people
    ];

    // Define connection types for technology evolution
    const connectionTypes = [
        { type: 'creates', color: '#2ecc71', dashes: true },
        { type: 'evolves-to', color: '#e74c3c', dashes: false },
        { type: 'influences', color: '#3498db', dashes: true },
        { type: 'implements', color: '#9b59b6', dashes: false },
        { type: 'supports', color: '#f1c40f', dashes: false },
        { type: 'introduces', color: '#1abc9c', dashes: true }
    ];

    // Create frontend history data
    const nodes = new vis.DataSet([
        // Core Technologies
        { id: 'html', label: 'HTML', group: 'technology', x: 100, y: 100 },
        { id: 'css', label: 'CSS', group: 'technology', x: 100, y: 200 },
        { id: 'js', label: 'JavaScript', group: 'technology', x: 100, y: 300 },
        { id: 'es6', label: 'ES6+', group: 'technology', x: 300, y: 300 },
        { id: 'typescript', label: 'TypeScript', group: 'technology', x: 500, y: 300 },

        // Frameworks and Libraries
        { id: 'jquery', label: 'jQuery', group: 'framework', x: 300, y: 100 },
        { id: 'angular', label: 'Angular', group: 'framework', x: 500, y: 100 },
        { id: 'react', label: 'React', group: 'framework', x: 700, y: 100 },
        { id: 'vue', label: 'Vue.js', group: 'framework', x: 900, y: 100 },

        // Milestones
        { id: 'ajax', label: 'AJAX', group: 'milestone', x: 300, y: 200 },
        { id: 'spa', label: 'Single Page Apps', group: 'milestone', x: 500, y: 200 },
        { id: 'pwa', label: 'Progressive Web Apps', group: 'milestone', x: 700, y: 200 },

        // Browsers
        { id: 'ie', label: 'Internet Explorer', group: 'browser', x: 300, y: 400 },
        { id: 'chrome', label: 'Chrome', group: 'browser', x: 500, y: 400 },
        { id: 'firefox', label: 'Firefox', group: 'browser', x: 700, y: 400 },

        // Key People
        { id: 'brendan', label: 'Brendan Eich', group: 'person', x: 300, y: 500 },
        { id: 'dan', label: 'Dan Abramov', group: 'person', x: 500, y: 500 },
        { id: 'evan', label: 'Evan You', group: 'person', x: 700, y: 500 }
    ]);

    const edges = new vis.DataSet([
        // Core Technology Evolution
        { from: 'html', to: 'css', label: 'evolves-to' },
        { from: 'js', to: 'es6', label: 'evolves-to' },
        { from: 'es6', to: 'typescript', label: 'evolves-to' },

        // Framework Development
        { from: 'js', to: 'jquery', label: 'influences' },
        { from: 'js', to: 'angular', label: 'influences' },
        { from: 'js', to: 'react', label: 'influences' },
        { from: 'js', to: 'vue', label: 'influences' },

        // Milestone Connections
        { from: 'js', to: 'ajax', label: 'introduces' },
        { from: 'ajax', to: 'spa', label: 'evolves-to' },
        { from: 'spa', to: 'pwa', label: 'evolves-to' },

        // Browser Support
        { from: 'chrome', to: 'es6', label: 'supports' },
        { from: 'firefox', to: 'es6', label: 'supports' },

        // People Contributions
        { from: 'brendan', to: 'js', label: 'creates', dashes: true },
        { from: 'dan', to: 'react', label: 'influences', dashes: true },
        { from: 'evan', to: 'vue', label: 'creates', dashes: true }
    ]);

    // Create network options
    const options = {
        nodes: {
            shape: 'box',
            margin: 10,
            widthConstraint: {
                minimum: 120
            },
            borderWidth: 1,
            shadow: true,
            font: {
                size: 14,
                color: '#ffffff'
            },
            fixed: {
                x: false,
                y: false
            }
        },
        edges: {
            arrows: 'to',
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'horizontal',
                roundness: 0.4
            },
            font: {
                size: 12,
                background: 'rgba(255, 255, 255, 0.8)'
            }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -1000,
                centralGravity: 0.1,
                springLength: 250,
                springConstant: 0.04,
                damping: 0.09
            },
            stabilization: {
                enabled: true,
                iterations: 1000,
                updateInterval: 50
            }
        },
        manipulation: {
            enabled: true
        }
    };

    // Apply node colors based on group
    const nodeData = nodes.get();
    nodeData.forEach(node => {
        const nodeType = nodeTypes.find(type => type.type === node.group);
        if (nodeType) {
            node.color = {
                background: nodeType.color,
                border: nodeType.color,
                highlight: { background: nodeType.color, border: nodeType.color }
            };
            nodes.update(node);
        }
    });

    // Create the network
    const network = new vis.Network(container, { nodes, edges }, options);

    // Add event listeners for buttons
    document.getElementById('add-node').addEventListener('click', function() {
        const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        const nodeName = prompt('Please enter node name:');
        if (nodeName) {
            const nodeId = 'node-' + Date.now();
            nodes.add({
                id: nodeId,
                label: nodeName,
                group: nodeType.type,
                color: {
                    background: nodeType.color,
                    border: nodeType.color,
                    highlight: { background: nodeType.color, border: nodeType.color }
                }
            });
        }
    });

    document.getElementById('add-connection').addEventListener('click', function() {
        const fromNodeId = prompt('Enter source node ID:');
        const toNodeId = prompt('Enter target node ID:');
        const connectionLabel = prompt('Enter connection label:');

        if (fromNodeId && toNodeId && connectionLabel) {
            const connectionType = connectionTypes[Math.floor(Math.random() * connectionTypes.length)];
            edges.add({
                from: fromNodeId,
                to: toNodeId,
                label: connectionLabel,
                color: connectionType.color,
                dashes: connectionType.dashes
            });
        }
    });

    document.getElementById('reset').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the graph?')) {
            nodes.clear();
            edges.clear();
            const nodeData = [
                { id: 'tiddlymap', label: 'TiddlyMap', group: 'product', x: 300, y: 300 },
                { id: 'youtube', label: 'YouTube', group: 'platform', x: 100, y: 200, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png', shape: 'image' },
                { id: 'github', label: 'GitHub', group: 'platform', x: 600, y: 200, image: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', shape: 'image' },
                { id: 'tiddlywiki', label: 'TiddlyWiki', group: 'product', x: 150, y: 500 },
                { id: 'channel', label: 'TiddlyMap Channel', group: 'platform', x: 150, y: 250 },
                { id: 'community', label: 'TiddlyMap Community', group: 'community', x: 800, y: 400 },
                { id: 'felixhayashi', label: '@felixhayashi', group: 'person', x: 600, y: 400 },
                { id: 'jeremy', label: 'Jeremy Ruston', group: 'person', x: 400, y: 550 },
                { id: 'thanks', label: 'Special Thanks', group: 'action', x: 600, y: 700 }
            ];
            nodes.add(nodeData);
            nodeData.forEach(node => {
                const nodeType = nodeTypes.find(type => type.type === node.group);
                if (nodeType) {
                    node.color = {
                        background: nodeType.color,
                        border: nodeType.color,
                        highlight: { background: nodeType.color, border: nodeType.color }
                    };
                    nodes.update(node);
                }
            });
            edges.add([
                { from: 'youtube', to: 'channel', label: 'uses' },
                { from: 'tiddlymap', to: 'github', label: 'source-code at' },
                { from: 'tiddlymap', to: 'tiddlywiki', label: 'runs inside' },
                { from: 'jeremy', to: 'tiddlywiki', label: 'created', dashes: true },
                { from: 'felixhayashi', to: 'tiddlymap', label: 'created', dashes: true },
                { from: 'community', to: 'github', label: 'gives feedback at' },
                { from: 'felixhayashi', to: 'thanks', label: 'would like to give' },
                { from: 'jeremy', to: 'thanks', label: 'to' },
                { from: 'community', to: 'thanks', label: 'to' }
            ]);
        }
    });

    // Add keyboard event listener for delete
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete') {
            const selectedNodes = network.getSelectedNodes();
            const selectedEdges = network.getSelectedEdges();

            nodes.remove(selectedNodes);
            edges.remove(selectedEdges);
        }
    });

    // Add double click event for editing nodes
    network.on('doubleClick', function(params) {
        if (params.nodes.length === 1) {
            const nodeId = params.nodes[0];
            const node = nodes.get(nodeId);
            const newContent = prompt('Edit node content:', node.label);
            if (newContent) {
                nodes.update({
                    id: nodeId,
                    label: newContent
                });
            }
        }
    });
});