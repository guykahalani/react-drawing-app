import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { selectTool } from './toolbarSlice';
import classes from './Toolbar.module.css';
import sizeIcon from './brush-size.png';
import colorIcon from './brush-color.png';
import exportIcon from './export.png';
import clearIcon from './clear.png';

const Toolbar = () => {
    const dispatch = useAppDispatch();

    const colors = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
    const sizes = [1, 3, 5, 7, 9];

    const selectColor = (color:string) => {
        dispatch(selectTool({ tool: 'penColor', value: color}));
    }

    const colorButtons = colors.map((color:string) => {
        return (
            <li 
                className={classes.colorItem} 
                style={{ backgroundColor: color }} 
                key={color} 
                onClick={() => selectColor(color)}>
            </li>
        )
    });

    const selectSize = (size:number) => {
        dispatch(selectTool({ tool: 'penSize', value: size}));
    }

    const sizeButtons = sizes.map((size:number) => {
        return (
            <li 
                className={classes.sizeItem}
                style={{padding: `${size}px`}}
                key={`size_${size}`} 
                onClick={() => selectSize(size)}
            >
            </li>
        )
    });

    const toggleToolMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let toolIcon = e.target as Element;
        console.log(toolIcon);
        let tool = toolIcon.parentElement as HTMLElement;
        tool?.classList.toggle(classes.expand);
    }

    return (
        <div className={classes.toolbar}>
            <div className={classes.tool} key={`tool__penColor`} onClick={(e) => toggleToolMenu(e)}> 
                <span className={classes.toolIcon}
                 style={{backgroundImage: `url(${colorIcon}) `}}
                >
                </span>
                <div className={classes.toolMenuWrapper}>
                    <ul className={classes.toolMenu}>
                        { colorButtons }
                    </ul>
                </div>
            </div>
            <div className={classes.tool} key={`tool__penSize`} onClick={(e) => toggleToolMenu(e)}> 
                <span 
                    className={classes.toolIcon}
                    style={{backgroundImage: `url(${sizeIcon}) `}}
                >    
                </span>
                <div className={classes.toolMenuWrapper}>
                    <ul className={classes.toolMenu}>
                        { sizeButtons }
                    </ul>
                </div>
            </div>
            <div 
                className={classes.tool} 
                key={`tool__export`} 
                onClick={() => dispatch(selectTool({ tool: 'export', value: null }))}
                > 
                <span
                    className={classes.toolIcon}
                    style={{backgroundImage: `url(${exportIcon})`}}
                >
                </span>
            </div>
            <div 
                className={classes.tool} 
                key={`tool__clear`} 
                onClick={() => dispatch(selectTool({ tool: 'clear', value: null }))}
                > 
                <span
                    className={classes.toolIcon}
                    style={{backgroundImage: `url(${clearIcon})`}}
                >
                </span>
            </div>
        </div>
    )
}

export default Toolbar
