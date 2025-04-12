document.addEventListener('DOMContentLoaded', function() {
    // 确保Via.js库已加载
    if (typeof Via === 'undefined') {
        console.error('Via.js库未加载，请检查网络连接或CDN地址');
        document.getElementById('graph-container').innerHTML = '<div style="color:red;padding:20px;">错误：Via.js库未加载，请检查网络连接</div>';
        return;
    }

    // 初始化Via实例
    const container = document.getElementById('graph-container');
    const via = new Via(container, {
        // 配置选项
        connectionType: 'bezier', // 连接线类型：bezier曲线
        dragNodes: true,          // 允许拖动节点
        dragConnections: true,    // 允许拖动连接线
        multipleSelection: true,  // 允许多选
        defaultNodeWidth: 150,    // 默认节点宽度
        defaultNodeHeight: 'auto' // 默认节点高度自适应
    });

    // 定义节点类型和样式
    const nodeTypes = [
        { type: 'person', class: 'node-blue' },
        { type: 'product', class: 'node-red' },
        { type: 'platform', class: 'node-green' },
        { type: 'community', class: 'node-purple' },
        { type: 'action', class: 'node-yellow' }
    ];

    // 定义连接类型
    const connectionTypes = [
        { type: 'created', color: '#2ecc71', dashed: true, label: 'created' },
        { type: 'uses', color: '#e74c3c', dashed: false, label: 'uses' },
        { type: 'source-code', color: '#e74c3c', dashed: false, label: 'source-code at' },
        { type: 'runs-inside', color: '#e74c3c', dashed: false, label: 'runs inside' },
        { type: 'gives-feedback', color: '#e74c3c', dashed: false, label: 'gives feedback at' },
        { type: 'would-like', color: '#e74c3c', dashed: false, label: 'would like to give' },
        { type: 'to', color: '#e74c3c', dashed: false, label: 'to' }
    ];

    // 创建示例数据
    const nodes = [
        { id: 'tiddlymap', type: 'product', content: '<div class="node node-red">TiddlyMap</div>', x: 300, y: 300 },
        { id: 'youtube', type: 'platform', content: '<div class="node node-green"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png" class="node-icon"><br>YouTube</div>', x: 100, y: 200 },
        { id: 'github', type: 'platform', content: '<div class="node node-green"><img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" class="node-icon"><br>GitHub</div>', x: 600, y: 200 },
        { id: 'tiddlywiki', type: 'product', content: '<div class="node node-red">TiddlyWiki</div>', x: 150, y: 500 },
        { id: 'channel', type: 'platform', content: '<div class="node node-green">TiddlyMap Channel</div>', x: 150, y: 250 },
        { id: 'community', type: 'community', content: '<div class="node node-purple">TiddlyMap Community</div>', x: 800, y: 400 },
        { id: 'felixhayashi', type: 'person', content: '<div class="node node-blue">@felixhayashi</div>', x: 600, y: 400 },
        { id: 'jeremy', type: 'person', content: '<div class="node node-blue">Jeremy Ruston</div>', x: 400, y: 550 },
        { id: 'thanks', type: 'action', content: '<div class="node node-yellow">Special Thanks</div>', x: 600, y: 700 }
    ];

    const connections = [
        { from: 'youtube', to: 'channel', type: 'uses', label: 'uses' },
        { from: 'tiddlymap', to: 'github', type: 'source-code', label: 'source-code at' },
        { from: 'tiddlymap', to: 'tiddlywiki', type: 'runs-inside', label: 'runs inside' },
        { from: 'jeremy', to: 'tiddlywiki', type: 'created', label: 'created' },
        { from: 'felixhayashi', to: 'tiddlymap', type: 'created', label: 'created' },
        { from: 'community', to: 'github', type: 'gives-feedback', label: 'gives feedback at' },
        { from: 'felixhayashi', to: 'thanks', type: 'would-like', label: 'would like to give' },
        { from: 'jeremy', to: 'thanks', type: 'to', label: 'to' },
        { from: 'community', to: 'thanks', type: 'to', label: 'to' }
    ];

    // 添加节点到图表
    nodes.forEach(node => {
        via.addNode(node.id, {
            content: node.content,
            x: node.x,
            y: node.y,
            data: { type: node.type }
        });
    });

    // 添加连接到图表
    connections.forEach(conn => {
        const connectionType = connectionTypes.find(type => type.type === conn.type) || connectionTypes[0];
        via.addConnection(conn.from, conn.to, {
            color: connectionType.color,
            dashed: connectionType.dashed,
            label: conn.label,
            data: { type: conn.type }
        });
    });

    // 添加事件监听器
    document.getElementById('add-node').addEventListener('click', function() {
        const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        const nodeName = prompt('请输入节点名称：');
        if (nodeName) {
            const nodeId = 'node-' + Date.now();
            via.addNode(nodeId, {
                content: `<div class="node ${nodeType.class}">${nodeName}</div>`,
                x: 300 + Math.random() * 300,
                y: 300 + Math.random() * 300,
                data: { type: nodeType.type }
            });
        }
    });

    document.getElementById('add-connection').addEventListener('click', function() {
        const fromNodeId = prompt('请输入起始节点ID：');
        const toNodeId = prompt('请输入目标节点ID：');
        const connectionLabel = prompt('请输入连接标签：');

        if (fromNodeId && toNodeId && connectionLabel) {
            const connectionType = connectionTypes[Math.floor(Math.random() * connectionTypes.length)];
            via.addConnection(fromNodeId, toNodeId, {
                color: connectionType.color,
                dashed: connectionType.dashed,
                label: connectionLabel,
                data: { type: connectionType.type }
            });
        }
    });

    document.getElementById('reset').addEventListener('click', function() {
        if (confirm('确定要重置图表吗？')) {
            via.clear();
            // 重新添加初始节点和连接
            nodes.forEach(node => {
                via.addNode(node.id, {
                    content: node.content,
                    x: node.x,
                    y: node.y,
                    data: { type: node.type }
                });
            });
            connections.forEach(conn => {
                const connectionType = connectionTypes.find(type => type.type === conn.type) || connectionTypes[0];
                via.addConnection(conn.from, conn.to, {
                    color: connectionType.color,
                    dashed: connectionType.dashed,
                    label: conn.label,
                    data: { type: conn.type }
                });
            });
        }
    });

    // 添加节点选择事件
    via.on('nodeSelected', function(nodeId) {
        console.log('选中节点：', nodeId);
    });

    // 添加连接选择事件
    via.on('connectionSelected', function(connectionId) {
        console.log('选中连接：', connectionId);
    });

    // 添加节点拖动事件
    via.on('nodeDragged', function(nodeId, x, y) {
        console.log(`节点 ${nodeId} 被拖动到位置 (${x}, ${y})`);
    });

    // 添加双击事件
    via.on('nodeDblClicked', function(nodeId) {
        const node = via.getNode(nodeId);
        const newContent = prompt('编辑节点内容：', node.element.textContent.trim());
        if (newContent) {
            const nodeType = nodeTypes.find(type => type.type === node.data.type) || nodeTypes[0];
            node.setContent(`<div class="node ${nodeType.class}">${newContent}</div>`);
        }
    });

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按下Delete键删除选中的节点或连接
        if (e.key === 'Delete') {
            const selectedNodes = via.getSelectedNodes();
            const selectedConnections = via.getSelectedConnections();

            selectedNodes.forEach(nodeId => via.removeNode(nodeId));
            selectedConnections.forEach(connId => via.removeConnection(connId));
        }
    });
});