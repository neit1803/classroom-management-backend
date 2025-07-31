const { db } = require('../config/firebase');
const functions = require('firebase-functions');

const FirebaseService = {
    addDocument: async (path, data) => {
        const ref = db.ref(path).push();
        await ref.set(data);
        return { id: ref.key, ...data };
    },

    addDocumentWithId: async (path, id, data) => {
        const ref = db.ref(`${path}/${id}`);
        await ref.set(data);
        return { id, ...data };
    },

    getAllDocuments: async (path) => {
        const snapshot = await db.ref(path).once('value');
        const result = snapshot.val();
        if (!result) return [];
        return Object.entries(result).map(([id, value]) => ({ id, ...value }));
    },

    queryByField: async (path, field, value) => {
        const snapshot = await db.ref(path)
            .orderByChild(field)
            .equalTo(value)
            .once('value');
        const result = snapshot.val();
        if (!result) return [];
        return Object.entries(result).map(([id, val]) => ({ id, ...val }));
    },

    queryByFields: async (path, query) => {
        const snapshot = await db.ref(path).once('value');
        const allData = snapshot.val();
        if (!allData) return [];

        return Object.entries(allData).filter(([id, data]) => {
            return Object.entries(query).every(([key, value]) => data[key] === value);
        }).map(([id, data]) => ({ id, ...data }));
    },

    queryByFieldWithContain: async (path, field, value) => {
        const snapshot = await db.ref(path).once('value');
        const allData = snapshot.val();
        if (!allData) return [];

        return Object.entries(allData).filter(([id, data]) => {
            const fieldValue = data[field];
            return Array.isArray(fieldValue) && fieldValue.includes(value);
        }).map(([id, data]) => ({ id, ...data }));
    },


    updateDocument: async (path, id, data) => {
        const ref = db.ref(`${path}/${id}`);
        await ref.update(data);
        return { id, ...data };
    },

    deleteDocumentById: async (path, id) => {
        const ref = db.ref(`${path}/${id}`);
        const snapshot = await ref.once('value');
        if (!snapshot.exists()) return null;
        const deletedData = { id, ...snapshot.val() };
        await ref.remove();
        return deletedData;
    },

    deleteDocumentByField: async (path, field, value) => {
        const snapshot = await db.ref(path)
            .orderByChild(field)
            .equalTo(value)
            .once('value');
        if (!snapshot.exists()) return null;

        const result = snapshot.val();
        const key = Object.keys(result)[0];
        const ref = db.ref(`${path}/${key}`);
        const deletedData = { id: key, ...result[key] };
        await ref.remove();
        return deletedData;
    },
};

module.exports = FirebaseService;
