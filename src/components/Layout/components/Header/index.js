import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faEllipsisVertical,
    faCircleQuestion,
    faKeyboard,
    faEarthAsia,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Image from '~/components/Image';

import { Wrapper as PopperWrapper } from '~/components/Poper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Poper/Menu';
import { AddIcon, MailIcon, MessengerIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'VietNam',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const user_menu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@tobi',
    },

    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },

    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },

    ...MENU_ITEMS,

    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/settings',
        separate: true,
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const currentUser = true;

    // handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok"></img>
                </div>
                <TippyHeadless
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search_result')} tabIndex={-1} {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search_title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false}></input>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search_btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </TippyHeadless>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button outline outlineGray leftIcon={<AddIcon />}>
                                Tải Lên
                            </Button>

                            <Tippy content="Tin Nhắn">
                                <button className={cx('action_btn')}>
                                    <MessengerIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Hộp Thư">
                                <button className={cx('action_btn')}>
                                    <MailIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button outline outlineGray>
                                Tải lên
                            </Button>
                            {/*
                    Nếu muốn custom một kiểu đặc biệt mới thì sử dụng 
                    classname rồi truyền cx(tên class muốn đặt vào )rồi sau đó css cho class vd truyền cho button
                    prop className={cx('custom-login')}
                    */}
                            <Button primary>Login</Button>
                        </>
                    )}

                    <Menu items={currentUser ? user_menu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user_avatar')}
                                src="https://picsum.photos/400/400aaaaa"
                                alt="Nguyen Van A"
                                fallBack={images.duckImage}
                            />
                        ) : (
                            <button className={cx('more_btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
