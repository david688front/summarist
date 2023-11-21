import { db } from "@/firebase";
import { BookObject } from "@/BookObject";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
function useList(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | BookObject[]>([]);
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snanpshot) => {
        setList(
          snanpshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);
  return list;
}
export default useList;
