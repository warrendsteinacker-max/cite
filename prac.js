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
            narr.push(...item.flat(item, depth - 1))
        }
        else{
            narr.push(item)
        }
    })

    return narr;

}

Array.prototype.filter = function(fn, arr){
    let aaa = []
    arr.forEach((item, index) => {
        if(fn(item, index, arr)){
            aaa.push(item)
        }
        else {return}
    })
    return aaa
}



Array.prototype.flat([1,2,[3,4],5], 2) // [1,2,3,4,5]

const oo = {
    name: "me",
    age: 22,
}

delete oo.age

console.log(oo)

const dum = (function(a) {
    delete a;
    return a;
})(5);


/// useing keys

const obj = {
    a: 1,
    b: 2,
    "key": 3,
}

function dd(obj){
    delete obj["key"];
    console.log(obj)
    return obj;
}

dd(obj)

// returns const obj = {
    //a: 1,
   // b: 2,}


   const firstname = "prop";
   const fname = me

const objj = {

    [firstname]: "me",

}

const objjj = {
    a: 1,
    b: 2,
    c: "Hello",
}

function mulninob(objjj) {
    for(key in objjj){

        if(typeof objjj[key] === "number"){
            objjj[key] = objjj[key] * 2;
        }

}
return objjj;
}


const bb = "obb"


function testthis(){
    const b = 1
    return () =>{
    console.log(this)}
}

 testthis()


