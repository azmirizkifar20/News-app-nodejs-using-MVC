exports.api = function (values, status, res) {
    var data = {
        'status': status,
        'values': values
    }
    res.json(data);
    res.end();
}