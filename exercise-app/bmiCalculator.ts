interface BmiObj {
    height?: string;
    weigth?: string;
    bmi: string;
}

export const calculateBmi = (height: number, weight: number) => {
    height = height / 100;
    const bmi = weight / (height * height);
    let description;

    if (bmi <= 18.5) {
        description = 'Underweight';
    } else if (bmi <= 24.9) {
        description = 'Healthy weight';
    } else if (bmi > 25) {
        description = 'Overweight';
    } else {
        description = 'malformatted parameters';
        return { description: description };
    }

    const response: BmiObj = { height: `${height * 100} cm`, weigth: `${weight} kg`, bmi: description };
    return response;
};

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);

// if (isNaN(height) || isNaN(weight)) {
//     throw new Error('please use numbers only to enter height and weight')
// }

// console.log(calculateBmi(height, weight));
