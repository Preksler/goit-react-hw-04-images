import PropTypes from 'prop-types';
import css from "./Button.module.css";

function Button({ onLoadMore} ) {
    return (
        <div className={css.wrapper}><button onClick={onLoadMore} className={css.button}>LoadMore</button></div>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired
}

export default Button;