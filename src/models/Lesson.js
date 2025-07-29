const { Timestamp } = require('firebase-admin/firestore');

class Lesson {
  constructor({
    title= '',
    description = '',
    instructorId= '',
    students = [],
    createdAt = null,
  }) {
    this.title = title;
    this.description = description;
    this.instructorId = instructorId;
    this.students = students || [];
    this.createdAt = createdAt || Timestamp.now();
  }

  static fromJson(json) {
    return new Lesson(json);
  }

  toJson() {
    return {
      title: this.title,
      description: this.description,
      instructorId: this.instructorId,
      students: this.students,
      createdAt: this.createdAt,
    };
  }
  
  toFilteredJson() {
    return {
      title: this.title,
      description: this.description,
      instructorId: this.instructorId,
    };
  }
}

module.exports = { Lesson };
