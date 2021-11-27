const daftarPengguna = [];

const tambahPengguna = (id, nama, ruangan) => {

    const sudahAda = daftarPengguna.find((pengguna) => pengguna.nama === nama);

    if (sudahAda) {
        return {
            error: 'Sudah ada yang make'
        };
    }

    const pengguna = {
        id,
        nama,
        ruangan
    };

    daftarPengguna.push(pengguna);

    return {pengguna};
}

const lihatPengguna = (id) => {

    const pengguna = daftarPengguna.find((pengguna) => pengguna.id === id);

    if (!pengguna) {
        return {
            error: 'Pengguna tidak terdaftar'
        }
    }

    return {pengguna};

}

module.exports = {tambahPengguna, lihatPengguna};