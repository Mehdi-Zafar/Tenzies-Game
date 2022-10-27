import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti'

const Content = () => {

    const [dice,setDice] = useState(allNewDie())
    const [victory,setVictory] = useState(false)

    function generateNewDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: uuidv4()
        }
    }

    function allNewDie(){
        const die = [];
        for(let i=0;i<10;i++){
            die.push(generateNewDie())
        }
        return die
    }
     
    function rollDice(){
        if(victory){
            setDice(allNewDie())
            setVictory(false)
        }else{
            setDice(dice=>dice.map((die)=>{
                return die.isHeld ? die : generateNewDie()
            }))
        }
    }

    function handleClick(id){
        setDice(dice.map((die)=>{
            return die.id === id ? {...die,isHeld:!die.isHeld} : die
        }))
    }

    useEffect(()=>{
        const allHeld = dice.every(die=>die.isHeld)
        const firstValue = dice[0].value
        const sameHeld = dice.every(die=>die.value === firstValue)
        if (allHeld && sameHeld){
            setVictory(true)
            console.log("won")
        }
    },[dice])

    const list1=[];
    for(let i=0;i<5;i++){
        list1.push(<div className="box" style={{backgroundColor: dice[i].isHeld ? "lightGreen":"white"}} key={dice[i].id} onClick={()=>handleClick(dice[i].id)}>{dice[i].value}</div>)
    }

    const list2=[];
    for(let i=5;i<10;i++){
        list2.push(<div className="box" style={{backgroundColor: dice[i].isHeld ? "lightGreen":"white"}} key={dice[i].id} onClick={()=>handleClick(dice[i].id)}>{dice[i].value}</div>)
    }


    return ( 
        <div>
            {victory &&<Confetti/>}
            <div className="content-container">
                {list1}
            </div>
            <div className="content-container">
                {list2}
            </div>
            <button onClick={rollDice}>{victory ? "Next Game" : "Roll"}</button>
        </div>
     );
}
 
export default Content;