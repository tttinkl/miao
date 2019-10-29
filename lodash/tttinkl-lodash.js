var tttinkl = function() {
    function identity(value) {
        return value;
    }

    function isObject(value) {
        return ((typeof value === "object" || typeof value == "function") && value !== null)
    }

    function isFunction(value) {
        return Object.prototype.toString.call(value) === "[object Function]";
    }

    function isArray(value) {
        return Array.isArray(value);
    }

    function isMatch(obj, src) {
        if (obj === src) return true;
        for (let k in src) {
            if (typeof(src[k]) == "object" && src[k] != null) {
                if (!isMatch(obj[k], src[k])) return false;
            } else {
                if (src[k] != obj[k]) return false
            }
        }
        return true;
    }

    function isEqual(value, other) {
        if (value === other) return true;
        if (value == null && other == null) return true;
        if (value == null || other == null) return false;
        if (typeof value === "object") {
            for (let k in value) {
                if (isEqual(value[k], other[k]) == false) return false;
            }
            for (let k in other) {
                if (isEqual(value[k], other[k]) == false) return false;
            }
            return true;

        } else return false;
    }

    function chunk(ary, n) {
        var ret = [];
        while (ary.length != 0) {
            ret.push(ary.splice(0, n));
        }
        return ret;
    }

    function compact(ary) {
        return ary.filter(it =>it)
    }

    function concat(array, ...values) {
        var ret = Array.from(array);
        for (let i = 0; i < values.length; i++) {
            if (typeof(values[i]) == "number") ret.push(values[i]);
            else {
                ret.push(...values[i]);
            }
        }
        return ret;
    }

    function difference(ary, ...values) {
        var ret = [];
        var value = [];
        for (let i = 0; i < values.length; i++) {
            value = value.concat(values[i]);
        }
        for (let i = 0; i < ary.length; i++) {
            var flag = 0;
            for (let j = 0; j < value.length; j++) {
                if (value[j] == ary[i]) {
                    flag = 1;
                }
            }
            if (flag == 0) ret.push(ary[i]);
        }
        return ret;
    }

    function differenceBy(ary, ...args) {
        if (typeof arguments[arguments.length - 1] == "function") {
            var iteratee = arguments[arguments.length - 1];
        } else if (arguments[arguments.length - 1] instanceof Array) {
            iteratee = identity;
            args[args.length] = iteratee;
        } else {
            iteratee = property(arguments[arguments.length - 1]);
        }
        var ret = [];
        var value = [];
        for (let i = 0; i < args.length - 1; i++) {
            value = value.concat(args[i]);
        }
        for (let i = 0; i < ary.length; i++) {
            var flag = 0;
            for (let j = 0; j < value.length; j++) {
                if (iteratee(value[j]) == iteratee(ary[i])) {
                    flag = 1;
                }
            }
            if (flag == 0) ret.push(ary[i]);
        }
        return ret;
    }

    function fill(array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++) {
            array[i] = value;
        }
        return array;
    }

    function findIndex(array, predicate = identity, fromIndex = 0) {
        var iteratee = getIteratee(predicate);
        for (let i = fromIndex; i < array.length; i++) {
            if (iteratee(array[i])) return i;
        }
    }
    function findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
        var iteratee = getIteratee(predicate);
        for (let i = fromIndex; i >= 0; i--) {
            if (iteratee(array[i])) return i;
        }
    }

    function find(array, predicate = identity, fromIndex = 0) {
        var iteratee = getIteratee(predicate);
        for (let i = fromIndex; i < array.length; i++) {
            if (iteratee(array[i])) return array[i];
        }
    }

    function findLast(array, predicate = identity, fromIndex = array.length - 1) {
        var iteratee = getIteratee(predicate);
        for (let i = fromIndex; i >= 0; i--) {
            if (iteratee(array[i])) return array[i];
        }
    }

    function head(array) {
        return array[0];
    }
    var first = head;

    function baseFlatten(array, depth = Infinity) {
        if (depth < 0) return [];
        var result = [];
        for (let i = 0; i < array.length; i++) {
            if (depth > 0) {
                if (isArray(array[i])) {
                    result.push(...baseFlatten(array[i], depth - 1));
                } else result.push(array[i]);
            } else {
                result.push(array[i]);
            }
        }
        return result;
    }

    function flatten(array) {
        var result = [];
        for (let i = 0; i < array.length; i++) {
            if (isArray(array[i])) {
                result.push(...array[i]);
            } else {
                result.push(array[i]);
            }
        }
        return result;
    }

    function flattenDeep(array) {
        return baseFlatten(array);
    }

    function flattenDepth(array, depth = 1) {
        return baseFlatten(array, depth);
    }

    function differenceWith(ary, ...args) {
        var ret = [];
        var value = [];
        for (let i = 0; i < args.length - 1; i++) {
            value = value.concat(args[i]);
        }
        for (let i = 0; i < ary.length; i++) {
            var flag = 0;
            for (let j = 0; j < value.length; j++) {
                if (args[args.length - 1](value[i], ary[i])) {
                    flag = 1;
                }
            }
            if (flag == 0) ret.push(ary[i]);
        }
        return ret;
    }

    function drop(ary, n = 1) {
        ary.splice(0, n);
        return ary;
    }

    function dropRight(ary, n = 1) {
        if (n < ary.length) {
            ary.splice(ary.length - n);
            return ary;
        } else return [];
    }

    function take(ary, n = 1) {
        return ary.slice(0, n);
    }

    function takeRight(ary, n = 1) {
        n = n > ary.length ? ary.length: n;
        return ary.slice(ary.length - n, ary.length);
    }

    function dropRightWhile(array, predicate = identity) {
        return baseWhile(array, predicate, true, true);
    }

    function dropWhile(array, predicate) {
        return baseWhile(array, predicate, true, false);
    }

    function takeWhile(array, predicate) {
        return baseWhile(array, predicate, false, false);
    }

    function takeRightWhile(array, predicate) {
        return baseWhile(array, predicate, false, true);
    }

    function getIteratee(predicate) {
        return iteratee(predicate);
    }

    function baseWhile(array, predicate, isDrop, fromRight) {
        var iteratee = getIteratee(predicate);
        var idx = fromRight ? array.length: -1;
        while ((fromRight ? --idx: ++idx < array.length)) {
            if (iteratee(array[idx], idx, array) === false) {
                console.log(idx, iteratee(array[idx], idx, array));
                break;
            }
        }

        if (isDrop) {
            return fromRight ? array.slice(0, idx + 1) : array.slice(idx);
        } else {
            return fromRight ? array.slice(idx + 1) : array.slice(0, idx);
        }
    }

    function iteratee(func = identity) {
        if (isFunction(func)) return func;
        if (isArray(func)) return matchesProperty(func[0], func[1]);
        if (isObject(func)) return matches(func);
        if (typeof func === "string") return property(func);
    }

    function map(collection, iteratee = identity) {
        iteratee = isFunction(arguments[1]) ? arguments[1] : getIteratee(arguments[1]);
        var result = [];
        if (isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                result.push(iteratee(collection[i], i, collection));
            }
        } else {
            for (let k in collection) {
                result.push(iteratee(collection[k], k, collection))
            }
        }
        return result;
    }

    function filter(collection, predicate = identity) {
        var ret = [];
        var func = isArray(collection) ? arrayFilter: baseFilter;
        return func(collection, iteratee(predicate));
    }

    function arrayFilter(array, predicate) {
        var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];
        while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
                result[resIndex++] = value;
            }
        }
        return result;
    }

    function baseFilter(collection, predicate) {
        var result = [];
        each(collection,
        function(value, index, collection) {
            if (predicate(value, index, collection)) {
                result.push(value);
            }
        });
        return resultl
    }

    function each(collection, iteratee = identity) {
        iteratee = getIteratee(iteratee);
        if (isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                var f = iteratee(collection[i], i, collection);
                if (f === false) return collection;
            }
        } else {
            for (let k in collection) {
                var f = iteratee(collection[k], k, collection);
                if (f === false) return collection;
            }
        }
        return collection;
    }

    var forEach = each;

    function wrap(value, wrapper = identity) {
        return function(...args) {
            return wrapper(value, ...args);
        }
    }

    function escape(str = "") {
        return str.replace("<", "&lt;").replace(">", "$gt;").replace("&", "&amp;").replace("'", "&#39;");
    }

    function matches(src) {
        return function(obj) {
            return isMatch(obj, src);
        }
    }

    function matchesProperty(path, srcValue) {
        return function(obj) {
            return isEqual(get(obj, path), srcValue)
        }
    }

    function bind(f, thisArg, ...fixedArgs) {
        return function(...args) {
            var ARGS = [...fixedArgs, ...args]
            return f.apply(thisArg, ...ARGS)
        }
    }

    function get(obj, path, defaultVal) {
        var path = toPath(path);
        for (let i = 0; i < path.length; i++) {
            if (obj === undefined) return defaultVal;
            obj = obj[path[i]];
        }
        return obj;
    }

    function property(path) {
        return function(obj) {
            return get(obj, path);
        }
    }

    function toPath(str) { //a.b.c.d[foo].d
        if (str instanceof Array) return str;
        return str.split(/\.|\[|\]./g);
    }

    function compose(funcs) {
        return function(...args) {
            var value = funcs[0](...args) ;
            for (var i = 1; i < funcs.length; i++) {
                value = funcs[i](value);
            }
            return value
        }
    }

    function curry(f, length = f.length) {
        return function(...args) {
            if (args.length >= length) {
                return f(...args);
            } else {
                return curry(f.bind(null, ...args), length - args.length);
            }
        }
    }

    function flip(func) {
        return function(...args) {
            args.reverse();
            return func(...args);
        }
    }

    function fromPairs(pairs) {
        var result = {};
        pairs.forEach(function(item) {
            result[item[0]] = item[1];
        });
        return result;
    }

    function toPairs(obj) {
        var result = [];
        Object.keys(obj).forEach(function(key) {
            var cell = [];
            cell.push(key, obj[key]);
            result.push(cell);
        });
        return result;
    }

    function toPairsIn(obj) {
        var result = [];
        for (let key in obj) {
            var cell = [];
            cell.push(key, obj[key]);
            result.push(cell);
        }
        return result;
    }
    function sameValue(v1, v2) {
        if (isNaN(v1)) {
            if (isNaN(v2)) {
                return true;
            } else return false;
        } else {
            return v1 === v2;
        }
    }
    function baseIndexof(array, value, isSorted, fromRight, fromIndex) {
        if (!isSorted) {
            if (!fromRight) {
                var index = fromIndex - 1,
                length = array.length;
                while (++index < length) {
                    if (sameValue(array[index], value)) {
                        return index;
                    }
                }
                return - 1;
            } else {
                var index = fromIndex + 1;
                while (--index > -1) {
                    if (sameValue(array[index], value)) {
                        return index;
                    }
                }
                return - 1;
            }
        } else {
            return baseBinarySearch(array, value, fromRight, fromIndex);
        }
    }

    function baseBinarySearch(array, value, fromRight = false, fromIndex) {
        if (fromIndex == undefined) fromIndex = fromRight ? array.length - 1 : 0;
        var left = fromRight ? 0 : fromIndex,
        right = fromRight ? fromIndex: array.length - 1,
        mid = (left + right) >> 1,
        ret = -1;
        while (left <= right) {
            if (value < array[mid]) {
                right = mid - 1;
                mid = (left + right) >> 1;
            } else if (value > array[mid]) {
                left = mid + 1;
                mid = (left + right) >> 1;
            } else if (array[mid] === value) {
                ret = mid;
                if (fromRight) {
                    left = mid + 1;
                    mid = (left + right) >> 1;
                } else {
                    right = mid - 1;
                    mid = (left + right) >> 1;
                }
            }
        }
        return ret;
    }

    function baseIndex(array, predicate = identity, fromIndex) {

}

    function indexOf(array, value, fromIndex = 0) {
        return baseIndexof(array, value, false, false, fromIndex);
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        return baseIndexof(array, value, false, true, fromIndex);
    }

    function sortedIndexOf(array, value, fromIndex = 0) {
        return baseIndexof(array, value, true, false, fromIndex);
    }

    function sortedLastIndexOf(array, value, fromIndex = array.length - 1) {
        return baseIndexof(array, value, ture, true, fromIndex);
    }

    function initial(array) {
        return array.slice(0, array.length - 1);
    }

    function intersection([arrays]) {
        var map = {};
        var ret = [];
        var length = arrays.length;
        for (let i = 0; i < arrays.length; i++) {
            var set = new Set();
            for (let j = 0; j < arrays[i].length; j++) {
                set.add(arrays[i][j]);
            }
            for (let v of set) {
                map[v] = map[v] ? 1 : map[v] + 1;
            }
        }
        for (let k in map) {
            if (map[k] == length) {
                ret.push(k);
            }
        }
        return ret;
    }

    return {
        chunk,
        compact,
        concat,
        difference,
        differenceBy,
        isEqual,
        differenceWith,
        getIteratee,
        drop,
        dropRight,
        baseWhile,
        dropRightWhile,
        dropWhile,
        takeWhile,
        takeRightWhile,
        take,
        takeRight,
        iteratee,
        isObject,
        isFunction,
        map,
        filter,
        each,
        forEach,
        isArray,
        wrap,
        escape,
        matches,
        isMatch,
        matchesProperty,
        bind,
        get,
        property,
        toPath,
        compose,
        curry,
        flip,
        findIndex,
        find,
        findLastIndex,
        findLast,
        flatten,
        baseFlatten,
        flattenDeep,
        flattenDepth,
        head,
        first,
        fill,
        fromPairs,
        toPairs,
        toPairsIn,
        indexOf,
        lastIndexOf,
        sortedIndexOf,
        sortedLastIndexOf,
        initial,
        intersection
    }
} ();