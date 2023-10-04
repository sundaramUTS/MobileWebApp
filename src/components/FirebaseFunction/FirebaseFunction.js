import firebaseConfig from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { limits } from "../../constant";
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const dataPerPage = 10;
export const tempInfoData = async (data, loginUserId) => {
    let countArr = {};
    const readOrUnread = firestore.collectionGroup("user_chats");
    readOrUnread
        .where("isRead", "==", false)
        .where("enc_channelID", "==", data)
        .where("userEmpID", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            if (
                snapshot.docs.length > 0
            ) {
                const newTempCount = [];

                snapshot.forEach((doc) => {
                    const user = doc.data();
                    const countArr = {
                        enc_ChannelIDCount: data,
                        readCount: snapshot.docs.length,
                    };

                    newTempCount.push(countArr);
                });
                countArr.enc_ChannelIDCount = data;
                countArr.readCount = snapshot?.docs?.length;
            }
        });
};

export const getPinData = (tempArr, setpinData, setpinTempData) => {
    const collectionRef = firestore.collection("channels");
    if (tempArr?.length > 0) {
        const batch = tempArr.splice(0, 30);
        collectionRef
            .where("enc_channelID", "in", batch)
            .limit(limits.pageSize)
            .onSnapshot((querySnapshot) => {
                const mergedResults = [];
                querySnapshot.forEach((doc) => {
                    mergedResults.push(doc.data());
                });
                setpinData(mergedResults);
                setpinTempData(mergedResults)
            });
    }
};

export const getPinChannelData = (setpinData, setpinTempData, loginUserId) => {
    const unsubscribe = firestore
        .collectionGroup(`user`)
        .where("userEmpId", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            let tempArrPin = [];
            snapshot.forEach((doc) => {
                const user = doc.data();
                if (user.isPinned) {
                    tempArrPin.push(user?.channelID.toString());
                    tempInfoData(user?.channelID.toString(), loginUserId);
                }
            });
            if (tempArrPin.length > 0) {
                getPinData(tempArrPin, setpinData, setpinTempData);
            } else {
                setpinData(tempArrPin)
                setpinTempData(tempArrPin)
            }

        });
    return () => unsubscribe();
}

export const getUnPinChannelData = (setUnpinData, currentPage, setTotalPages, unpinData, setUnTempData, loginUserId) => {
    const unsubscribe = firestore
        .collectionGroup(`user`)
        .where("userEmpId", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            let tempArrUnPin = [];
            snapshot.forEach((doc) => {
                const user = doc.data();
                if (!user.isPinned) {
                    tempArrUnPin.push(user?.channelID.toString());
                    tempInfo(user?.channelID.toString(), loginUserId);
                }
            });
            if (tempArrUnPin.length > 0) {
                getUnpinData(setUnpinData, tempArrUnPin, currentPage, unpinData, setUnTempData);
            } else {
                setUnpinData(tempArrUnPin)
                setUnTempData(tempArrUnPin)
            }
            setTotalPages(Math.ceil(tempArrUnPin.length / dataPerPage));
        });
    return () => unsubscribe();
}

export const getUnpinData = async (setUnpinData, tempArr, pageNo, unpinData, setUnTempData) => {
    try {
        const collectionRef = firestore.collection("channels");

        if (tempArr?.length > 0) {
            const startIndex = (pageNo - 1) * dataPerPage;
            const batch = tempArr.slice(startIndex, startIndex + dataPerPage);
            collectionRef
                .where("enc_channelID", "in", batch)
                .limit(dataPerPage)
                .onSnapshot((querySnapshot) => {
                    const mergedResults = querySnapshot.docs.map((doc) => doc.data());
                    setUnpinData([...unpinData, ...mergedResults]);
                    setUnTempData([...unpinData, ...mergedResults])
                })
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
let tempCount = [];
export const tempInfo = async (data, loginUserId) => {
    let countArr = {};
    const readOrUnread = firestore.collectionGroup("user_chats");
    readOrUnread
        .where("isRead", "==", false)
        .where("enc_channelID", "==", data)
        .where("userEmpID", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            countArr.enc_ChannelIDCount = data;
            countArr.readCount = snapshot?.docs?.length;
            tempCount.push(countArr);

        });
};
export const unpinChannel = (item, loginUserId) => {
    try {
        const docRef = firestore
            .collection("ChannelUserMapping")
            .doc(item?.enc_channelID)
            .collection("user")
            .where("userEmpId", "==", loginUserId);

        docRef
            .get()
            .then((querySnapshot) => {
                const document = querySnapshot.docs[0];
                if (document) {
                    const documentRef = document.ref;
                    return documentRef.update({
                        isPinned: false,
                    });
                }
            })
            .then(() => {

            })
            .catch((error) => {

            });
    } catch (error) {
        console.error(error);
    }
}
export const pinChannel = (item, loginUserId) => {
    try {
        const docRef = firestore
            .collection("ChannelUserMapping")
            .doc(item?.enc_channelID)
            .collection("user")
            .where("userEmpId", "==", loginUserId);

        docRef
            .get()
            .then((querySnapshot) => {
                const document = querySnapshot.docs[0];
                if (document) {
                    const documentRef = document.ref;
                    return documentRef.update({
                        isPinned: true,
                    });
                }
            })
            .then(() => {
            })
            .catch((error) => {

            });
    } catch (error) {
        console.error(error);
    }
}
