/* globals NoModuleA:false */

test('global non-module JS', () => {
    expect(NoModuleA.STATIC_VAR).toBe(100);

    let noModuleA = new NoModuleA(10);
    expect(noModuleA.getValue()).toBe(20);
});