interface ResponseObj {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type Rating = 1 | 2 | 3;

const getRating = (target: number, avg: number): Rating => {
    if (avg > target) {
        return 3;
    } else if (avg > target * 0.7) {
        return 2;
    } else {
        return 1;
    }
};

const getRatingDescription = (rating: Rating): string => {
    switch (rating) {
        case 1:
            return 'nice try, but you can do better';
        case 2:
            return 'almost there, just a little bit more';
        case 3:
            return 'well done! keep up the good work';
        default:
            return 'something went wrong with the input';
    }
};

export const calculateExercises = (exTimes: Array<number>, target: number) => {
    if (exTimes === undefined || target === undefined) {
        return { error: 'parameters missing' };
    } else if (isNaN(target) || exTimes.some(x => isNaN(x))) {
        return { error: 'malformed parameters' };
    } else {
        const totalDays = exTimes.length;
        const exerciseDays = exTimes.filter(x => x > 0).length;
        const average = exTimes.reduce((a, b) => a + b) / totalDays;
        const isSuccess = average >= target;

        const rating = getRating(target, average);
        const ratingDescription = getRatingDescription(rating);

        const response: ResponseObj = {
            periodLength: totalDays,
            trainingDays: exerciseDays,
            success: isSuccess,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average,
        };

        return response;
    }
};

// const ar = [3, 0, 2, 4.5, 0, 3, 1];

const exTimes: Array<number> = [];
const args = process.argv;
const target = Number(args[2]);

const getExTimes = () => {
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            exTimes.push(Number(args[i]));
        } else {
            throw new Error(`"${args[i]}" was not a number. try again`);
        }
    }
};

getExTimes();

calculateExercises(exTimes, target);
