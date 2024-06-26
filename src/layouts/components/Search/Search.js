import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/services/httpRequest';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleClickOutSide = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
        // dùng encodeURIComponent để encode giá trị searchValue khi truyền vào nhằm kh bị dính các ký tự & hay ? ... gây ra lỗi tại vì đang sử dụng nối chuổi
    }, [debouncedValue]);

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parent Node context.
        <div>
            <TippyHeadless
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search_result')} tabIndex={-1} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search_title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleClickOutSide}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={(e) => {
                                handleClear();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button
                        className={cx('search_btn')}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;
