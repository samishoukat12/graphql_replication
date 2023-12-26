import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { postSchema } from "./schema";
import { createRxDatabase } from "rxdb";
import { replicateGraphQL } from "rxdb/plugins/replication-graphql";
const pullQueryBuilder = (checkpoint: any, limit: any) => {
  /**
   * The first pull does not have a checkpoint
   * so we fill it up with defaults
   */
  const query = `query GetPosts {
    getPosts {
      title
      content
    }
  }`;
  return {
    query,
    variables: {
      checkpoint,
      limit,
    },
  };
};
const pushQueryBuilder = (rows: any) => {
  const query = `
  mutation Mutation($title: String, $content: String) {
    createPost(title: $title, content: $content) {
      content
      title
    }
  }
  `;
  const variables = {
    writeRows: rows,
  };
  return {
    query,
    variables,
  };
};
export const initialize = async () => {
  const db = await createRxDatabase({
    name: "hhdsfffdj",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });
  const collections = await db.addCollections({
    user: {
      schema: postSchema,
    },
  });
  const replicationState = replicateGraphQL({
    collection: collections.user,
    url: {
      http: "http://localhost:8080/graphql",
    },
    pull: {
      queryBuilder: pullQueryBuilder, 
      modifier: (doc) => doc, 
      dataPath: undefined,
      batchSize:1,
    },
    headers: {
      Authorization: "Bearer abcde...",
    },
    push: {
      queryBuilder: pushQueryBuilder,
      batchSize: 1,
    },
    deletedField: "deleted",
    live: true,
    retryTime: 1000 * 5,
    waitForLeadership: true,
    autoStart: true,
  });

  return db;
};
