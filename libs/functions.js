// fungi format tanggal indonesia
exports.tanggalIndo = function (tanggal) {
    var split = tanggal.split('-');
    arrbulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var bulan = Number(split[[1]]);

    var kirim = split[2] + ' ' + arrbulan[bulan] + ' ' + split[0];
    return kirim;
}