import React from 'react';
import Image from "next/image";

const DM = () => {
    return (
        <div>
        {/*    Head*/}
            <div>
                <Image src={'/next.svg'} alt={'avatar'}/>
                <h1>Alex Alex</h1>
            </div>
        {/*    Chat*/}

        {/*    Input*/}
            <div>
                <input/>
                <button></button>
                <button></button>
            </div>
        </div>
    );
};

export default DM;
