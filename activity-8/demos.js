setTimeout(() => {
    console.log("This message is in a setTimeout. This displays after 5 seconds");
}, 5000);

console.log("Synchronous calls");
console.log("called first");
console.log("called second");
console.log("called third");

console.log("Asynchronous calls");
console.log("called first");
called("called second");
console.log("called third");
function called(string) {
    setTimeout(() => {
        console.log(string);
    }, 10);
}



promiseFunction();
async function promiseFunction() {
    let myPromise = new Promise((resolve, reject) => {
        resolve("My Promise");
    });
    document.getElementById("output").innerHTML = await myPromise;
}

promiseFunction2();
async function promiseFunction2() {
    try {
        let result = await new Promise((resolve, reject) => {
            reject("my broken promise");
        });

        console.log("Success");
    }
    catch (error) {
        console.log("Error: ", error);
    }
}

