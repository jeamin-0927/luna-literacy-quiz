import { atom } from "recoil";

export const userDataAtom = atom({
  key: "userDataAtom",
  default: {
    name: "",
    contact: "",
  },
});

export const selectDataAtom = atom({
  key: "nowNum",
  default: [],
});

export const resultDataAtom = atom({
  key: "resultDataAtom",
  default: {
    score: "",
    answer: Array(20), 
    rank: "", 
    length: "", 
    percent: ""
  },
});