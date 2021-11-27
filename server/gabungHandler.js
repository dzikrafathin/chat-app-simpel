const {tambahPengguna} = require('./daftarPengguna');

module.exports = (io, socket) => {

    const gabung = ({nama,ruangan}, callback) => {

        const {pengguna, error} = tambahPengguna(socket.id, nama, ruangan);

        if (error) {
            callback(error);
        }

        io.emit('pesan', {
            nama: 'Admin',
            pesan: `Selamat datang di ruangan ${pengguna.ruangan}, ${pengguna.nama}`,
            waktu: new Date().toLocaleTimeString()
        });

        io.to(pengguna.ruangan).emit('pesan', {
            nama: 'Admin',
            pesan: `${pengguna.nama} telah begabung`,
            waktu: new Date().toLocaleTimeString()
        });

        socket.join(ruangan);

    }

    const keluar = () => {

    }

    socket.on("gabung", gabung);
    socket.on("keluar", keluar);
}