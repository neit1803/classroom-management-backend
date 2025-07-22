const { Timestamp } = require("firebase-admin/firestore");

const ROLES = {
  STUDENT: 'STUDENT',
  INSTRUCTOR: 'INSTRUCTOR'
};

const USER_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
};

class User {
  constructor({
    email= '',
    phone= '',
    name = '',
    passwordHash = '',
    role = ROLES.STUDENT,
    status = USER_STATUS.PENDING,
    createdAt = null,
    updatedAt = null,
  }) {
    if (!Object.values(ROLES).includes(role.toUpperCase())) {
      throw new Error(`Invalid role: ${role}. Must be 'student' or 'instructor'.`);
    }
    if (!Object.values(USER_STATUS).includes(status.toUpperCase())) {
      throw new Error(`Invalid status: ${status}. Must be 'pending', 'active', or 'deleted'.`);
    }
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.passwordHash = passwordHash;
    this.role = role || ROLES.STUDENT;
    this.status = status || USER_STATUS.PENDING;
    this.createdAt = createdAt || Timestamp.now();
    this.updatedAt = updatedAt || Timestamp.now();
  }

  static fromJson(json) {
    return new User({
      email: json.email,
      phone: json.phone,
      name: json.name,
      passwordHash: json.passwordHash,
      role: json.role,
      status: json.status,  
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    });
  }

  toJson() {
    return {
      email: this.email,
      phone: this.phone,
      name: this.name,
      passwordHash: this.passwordHash,
      role: this.role.toUpperCase(),
      status: this.status.toUpperCase(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = { User, ROLES, USER_STATUS };
