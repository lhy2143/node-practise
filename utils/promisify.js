// const util = require('util');
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};

// function test(cb) {
//     if (Math.random() > .5) {
//         cb(true, null);
//     } else {
//         cb(false, new Error('小于.5'));
//     }
// }


// util.promisify(test)().then(res => {
//     console.log('res,', res)
// }).catch(err => {
//     console.log('err,', err)
// })

const kCustomPromisifiedSymbol = Symbol('nodejs.util.promisify.custom');

function promisify(original) {
    if (typeof original !== 'function')
        throw new ERR_INVALID_ARG_TYPE('original', 'Function', original);

    if (original[kCustomPromisifiedSymbol]) {
        const fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== 'function') {
            throw new ERR_INVALID_ARG_TYPE('util.promisify.custom', 'Function', fn);
        }
        return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn, enumerable: false, writable: false, configurable: true
        });
    }

    // Names to create an object from in case the callback receives multiple
    // arguments, e.g. ['bytesRead', 'buffer'] for fs.read.
    const argumentNames = original[kCustomPromisifyArgsSymbol];

    function fn(...args) {
        return new Promise((resolve, reject) => {
            original.call(this, ...args, (err, ...values) => {
                if (err) {
                    return reject(err);
                }
                if (argumentNames !== undefined && values.length > 1) {
                    const obj = {};
                    for (let i = 0; i < argumentNames.length; i++)
                        obj[argumentNames[i]] = values[i];
                    resolve(obj);
                } else {
                    resolve(values[0]);
                }
            });
        });
    }

    Object.setPrototypeOf(fn, ObjectGetPrototypeOf(original));

    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn, enumerable: false, writable: false, configurable: true
    });
    return Object.defineProperties(
        fn,
        Object.getOwnPropertyDescriptors(original)
    );
}

function doSomething(foo, name, age, successBack, errBack) {
    if (Math.random() > .5) {
        console.log(foo, name, age)
        successBack(200);
    } else {
        console.log(foo, name, age)
        errBack(500);
    }
}

// doSomething('foo', 'jack', 24, () => { console.log(arguments[0]) }, () => { console.log(arguments[0]) });

doSomething[kCustomPromisifiedSymbol] = (foo, name, age) => {
    return new Promise((resolve, reject) => {
        doSomething(foo, name, age, resolve, reject);
    });
};

const realMethod = promisify(doSomething);
console.log(Object.prototype.toString.call(realMethod), realMethod);
console.log(typeof realMethod.then === 'function');


realMethod('write', 'lhy', 18).then((res, status) => {
    console.log('res,', res)
}).catch((err, status) => {
    console.log('err,', err, status)
})

