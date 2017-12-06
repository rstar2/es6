const myBeverage = {
    delicious: true,
    sour: false,
};

describe('Suite', () => {
    beforeAll(() => {
        //console.log('Before all');
    });
    beforeEach(() => {
        //console.log('Before each');
    });

    test('is delicious', () => {
        expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
        expect(myBeverage.sour).toBeFalsy();
    });
});