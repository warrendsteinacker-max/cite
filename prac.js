function tcurry(fn) {
    return function cur(...args) {
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }

        else{

            return function(...nextArgs){

                return cur.apply(this, args.concat(nextArgs))

            }

        }

    }}

    function add(a,b,c) {
        return a + b + c;
    }

const addCurried = tcurry(add);

addCurried(1)(2) // output will stop and expect another arg for return c part


function ttc(fn){

    return function cc(...args) {
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }
        else{
            return function(...nextArgs){
                return cc.apply(this, args.concat(nextArgs))
            }
        }
    }
}


function dd(fn, d){
    let timer;

    return function(...args){
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args)
        }, d);
    }
}

function tt(fn, d){

    let timer = false

    return function(...args){
        if(timer) return;

        timer = true;

        setTimeout(()=> {fn.apply(this, args)}, d);

    }
}

function flat(arr, depth = 1){
    narr = []
    arr.forEach((item) => {
        if(Array.isArray(item) && depth > 1){
            narr.push(...flat(item, depth - 1))
        }
        else{
            narr.push(item)
        }
    })

     return narr;
}


Array.prototype.flat = (arr, depth = 1) => {
    narr = []
    arr.forEach((item) => {
        if(Array.isArray(item) && depth > 1){
            narr.push(...flat(item, depth - 1))
        }
        else{
            narr.push(item)
        }
    })

}



Array.prototype.flat([1,2,[3,4],5], 2) // [1,2,3,4,5]