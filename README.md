# pico-memoize ![minimized size: 735B](https://img.shields.io/bundlephobia/min/pico-memoize)   
A tiny Javascript memoization library. 
## Usage
```js
//CJS
const memoized = require('pico-memoize');
//ESM
import memoized from 'pico-memoize';
//If using it in the browser, it globalizes the memoized function
function sumPrecise(array){
    console.log(array);
    return array.reduce((a,b)=>a+b,0);
}
sumPrecise = memoized(sumPrecise);
sumPrecise([1,2,3]); //logs [1,2,3], returns 6
sumPrecise([1,2,3]); //returns 6 without logging anything

function deepEqual(a,b){
    // memoization has more uses than you think!
    let wrapper = memoized(Object);
    return wrapper(a) === wrapper(b);
}
```
