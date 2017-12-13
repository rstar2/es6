var NoModuleA = function (value) {
    this._value = new NoModuleB(value);
};
NoModuleA.prototype.getValue = function () {
    return this._value.getValue();
}
NoModuleA.STATIC_VAR = 100;