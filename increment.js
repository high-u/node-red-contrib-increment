module.exports = function (RED) {
    function isEmpty(val) {
      return typeof val === 'undefined'
          || val === 'undefined'
          || val === '';
    }

    function incrementVal(val, increment) {
      if (isEmpty(increment)) {
          increment = 1;
      }
      increment = Number(increment);
      if (isEmpty(val)) return increment;
      return Number(val) + increment;
    }
    function incNode(config) {
        RED.nodes.createNode(this, config);
        this.kind = config.kind;
        this.target = config.target;
        this.increment = config.increment;
        var node = this;
        this.on('input', function (msg) {
            if (!this.kind || this.kind === 'msg') {
              msg[node.target] = incrementVal(msg[node.target], node.increment);
              console.log(' msg[node.target]', msg[node.target], node)

            } else if (this.kind === 'flow') {
              node.context().flow.set(node.target, incrementVal(node.context().flow.get(node.target), node.increment));
            } else if (this.kind === 'global') {
              node.context().global.set(node.target, incrementVal(node.context().global.get(node.target), node.increment));
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('increment', incNode);
};
