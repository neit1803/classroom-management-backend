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
    queryByFields: async (collection, query) => {
        let ref = db.collection(collection);
        for (const [field, value] of Object.entries(query)) {
            ref = ref.where(field, '==', value);
        }
        const snapshot = await ref.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    queryByFieldWithContain: async (collection, field, value) => {
        const snapshot = await db.collection(collection).where(field, 'array-contains', value).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

    deleteDocumentById: async (collection, id) => {
        const docRef = db.collection(collection).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }
        const deletedData = { id: doc.id, ...doc.data() };
        await docRef.delete();
        return deletedData;
    }   
};

module.exports = FirebaserService;