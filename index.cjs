function memoized(fn) {
    function serializer(replacer, cycleReplacer) {
        let stack = []
        let keys = [];
        if (cycleReplacer == null) cycleReplacer = function(key, value) {
            if (stack[0] === value) return "[Circular ~]"
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
        }
        return function(key, value) {
            if (stack.length > 0) {
                let thisPos = stack.indexOf(this)
                    ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
                    ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
                if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
            } else stack.push(value)
            return replacer == null ? value : replacer.call(this, key, value)
        }
    }
    let cache = new Map();
    return function() {
        if (cache.has(JSON.stringify([...arguments], serializer()))) return cache.get(JSON.stringify([...arguments], serializer()));
        let result = fn(...arguments);
        cache.set(JSON.stringify([...arguments], serializer()), result);
        return result;
    }
}
exports = memoized; 
