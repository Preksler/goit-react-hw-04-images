import { useState } from 'react';
import PropTypes from 'prop-types';
import { CgSearch } from 'react-icons/cg'
import css from "./Searchbar.module.css";

function Searchbar({ onSearch }) {
    const [search, setSearch] = useState('');

    const inputSearchValue = (e) => {
        setSearch(e.target.value);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    }

    return (
        <header className={css.searchbar}>
            <form
                className={css.searchForm}
                onSubmit={formSubmit}>
                <button type="submit" className={css.searchForm__button}>
                    <CgSearch size={24} />
                </button>

                <input
                    className={css.searchForm__input}
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={inputSearchValue}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default Searchbar;