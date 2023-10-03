import React from 'react'
import firebaseConfig from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { limits } from "../../constant";
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const loginUserId = localStorage.getItem("EmployeeID");
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
                // setTempArrFalse(mergedResults);
            });
    }
};

export const getPinChannel = (setpinData) => {
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