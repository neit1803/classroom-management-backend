const {db} = require('../config/firebase');

const FirebaserService = {
    addDocument: async (collection, data) => {
        return db.collection(collection).add(data);
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

    deleteDocumentByPhone: async (collection, phone) => {
        const snapshot = await db.collection(collection).where('phone', '==', phone).limit(1).get();
        if (snapshot.empty) {
            return null;
        }
        const doc = snapshot.docs[0];
        const deletedData = { id: doc.id, ...doc.data() };
        await doc.ref.delete();
        return deletedData;
    },
};

module.exports = FirebaserService;