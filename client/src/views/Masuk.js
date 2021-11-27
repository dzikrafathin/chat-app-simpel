import React from "react";
import {Link} from "react-router-dom";

class Masuk extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {
            nama: '',
            ruangan: ''
        };

    }

    render() {
        return (
            <div className="h-full flex items-start">
                <div className="w-96 shadow-md p-4 rounded-md mx-auto my-auto bg-white">
                    <div
                        className="text-center text-indigo-500 text-lg font-semibold uppercase border-b-2 border-indigo-500 pb-2"
                    >Masuk ke Ruangan</div>
                    <div className="my-3">
                        <div className="my-1">
                            <label for="nama" className="block text-sm font-medium text-gray-700">
                                Nama
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="nama" 
                                    className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm"
                                    required
                                    value={this.state.nama}
                                    onChange={(e) => {
                                        this.setState({
                                            nama: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="my-1">
                            <label for="ruangan" className="block text-sm font-medium text-gray-700">
                                Ruangan
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="ruangan" 
                                    className="w-full border border-gray-300 border-transparent rounded-lg shadow-sm px-3 py-2 text-sm"
                                    required
                                    value={this.state.ruangan}
                                    onChange={(e) => {
                                        this.setState({
                                            ruangan: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Link
                        to={`/chat?nama=${this.state.nama}&ruangan=${this.state.ruangan}`}
                    >
                        <button 
                            className="shadow-md block w-full px-2 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 "
                        >Masuk</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Masuk;