import React from 'react';
import styles from './Header.module.scss'
import {IoHome, IoMail, IoPeople, IoPerson} from "react-icons/io5";
import HeaderButton from "@/components/header/HeaderButton";

const Header = () => {
    return (
        <div className={styles.main}>
            <HeaderButton link={'/feed'} text={`Главная`} icon={<IoHome/>}/>
            <HeaderButton link={'/profile'} text={`Профиль`} icon={<IoPerson/>}/>
            <HeaderButton link={'/msg'} text={`Сообщения`} icon={<IoMail/>}/>
            <HeaderButton link={'/friends'} text={`Друзья`} icon={<IoPeople/>}/>
        </div>
    );
};

export default Header;
