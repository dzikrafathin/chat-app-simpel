const {lihatPengguna} = require('./daftarPengguna');

module.exports = (io, socket) => {

    const kirimPesan = ({pesan}, callback) => {

        const {pengguna, error} = lihatPengguna(socket.id);

        if (error) {
            callback(error);
        }        

        io.to(pengguna.ruangan).emit('pesan', {
            nama: pengguna.nama,
            pesan,
            waktu: new Date().toLocaleTimeString()
        });

    }

    const sedangMengetik = () => {

        const {pengguna, error} = lihatPengguna(socket.id);

        io.to(pengguna.ruangan).emit('mengetik', {
            nama: pengguna.nama
        });

    }

    socket.on('kirim_pesan', kirimPesan);
    socket.on('sedang_mengetik', sedangMengetik);
}