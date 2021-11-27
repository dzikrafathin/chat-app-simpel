import React from "react";
import Pesan from "../components/Pesan";
import io from 'socket.io-client';

class Chat extends React.Component {

    constructor(props) {
        
        super(props);
     
        const params = (new URL(document.location)).searchParams;

        this.state = {
            nama: params.get('nama'),
            ruangan: params.get('ruangan'),
            pesan: '',
            daftarPesan: [],
            mengetik: null
        };

        this.handlePesan = this.handlePesan.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleMengetik = this.handleMengetik.bind(this);

        this.kirimPesan = this.kirimPesan.bind(this);

    }

    kirimPesan(event) {
        
        event.preventDefault();

        this.socket.emit('kirim_pesan', {
            pesan: this.state.pesan
        }, (error) => {
            alert(error);
        });

        this.setState({
            pesan: ''
        });

    }

    handlePesan(pesan) {

        this.setState((state) => ({
            daftarPesan: [...state.daftarPesan, pesan]
        }));

    }

    handleMengetik({nama}) {
        this.setState({
            mengetik: nama
        });
    }

    handleOnChange(event) {
        
        this.setState({
            pesan: event.target.value
        });

        this.socket.emit('sedang_mengetik');

    }

    componentDidMount() {

        this.socket = io("http://localhost:5000");

        this.socket.emit("gabung", 
            {nama: this.state.nama, ruangan: this.state.ruangan}, 
            ({error}) => {
                alert(error);
            });

        this.socket.on('pesan', this.handlePesan);
        this.socket.on('mengetik', this.handleMengetik);

    }

    render() {

        let orangMengetik;

        if (this.state.mengetik) {
            
            orangMengetik = `${this.state.mengetik} sedang mengetik.`;

            setTimeout(() => {
                this.setState({
                    mengetik: null
                })
            }, 500);

        } else {
            orangMengetik = this.state.nama;
        }

        return (
            <div className="h-full flex items-start">
                <div className="h-5/6 w-6/12 mx-auto my-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                    <div className="py-3 px-5 bg-indigo-500 flex-none">
                        <div className="text-white font-bold">{this.state.ruangan}</div>
                        <div className="text-xs text-white">
                            {orangMengetik}
                        </div>
                    </div>
                    <div className="flex-grow bg-white p-3 overflow-y-scroll">
                        {this.state.daftarPesan.map(
                            (pesan) => 
                                <Pesan 
                                    nama={pesan.nama}
                                    pesan={pesan.pesan}
                                    waktu={pesan.waktu}
                                />
                        )}
                    </div>
                    <div className="bg-indigo-50 h-16 flex-none flex p-3">
                        <input 
                            placeholder="Ketikan pesan..."
                            className="w-full rounded-lg border border-gray-400 px-3"
                            value={this.state.pesan}
                            onChange={this.handleOnChange}
                            onKeyPress={event => event.key === 'Enter' ? this.kirimPesan(event) : null}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;