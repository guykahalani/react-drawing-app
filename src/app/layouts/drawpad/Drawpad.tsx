import Canvas from '../../../features/canvas/Canvas'
import Toolbar from '../../../features/toolbar/Toolbar'
import classes from './Drawpad.module.css'

const Drawpad = () => {
    return (
        <div className={classes.drawpad}>
            <Toolbar />
            <Canvas />
        </div>
    )
}

export default Drawpad
