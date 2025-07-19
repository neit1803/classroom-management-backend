const {db} = require('../config/firebase');

const FirebaserService = {
    addDocument: async (collection, data) => {
        return db.collection(collection).doc(data.id).set(data);
    },
    getAllDocuments: async (collection) => {
        const snapshot = await db.collection(collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    queryByField: async (collection, field, value) => {
        const snapshot = await db.collection(collection).where(field, '==', value).get();
        return snapshot.docs.map(doc => doc.data());
    },
    updateDocument: async (collection, id, data) => {
        return db.collection(collection).doc(id).update(data);
    },

    deleteDocument: async (collection, id) => {
        return db.collection(collection).doc(id).delete();
    },
};

module.exports = FirebaserService;