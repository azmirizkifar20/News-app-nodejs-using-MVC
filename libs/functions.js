// fungi format tanggal indonesia
exports.tanggalIndo = function (tanggal) {
    var split = tanggal.split('-');
    arrbulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var bulan = Number(split[[1]]);
    var kirim = split[2] + ' ' + arrbulan[bulan] + ' ' + split[0];

    return kirim;
}

// fungsi konversi title ke slug
exports.slugConvert = function (title) {
    var titleKecil = title.toLowerCase();
    var slug = titleKecil.split(' ').join('-');

    return slug;
}

// fungsi show alert
exports.showAlert = function (response, message, url) {
    console.log("Password confirmation is not match!");
    var alert = "<script>alert('" + message + "');";
    alert += "document.location.href = '" + url + "'</script>";
    console.log(alert);
    response.end(alert);
}