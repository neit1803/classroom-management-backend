const getAllStudents = (req, res) => {
  res.send('List of students')
}

const getStudentByPhone = (req, res) => {
  res.send('About student')
}

const addStudent = (req, res) => {
  res.send('Add a new student')
}

const addLesson = (req, res) => {
  res.send('Add a new lesson')
}

const deleteStudent = (req, res) => {
  res.send('Delete a student')
}

const editStudent = (req, res) => {
  res.send('Update a student')
}

module.exports = {
  getAllStudents,
  getStudentByPhone,
  addStudent,
  addLesson,
  deleteStudent,
  editStudent
}