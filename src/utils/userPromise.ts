const fnc1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fnc-1 Call");
            resolve(true)
        }, 3000);
    })
}

const fnc2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fnc-2 Call");
            resolve(true)
        }, 1000);
    })
}

const fnc3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fnc-3 Call");
            resolve(true)
        }, 3000);
    })
}

export const call = () => {
    fnc1().then(f1 => {
        console.log("f1", f1);
        fnc2().then(f2 => {
            fnc3().then(f3 => {
                console.log("All Fnc Finish");
            })
        })
    })
}