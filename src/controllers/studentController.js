const getStudentLessons = (req, res) => {
    res.send('List of student\'s lessons');
};

const markLessonDone = (req, res) => {
    res.send('Mark lesson as done');
};

const editProfile = (req, res) => {
    res.send('Update profile');
};

module.exports = {
    getStudentLessons,
    markLessonDone,
    editProfile
};