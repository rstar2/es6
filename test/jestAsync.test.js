/**
 * @returns {Promise}
 */
function asyncCode() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 3000);
    });
}


describe.skip('Async suite - 3 ways', () => {
    test('return a promise', () => {
        // 1. specify how many assertions (e.g. expects) should be called
        expect.assertions(1);

        // 2. Be sure to return a Promise
        return asyncCode().then(res => {
            expect(res).toBe(1);
        })
    });

    test('call a "done" callback', (done) => {
        asyncCode().then(res => {
            expect(res).toBe(1);
            done();
        })
    });

    test('use async/await', async () => {
        // 1. specify how many assertions (e.g. expects) should be called
        expect.assertions(1);

        // 2. use the 'async' keyword in front of the function passed to test, so 'await' could be used inside the function
        const res = await asyncCode();
        expect(res).toBe(1);
    });
});
