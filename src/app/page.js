'use client';
import { useState, useEffect } from 'react';

export default function Home() {
    const [xTurn, setXTurn] = useState(true);
    const [boardData, setBoardData] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
    });
    const [won, setWon] = useState(false);
    const [wonCombo, setWonCombo] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    const WINNING_COMBO = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        WINNING_COMBO.map((values) => {
            const [a, b, c] = values;
            if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? 'X' : 'O'} Won!!!`);
                return;
            }
        });
    };

    useEffect(() => {
        checkWinner();
    }, [boardData]);

    const updateBoardData = (index) => {
        if (!boardData[index] && !won) {
            let value = xTurn === true ? 'X' : 'O';
            setBoardData({ ...boardData, [index]: value });
            setXTurn(!xTurn);
        }
    };

    const reset = () => {
        setBoardData({
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: '',
        });
        setXTurn(true);
        setWon(false);
        setWonCombo([]);
        setModalTitle('');
    };

    return (
        <>
            <h1 className='text-center text-5xl m-10'>Tic Tac Toe</h1>
            <div className='flex flex-col align-middle mt-6 '>
                <div className='text-center text-2xl font-semibold'>
                    <p>{xTurn === true ? 'X Turn' : 'O Turn'}</p>
                    {/* <p>{`Game Won:${won}`}</p> */}
                </div>
                <div className='grid grid-cols-3 gap-2 text-center pr-20 pb-20 pl-20 '>
                    {[...Array(9)].map((v, index) => {
                        return (
                            <div
                                key={index}
                                className={`bg-gray-500 rounded-lg p-5 text-center text-5xl leading-10 font-bold w-100 h-20 cursor-pointer shadow-md ${
                                    wonCombo.includes(index) ? 'bg-green-300' : ''
                                }`}
                                onClick={() => {
                                    updateBoardData(index);
                                }}
                            >
                                {boardData[index]}
                            </div>
                        );
                    })}
                </div>
                <div
                    className={`shadow-lg w-3/6 text-center rounded-2xl flex flex-col align-middle p-6 fixed top-1/3 left-1/2 bg-white text-black translate-y-2/4 translate-x-2/4 scale-0 transition duration-200 ${
                        modalTitle ? 'show' : ''
                    }`}
                >
                    <div className='modal__title'>{modalTitle}</div>
                    <button
                        onClick={reset}
                        className='h-16 bg-gray-500 border-none font-bold shadow-lg'
                    >
                        New Game
                    </button>
                </div>
            </div>
        </>
    );
}
1;
