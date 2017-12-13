var NoModuleB = function (value) {
    this._value = value;
};
NoModuleB.prototype.getValue = function () {
    return 2 * this._value;
}