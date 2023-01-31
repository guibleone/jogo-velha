import React from 'react'
import { useState, useEffect } from 'react'
import './JogoVelha.css'

const JogoVelha = () =>{
    const array = Array(9).fill('')

    const [board, setBoard] = useState(array)
    const [currentPlayer,setCurrentPlayer] = useState('O')
    const [winner, setWinner] = useState(null)

    const [scoreO, setScoreO] = useState(0)
    const [scoreX, setScoreX] = useState(0)


    const handleCellClick = (index)=>{
        if(winner) {
            console.log('Jogo Finalizado')
            return null
        }

        if(board[index] !='') {
            console.log('Posição ocupada')
            return null
        }
        setBoard(board.map((item, itemIndex) => 
        itemIndex === index ? currentPlayer : item))

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    
    }

    const checkWinner = () =>{
        const possibleWaysToWin = [
            [board[0], board[1], board[2]],
            [board[3],board[4],board[5]],
            [board[6],board[7],board[8]],

            [board[0],board[3],board[6]],
            [board[1],board[4],board[7]],
            [board[2],board[5],board[8]],

            [board[0],board[4],board[8]],
            [board[2],board[4],board[6]],
        ]

        possibleWaysToWin.forEach((cells)=> {
            if(cells.every(cell => cell === 'O')){
                setScoreO((previus) => previus+1)
                setWinner('O')
            }
            if(cells.every(cell => cell === 'X')){
                setScoreX((previus) => previus+1)
                setWinner('X')
            }

            checkDraw()
        })
    }
    const checkDraw = () =>{
        if(board.every(cell => cell !== '')){
            setWinner('E')
        }
    }
    const resetGame = () =>{
        setCurrentPlayer('O')
        setBoard(array)
        setWinner(null)
    }

    useEffect(checkWinner,[board])


    return(
    <main>
        <h1 className='title'>Jogo da Velha</h1>

        <div className='score'>
            <h2 className='score-player '>Jogador 'O' : <span className='O' >{scoreO} pontos</span></h2>
            <h2 className='score-player '>Jogador 'X' : <span className='X'>{scoreX} pontos</span></h2>
        </div>


        <div className={`board ${winner ? 'game-over' : '' }`}>
            {board.map((item,index)=> 
            (
                <div 
                onClick={() => handleCellClick(index)}
                key={index} 
                className={`cell ${item}`}>
                    {item}
                </div>

            ))}
            
        </div>
        {winner &&
        <footer>
            {winner == 'E' ?  <h2 className='winner-message'>
                <span className={winner}>Deu Velha!</span>        
            </h2>
            :
            <h2 className='winner-message'>
                <span className={winner}>{winner}</span> venceu!        
            </h2>
            }
            <button onClick={resetGame}>Recomeçar</button>
        </footer>
        }
    </main>
    )
}

export default JogoVelha