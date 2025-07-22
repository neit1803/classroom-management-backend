const { Timestamp } = require("firebase-admin/firestore");

const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor'
};

const USER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DISABLED: 'deleted',
};

class User {
  constructor({
    email,
    phone,
    name = '',
    passwordHash = '',
    role = ROLES.STUDENT,
    status = USER_STATUS.PENDING,
    createdAt = null,
    updatedAt = null,
  }) {
    if (!Object.values(ROLES).includes(role)) {
      throw new Error(`Invalid role: ${role}. Must be 'student' or 'instructor'.`);
    }
    if (!Object.values(USER_STATUS).includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be 'pending', 'active', or 'deleted'.`);
    }
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.passwordHash = passwordHash;
    this.role = role;
    this.status = status;
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
      username: this.username,
      fullName: this.fullName,
      passwordHash: this.passwordHash,
      isVerified: this.isVerified,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = { User, ROLES, USER_STATUS };
