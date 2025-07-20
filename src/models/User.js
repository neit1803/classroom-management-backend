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
    username = '',
    fullName = '',
    passwordHash = '',
    isVerified = false,
    role = ROLES.STUDENT,
    status = 'pending',
    createdAt = null,
    updatedAt = null
  }) {
    if (!Object.values(ROLES).includes(role)) {
      throw new Error(`Invalid role: ${role}. Must be 'student' or 'instructor'.`);
    }
    if (!Object.values(USER_STATUS).includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be 'pending', 'active', or 'deleted'.`);
    }
    this.email = email;
    this.username = username;
    this.fullName = fullName;
    this.passwordHash = passwordHash;
    this.isVerified = isVerified;
    this.role = role;
    this.status = status;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  static fromJson(json) {
    return new User({
      email: json.email,
      username: json.username,
      fullName: json.fullName,
      passwordHash: json.passwordHash,
      isVerified: json.isVerified,
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

module.exports = { User, ROLES };
