import React, { useEffect } from "react";
import { useRxCollection } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";

export default function TestPage() {
  const collection: any = useRxCollection("user");

  const addData = async () => {
    try {
      const insertedDocument = await collection.insert({
        id: uuidv4(),
        title: "test",
        content: "test",
      });
      console.log("dd", insertedDocument);
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      addData();
    }, 5000);
  }, []);

  return <p>Text</p>;
}
