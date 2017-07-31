const async_hooks = require('async_hooks');

const cid = async_hooks.currentId();

const tid = async_hooks.triggerId();
