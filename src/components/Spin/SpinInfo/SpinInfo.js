import React from 'react';
import Rarity from './Rarity/Rarity'; 
import classes from './SpinInfo.module.css';
import Modal from '../../../shared/UI/Modal/Modal'; 

const spinInfo = () => (
    <div className={classes.Position}>
        <Modal width="200px">
            <ul className={classes.SpinInfo}>
                <Rarity rarityType="Common" rarityChance="52%" rarityColor="brown" animation="none"/>
                <Rarity rarityType="Uncommon" rarityChance="20%" rarityColor="cyan" animation="none"/>
                <Rarity rarityType="Rare" rarityChance="15%" rarityColor="red" animation="none"/>
                <Rarity rarityType="Epic" rarityChance="10%" rarityColor="purple" animation="none"/>
                <Rarity rarityType="Holy" rarityChance="2%" rarityColor="orange" animation="none"/>
                <Rarity rarityType="Godly" rarityChance="0.99%" rarityColor="yellow" animation="none"/>
                <Rarity rarityType="???" rarityChance="0.01%"/>
            </ul>
        </Modal>
    </div>
)

export default spinInfo; 
