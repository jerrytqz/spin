import React from 'react';
import classes from './Prize.module.css'; 
import Modal from '../../shared/userInterfaces/Modal/Modal'; 
import { COMMON, TQ, RARITY_INFO } from '../../shared/utility'; 
import Item from '../Item/Item'; 
import Confetti from 'react-confetti';
import useWindowDimensions from '../../shared/hooks/useWindowDimensions';

const Prize = (props) => {
    const prizeClasses = []; 
    if (props.item.rarity === TQ) {
        prizeClasses.push(classes.Rainbow); 
    }

    if (!props.item.description) {
        console.log(props.item.name + "'s description is not currently available.");
    }

    const VELOCITY_X = RARITY_INFO[props.item.rarity][1] * 2.5;
    const VELOCITY_Y = RARITY_INFO[props.item.rarity][1] * 5;
    const NUM_PIECES = Math.floor(275 + (275 * RARITY_INFO[props.item.rarity][1])/5);
    const {height, width, scrollX} = useWindowDimensions();

    const confettiBackground = (props.item.rarity === COMMON 
        ? null 
        :
            <>
                <Confetti 
                    width={width} 
                    height={height} 
                    numberOfPieces={NUM_PIECES}
                    style={{zIndex: 125}}
                    initialVelocityX={{min: 0, max: VELOCITY_X}}
                    initialVelocityY={VELOCITY_Y}
                    confettiSource={{
                        w: 1,
                        h: 1,
                        x: scrollX,
                        y: height,
                    }}
                />
                <Confetti 
                    width={width} 
                    height={height} 
                    numberOfPieces={NUM_PIECES}
                    style={{zIndex: 125}}
                    initialVelocityX={{min: -VELOCITY_X, max: 0}}
                    initialVelocityY={VELOCITY_Y}
                    confettiSource={{
                        w: 1,
                        h: 1,
                        x: width,
                        y: height,
                    }}
                />
                {props.item.rarity === TQ
                    ? 
                        <Confetti 
                            width={width} 
                            height={height} 
                            style={{zIndex: 125}}
                        /> 
                    : null
                }
            </>
    );

    return (
        <Modal clicked={props.clicked} animation="openPrize" background={confettiBackground}>
            <div className={classes.Prize}>
                <div className={classes.Info}>
                    You unboxed {RARITY_INFO[props.item.rarity][2]} <strong style={{color: RARITY_INFO[props.item.rarity][0]}} className={prizeClasses.join(' ')}>{props.item.rarity.toLowerCase()}</strong> item! 
                    <hr/>
                    <div className={classes.Description}>{props.item.description}</div>
                    <div className={classes.Stats}>
                        <div className={classes.Stat}>Owned: {props.item.quantity}</div>
                        <div className={classes.Stat}>In circulation: {props.item.circulationNum}</div>
                    </div>
                </div>
                <div>
                    <Item 
                        name={props.item.name} 
                        quantity={1} 
                        rarity={props.item.rarity} 
                        disableHover
                        disableSpin
                    />
                </div>
            </div>
        </Modal>
    );
};

export default Prize; 
