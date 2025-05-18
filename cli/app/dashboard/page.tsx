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
    { number: 1, par: 4, distance: 380 },
    { number: 2, par: 5, distance: 520 },
    { number: 3, par: 3, distance: 160 },
    // ... add all 18 holes
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

        // If this shot hit the green, switch to putting mode
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
            // Find last score for previous hole
            const prevHoleShots = shots.filter(shot => shot.holeNumber === currentHole - 1);
            setScore(prevHoleShots.length > 0 ? prevHoleShots[prevHoleShots.length - 1].score : 0);
            // Check if green was reached on previous hole
            setGreenReached(prevHoleShots.some(shot => shot.greenHit));
        }
    };

    const currentHoleData = sampleCourse.find(hole => hole.number === currentHole);
    const currentHoleShots = shots.filter(shot => shot.holeNumber === currentHole);
    const putts = currentHoleShots.filter(shot => shot.type === 'putt').length;

    // Statistics calculations
    const fairwaysHit = shots.filter(shot => shot.type === 'fairway').length;
    const greensInRegulation = shots.filter(shot => shot.greenHit).length;
    const leftMisses = shots.filter(shot => shot.type === 'left').length;
    const rightMisses = shots.filter(shot => shot.type === 'right').length;
    const totalPutts = shots.filter(shot => shot.type === 'putt').length;

    const getShotColor = (type: 'fairway' | 'left' | 'right' | 'putt' | 'onGreen') => {
        switch (type) {
            case 'fairway': return 'bg-emerald-50 border-emerald-300 text-emerald-800';
            case 'left': return 'bg-sky-50 border-sky-300 text-sky-800';
            case 'right': return 'bg-amber-50 border-amber-300 text-amber-800';
            case 'putt': return 'bg-purple-50 border-purple-300 text-purple-800';
            case 'onGreen': return 'bg-green-50 border-green-300 text-green-800';
            default: return 'bg-gray-50 border-gray-300 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-green-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6">
                    {/* Hole Information */}
                    <div className="text-center mb-6 bg-gray-50 p-4 rounded-md">
                        <h2 className="text-xl font-bold text-gray-800">Hole {currentHoleData?.number}</h2>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <div className="bg-white p-2 rounded border border-gray-200">
                                <div className="text-sm text-gray-500">Par</div>
                                <div className="font-bold">{currentHoleData?.par}</div>
                            </div>
                            <div className="bg-white p-2 rounded border border-gray-200">
                                <div className="text-sm text-gray-500">Distance</div>
                                <div className="font-bold">{currentHoleData?.distance} yd</div>
                            </div>
                            <div className="bg-white p-2 rounded border border-gray-200">
                                <div className="text-sm text-gray-500">Score</div>
                                <div className="font-bold">{score}</div>
                            </div>
                            <div className="bg-white p-2 rounded border border-gray-200">
                                <div className="text-sm text-gray-500">Putts</div>
                                <div className="font-bold">{putts}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <button
                                onClick={prevHole}
                                className="text-sm text-gray-600 hover:text-gray-800"
                                disabled={currentHole === 1}
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={nextHole}
                                className="text-sm text-gray-600 hover:text-gray-800"
                                disabled={currentHole === 18}
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {/* Shot Tracking */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">
                            {greenReached ? 'Putting' : 'Tee Shot'}
                        </h3>

                        {greenReached ? (
                            <div className="space-y-2">
                                <button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md text-sm transition-colors"
                                    onClick={addPutt}
                                >
                                    Add Putt
                                </button>
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition-colors mt-2"
                                    onClick={() => setGreenReached(false)}
                                >
                                    Back to Tee Shots
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <button
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-2 rounded-md border-b-2 border-emerald-700 text-sm transition-colors"
                                        onClick={() => addShot('fairway', false)}
                                    >
                                        Fairway Hit
                                    </button>
                                    <button
                                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-2 rounded-md border-b-2 border-sky-700 text-sm transition-colors"
                                        onClick={() => addShot('left', false)}
                                    >
                                        Missed Left
                                    </button>
                                    <button
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-2 rounded-md border-b-2 border-amber-700 text-sm transition-colors"
                                        onClick={() => addShot('right', false)}
                                    >
                                        Missed Right
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-2 rounded-md border-b-2 border-green-700 text-sm transition-colors"
                                        onClick={() => addShot('onGreen', true)}
                                    >
                                        Green in Regulation
                                    </button>
                                    <button
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-2 rounded-md border-b-2 border-blue-600 text-sm transition-colors"
                                        onClick={() => addShot('left', false)}
                                    >
                                        Left of the Green
                                    </button>
                                    <button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-2 rounded-md border-b-2 border-orange-600 text-sm transition-colors"
                                        onClick={() => addShot('right', false)}
                                    >
                                        Right of the Green
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Current Hole Shots */}
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-medium text-gray-700">Current Hole Shots</h3>
                            <span className="bg-white text-gray-600 py-1 px-2.5 rounded-full text-xs border border-gray-200">
                                {currentHoleShots.length} shots
                            </span>
                        </div>
                        {currentHoleShots.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-2">No shots recorded for this hole</p>
                        ) : (
                            <ul className="space-y-1.5">
                                {currentHoleShots.map((shot, index) => (
                                    <li
                                        key={index}
                                        className={`border-l-3 py-1.5 px-3 rounded-sm ${getShotColor(shot.type)} flex justify-between items-center`}
                                    >
                                        <div>
                                            <span className="text-xs text-gray-500 mr-2">Shot {index + 1}</span>
                                            <span className="text-sm capitalize">{shot.type}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${shot.greenHit ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {shot.type === 'putt' ? 'Putt' : shot.greenHit ? 'GIR' : 'Missed'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Statistics */}
                    <div className="bg-white p-4 rounded-md border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Round Statistics</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-emerald-600 font-bold text-xl">{fairwaysHit}</div>
                                <div className="text-xs text-gray-500">Fairways Hit</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-green-600 font-bold text-xl">{greensInRegulation}</div>
                                <div className="text-xs text-gray-500">Greens in Regulation</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-sky-600 font-bold text-xl">{leftMisses}</div>
                                <div className="text-xs text-gray-500">Left Misses</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-amber-600 font-bold text-xl">{rightMisses}</div>
                                <div className="text-xs text-gray-500">Right Misses</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-purple-600 font-bold text-xl">{totalPutts}</div>
                                <div className="text-xs text-gray-500">Total Putts</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="text-blue-600 font-bold text-xl">
                                    {shots.length > 0 ? Math.round((fairwaysHit / shots.filter(s => s.type !== 'putt').length * 100)) : 0}%
                                </div>
                                <div className="text-xs text-gray-500">Fairway Accuracy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;