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