import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Canvas.module.css';
import { useAppSelector } from '../../app/hooks';
import {
    selectPenColor,
    selectPenSize
} from '../toolbar/toolbarSlice';

type Coordinate = {
    x: number;
    y: number;
}

const Canvas = () => {

    const penColor = useAppSelector(selectPenColor);
    const penSize = useAppSelector(selectPenSize);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop};
    }

    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = penColor;
            context.lineJoin = 'round';
            context.lineWidth = penSize;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    }

    const startPaint = useCallback( (event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    const paint = useCallback( (event: MouseEvent) => {
        if (isPainting) {
            const newMousePosition = getCoordinates(event);
            if (mousePosition && newMousePosition) {
                drawLine(mousePosition, newMousePosition);
                setMousePosition(newMousePosition);
            }
        }
    }, [isPainting, mousePosition]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    // Start drawing when the mouse is pressed
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        }
    }, [startPaint]);
    
    // Draw the line on mouse move
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        }
    }, [paint]);

    // Stop drawing on mouse release
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    
    

    return (
        <canvas ref={canvasRef} id='drawingCanvas' className={styles.canvas} width={canvasRef.current?.clientWidth} height={canvasRef.current?.clientHeight}></canvas>
    )
}

export default Canvas
