interface IAssignment {
    _id: string;
    subjectCode: string | undefined;
    assignmentName: string;
    dueDate: string;
    dataset: string[];
    maxCheckTimes: number;
    threshold: number;
}
