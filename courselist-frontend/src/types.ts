// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescribedPart extends CoursePartBase {
    type: 'normal' | 'submission' | 'special';
    description: string;
}

interface CourseNormalPart extends CourseDescribedPart {
    type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescribedPart {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseRequirementPart extends CourseDescribedPart {
    type: 'special';
    requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;

export default CoursePart;
