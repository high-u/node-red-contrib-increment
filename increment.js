module.exports = function (RED) {
    function isEmpty(val) {
      return typeof val === 'undefined'
          || val === 'undefined'
          || val === '';
    }

    function increment(val, factor) {
      if (isEmpty(factor)) {
          factor = 1;
      }
      factor = Number(factor);
      if (isEmpty(val)) return factor;
      return Number(val) + factor;
    }
    function incNode(config) {
        RED.nodes.createNode(this, config);
        this.kind = config.kind;
        this.target = config.target;
        this.factor = config.factor;
        var node = this;
        this.on('input', function (msg) {
            if (!this.kind || this.kind === 'msg') {
              msg[node.target] = increment(msg[node.target], node.factor);
              console.log(' msg[node.target]', msg[node.target], node)

            } else if (this.kind === 'flow') {
              node.context().flow.set(node.target, increment(node.context().flow.get(node.target), node.factor));
            } else if (this.kind === 'global') {
              node.context().global.set(node.target, increment(node.context().global.get(node.target), node.factor));
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('increment', incNode);
};
