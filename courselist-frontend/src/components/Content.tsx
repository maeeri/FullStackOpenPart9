import CoursePart from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartComponenProps) => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>description: {part.description}</div>
                </div>
            );

        case 'groupProject':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>group project count: {part.groupProjectCount}</div>
                </div>
            );
        case 'submission':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>description: {part.description}</div>
                    <div>link: {part.exerciseSubmissionLink}</div>
                </div>
            );
        case 'special':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>description: {part.description}</div>
                    <br />
                    <i>required skills:</i>
                    <ul>
                        {part.requirements?.map(c => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                </div>
            );

        default:
            return assertNever(part);
    }
};

const Content = ({ courseList }: CourseList) => {
    console.log(courseList);
    return (
        <div>
            {courseList.map(c => (
                <Part part={c} key={c.name} />
            ))}
        </div>
    );
};

type PartComponenProps = {
    key?: string;
    part: CoursePart;
};

type CourseList = {
    courseList: Array<CoursePart>;
};

export default Content;
