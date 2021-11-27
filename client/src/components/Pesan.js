import React from "react";

const Pesan = (props) => {
    return (
        <div className="border shadow-sm rounded-lg px-2 py-1 mb-2">
            <div className="flex">
                <div className="font-semibold text-sm flex-grow">
                    {props.nama}
                </div>
                <div className="text-xs">
                    {props.waktu}
                </div>
            </div>
            <div className="">{props.pesan}</div>
        </div>
    );
}

export default Pesan;