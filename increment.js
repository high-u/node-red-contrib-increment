module.exports = function (RED) {
    function increment(val) {
      if (typeof val === 'undefined') return 1;
      return Number(val) + 1;
    }
    function incNode(config) {
        RED.nodes.createNode(this, config);
        this.kind = config.kind;
        this.target = config.target;
        var node = this;
        this.on('input', function (msg) {
            if (!this.kind || this.kind === 'msg') {
              msg[node.target] = increment(msg[node.target]);
              console.log(' msg[node.target]', msg[node.target], node)

            } else if (this.kind === 'flow') {
              node.context().flow.set(node.target, increment(node.context().flow.get(node.target)));
            } else if (this.kind === 'global') {
              node.context().global.set(node.target, increment(node.context().global.get(node.target)));
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('increment', incNode);
};
