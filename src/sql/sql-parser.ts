import { QueryFile, TQueryFileOptions } from "pg-promise";

const path = require("path");

const queries: QueryFileRecord[] = [];

///////////////////////////////////////////////
// Helper for linking to external query files;
export default function sql(file: string): QueryFile {
  const existing = queries.find(q => q.file == file);
  if (existing) {
    return existing.query;
  }

  const fullPath: string = path.join(__dirname, file);
  const options: TQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    params: {
      schema: "public" // replace ${schema~} with "public"
    }
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  queries.push({ file: file, query: qf });

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

export class QueryFileRecord {
  file: string;
  query: QueryFile;
}
