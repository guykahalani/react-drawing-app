import classes from './Header.module.css'
import logo from './logo.png'

const Header = () => {
    return (
        <header className={classes.header}>
            <img src={logo} alt="logo" className={classes.logo} />
            <h1>Drawing App</h1>
        </header>
    )
}

export default Header
