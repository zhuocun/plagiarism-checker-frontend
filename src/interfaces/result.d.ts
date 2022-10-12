interface IResult {
  _id: string,
  similarity: string,
  when: string,
  fileName: string,
  assignmentId: {
    _id: string,
    assignmentName: string
  },
  submitter: {
    _id: string,
    username: string
  }
}
