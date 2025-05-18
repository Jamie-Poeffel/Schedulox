"use client";
import React, { useState } from 'react';

interface Hole {
    number: number;
    par: number;
    distance: number;
}

interface Shot {
    holeNumber: number;
    type: 'fairway' | 'left' | 'right' | 'putt' | 'onGreen';
    greenHit: boolean;
    score: number;
}

const sampleCourse: Hole[] = [
    { number: 1, par: 4, distance: 356 },
    { number: 2, par: 4, distance: 335 },
    { number: 3, par: 5, distance: 453 },
    { number: 4, par: 3, distance: 180 },
    { number: 5, par: 4, distance: 317 },
    { number: 6, par: 4, distance: 340 },
    { number: 7, par: 4, distance: 308 },
    { number: 8, par: 3, distance: 120 },
    { number: 9, par: 4, distance: 297 },
    { number: 10, par: 5, distance: 453 },
    { number: 11, par: 3, distance: 159 },
    { number: 12, par: 4, distance: 369 },
    { number: 13, par: 4, distance: 355 },
    { number: 14, par: 4, distance: 345 },
    { number: 15, par: 3, distance: 135 },
    { number: 16, par: 5, distance: 455 },
    { number: 17, par: 5, distance: 487 },
    { number: 18, par: 4, distance: 354 },
];

const Dashboard = () => {
    const [currentHole, setCurrentHole] = useState<number>(1);
    const [shots, setShots] = useState<Shot[]>([]);
    const [score, setScore] = useState<number>(0);
    const [greenReached, setGreenReached] = useState<boolean>(false);

    const addShot = (type: 'fairway' | 'left' | 'right' | 'putt' | 'onGreen', greenHit: boolean) => {
        const newShot: Shot = {
            holeNumber: currentHole,
            type,
            greenHit,
            score: score + 1
        };

        setShots([...shots, newShot]);
        setScore(score + 1);

        if (greenHit) {
            setGreenReached(true);
        }
    };

    const addPutt = () => {
        addShot('putt', false);
    };

    const nextHole = () => {
        if (currentHole < 18) {
            setCurrentHole(currentHole + 1);
            setScore(0);
            setGreenReached(false);
        }
    };

    const prevHole = () => {
        if (currentHole > 1) {
            setCurrentHole(currentHole - 1);
            const prevHoleShots = shots.filter(shot => shot.holeNumber === currentHole - 1);
            setScore(prevHoleShots.length > 0 ? prevHoleShots[prevHoleShots.length - 1].score : 0);
            setGreenReached(prevHoleShots.some(shot => shot.greenHit));
        }
    };

    const currentHoleData = sampleCourse.find(hole => hole.number === currentHole);
    const currentHoleShots = shots.filter(shot => shot.holeNumber === currentHole);
    const putts = currentHoleShots.filter(shot => shot.type === 'putt').length;

    // Statistics calculations
    const fairwaysHit = shots.filter(shot => shot.type === 'fairway').length;
    const greensInRegulation = shots.filter(shot => shot.greenHit).length;
    // const leftMisses = shots.filter(shot => shot.type === 'left').length;
    // const rightMisses = shots.filter(shot => shot.type === 'right').length;
    const totalPutts = shots.filter(shot => shot.type === 'putt').length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#7209B7]/10 to-white">
            <div className="max-w-md mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#7209B7] mb-2">Golf Tracker</h1>
                    <div className="h-1 w-20 bg-[#7209B7]/30 mx-auto rounded-full"></div>
                </div>

                {/* Hole Info Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#7209B7]/10">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-gray-800">Hole {currentHoleData?.number}</h2>
                        <p className="text-gray-500">{currentHoleData?.par} Par • {currentHoleData?.distance} yards</p>
                    </div>

                    <div className="flex justify-between mb-6">
                        <div className="text-center">
                            <div className="text-sm text-gray-500">Current Score</div>
                            <div className="text-2xl font-bold">{score}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500">Putts</div>
                            <div className="text-2xl font-bold">{putts}</div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={prevHole}
                            className={`px-4 py-2 rounded-lg ${currentHole === 1 ? 'text-gray-400' : 'text-[#7209B7] hover:bg-[#7209B7]/10'}`}
                            disabled={currentHole === 1}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={nextHole}
                            className={`px-4 py-2 rounded-lg ${currentHole === 18 ? 'text-gray-400' : 'text-[#7209B7] hover:bg-[#7209B7]/10'}`}
                            disabled={currentHole === 18}
                        >
                            Next →
                        </button>
                    </div>
                </div>

                {/* Shot Tracking */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#7209B7]/10">
                    <h3 className="text-xl font-bold text-center mb-4">
                        {greenReached ? '🕳️ Putting' : '🏌️‍♂️ Tee Shot'}
                    </h3>

                    {greenReached ? (
                        <div className="space-y-3">
                            <button
                                onClick={addPutt}
                                className="w-full bg-[#7209B7] hover:bg-[#7209B7]/90 text-white font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                + Add Putt
                            </button>
                            <button
                                onClick={() => nextHole()}
                                className="w-full text-[#7209B7] hover:bg-[#7209B7]/10 font-medium py-2 px-4 rounded-xl transition-all"
                            >
                                Next Hole
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => addShot('fairway', false)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                Fairway Hit
                            </button>
                            <button
                                onClick={() => addShot('left', false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                Missed Left
                            </button>
                            <button
                                onClick={() => addShot('right', false)}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                Missed Right
                            </button>
                            <button
                                onClick={() => addShot('onGreen', true)}
                                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                Green in Reg
                            </button>
                        </div>
                    )}
                </div>

                {/* Current Shots */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#7209B7]/10">
                    <h3 className="text-xl font-bold text-center mb-4">📝 Current Shots</h3>
                    {currentHoleShots.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No shots recorded yet</p>
                    ) : (
                        <div className="space-y-2">
                            {currentHoleShots.map((shot, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-3 rounded-lg ${shot.type === 'fairway' ? 'bg-emerald-50 border-emerald-200' :
                                        shot.type === 'left' ? 'bg-blue-50 border-blue-200' :
                                            shot.type === 'right' ? 'bg-amber-50 border-amber-200' :
                                                shot.type === 'onGreen' ? 'bg-green-50 border-green-200' :
                                                    'bg-purple-50 border-purple-200'
                                        } border`}
                                >
                                    <div>
                                        <span className="font-medium capitalize">{shot.type}</span>
                                        <span className="text-xs text-gray-500 block">Shot {index + 1}</span>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${shot.greenHit ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {shot.greenHit ? 'GIR' : 'Missed'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#7209B7]/10">
                    <h3 className="text-xl font-bold text-center mb-4">📊 Statistics</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-emerald-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-emerald-600">{fairwaysHit}</div>
                            <div className="text-xs text-emerald-800">Fairways</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{greensInRegulation}</div>
                            <div className="text-xs text-green-800">Greens</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">{totalPutts}</div>
                            <div className="text-xs text-purple-800">Putts</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;