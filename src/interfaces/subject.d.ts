interface ISubject {
    subjectCode: string;
    subjectName: string;
    teachers: {
        _id: string;
        username: string;
        email: string;
    }[];
    assignments: string[],
    _id: string
}
