import React from 'react'
import firebaseConfig from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { limits } from "../../constant";
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const loginUserId = localStorage.getItem("EmployeeID");
const dataPerPage = 10;
export const tempInfoData = async (data) => {
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

export const getPinData = (tempArr, setpinData) => {
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
            });
    }
};

export const getPinChannelData = (setpinData) => {
    let tempArrPin = [];
    const unsubscribe = firestore
        .collectionGroup(`user`)
        .where("userEmpId", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const user = doc.data();
                if (user.isPinned) {
                    tempArrPin.push(user?.channelID.toString());
                    tempInfoData(user?.channelID.toString());
                }
            });
            getPinData(tempArrPin, setpinData);
        });
    return () => unsubscribe();
}

export const getUnPinChannelData = (setUnpinData, currentPage, setTotalPages, unpinData) => {
    let tempArrUnPin = [];
    const unsubscribe = firestore
        .collectionGroup(`user`)
        .where("userEmpId", "==", loginUserId)
        .limit(limits.pageSize)
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const user = doc.data();
                if (!user.isPinned) {

                    tempArrUnPin.push(user?.channelID.toString());
                    tempInfo(user?.channelID.toString());
                }
            });
            setTotalPages(Math.ceil(tempArrUnPin.length / dataPerPage));
            getUnpinData(setUnpinData, tempArrUnPin, currentPage, unpinData);
        });
    return () => unsubscribe();
}

export const getUnpinData = async (setUnpinData, tempArr, pageNo, unpinData) => {
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
                })
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
let tempCount = [];
export const tempInfo = async (data) => {
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
export const unpinChannel = (item, setpinChannel) => {
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
                    setpinChannel(true)
                    return documentRef.update({
                        isPinned: false,
                    });
                }
            })
            .then(() => {
                // console.log("Document updated successfully");
            })
            .catch((error) => {
                // console.error("Error updating document:", error);
            });
    } catch (error) {
        console.error(error);
    }
}
export const pinChannel = (item, setunpinChannel) => {
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
                    setunpinChannel(true)
                    return documentRef.update({
                        isPinned: true,
                    });
                }
            })
            .then(() => {
                // return 0;
                // console.log("Document updated successfully");
            })
            .catch((error) => {
                // console.error("Error updating document:", error);
            });
    } catch (error) {
        console.error(error);
    }
}

export const fetchdata = (search, setCurrentPage) => {
    if (search) {
        // const collectionRef = firestore.collection("channels");
        // let filteredData = [];
        // const batchedQueries = [];
        // const batchSize = 30; // Number of values per batch

        // for (let i = 0; i < unpinData.length; i += batchSize) {
        //     const batch = unpinData.slice(i, i + batchSize);
        //     const query = collectionRef.where("enc_channelID", "in", batch).get();
        //     batchedQueries.push(query);
        // }
        // Promise.all(batchedQueries)
        //     .then((results) => {
        //         // Merge and process the results from all the queries

        //         let mergedResults = [];
        //         results.forEach((querySnapshot) => {
        //             querySnapshot.forEach((doc) => {
        //                 mergedResults.push(doc.data());
        //             });
        //         });
        //         mergedResults = mergedResults?.filter((item) => {
        //             return (
        //                 item?.role
        //                     ?.toLowerCase()
        //                     ?.includes(search?.toLowerCase().trim()) ||
        //                 item?.companyName
        //                     .toLowerCase()
        //                     .includes(search?.toLowerCase().trim()) ||
        //                 item?.hrNumber
        //                     ?.toLowerCase()
        //                     ?.includes(search?.toLowerCase().trim())
        //             );
        //         });
        //         setAllChannel(mergedResults);
        //         // Handle mergedResults here
        //     })
        //     .catch((error) => {
        //         // Handle errors here
        //         console.error("error", error);
        //     });

    } else {
        setCurrentPage(1);
    }
};