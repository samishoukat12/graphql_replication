export const postSchema = {
    version: 0,
    title: "Post Schema",
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        primary: true,
        maxLength: 100,
      },
      title: {
        type: "string",
        unique: true, // Enforce uniqueness within the collection
      },
      content: {
        type: "string",
      },
    },
    required: ["id", "name","content"],
  };
  