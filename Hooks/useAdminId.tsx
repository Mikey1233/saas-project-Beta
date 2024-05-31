"use client";
import { chatMembersAdminRef } from "@/lib/converters/ChatMembers";

import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function useAdminId({ chatId }: { chatId: string }) {
  const [adminId, setAdminId] = useState<string>("");
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(chatMembersAdminRef(chatId))).docs.map(
        (doc) => doc.id
      )[0];
      setAdminId(adminId)
    };
    fetchAdminStatus();
  },[chatId]);
  return adminId;
}

export default useAdminId;
