const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done')
        }, 1500);
    })
    return promise;
}

setTimeout(() => {
    console.log('time done');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    })
        .then(text2 => {
            console.log((text2));
        })
}, 2000)