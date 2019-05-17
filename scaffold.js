const fs = require("fs");
const _ = require("lodash");

const names = {
  camel: "",
  kebab: "",
  proper: "",
  snake: ""
};

createScaffold(process.argv[2]);

async function createScaffold(name) {
  if ((name || "").trim().length === 0) {
    console.error("Must supply an object name");
    return;
  }

  parseNames(name);

  createSchema();
  createRepository();
  createService();
  createSql();
}

function parseNames(name) {
  names.kebab = name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
  names.snake = names.kebab.replace(/-/g, "_");
  names.camel = _.camelCase(name);
  names.proper = name.charAt(0).toUpperCase() + names.camel.slice(1);
}

function exists(path) {
  var doesExist = fs.existsSync(path);

  if (doesExist) {
    console.log(path + " already exists.");
  }

  return doesExist;
}

function createSchema() {
  var path = __dirname + "/src/schemas/" + names.kebab + ".ts";
  if (exists(path)) {
    return;
  }

  var schemaTypesPath = path.replace(names.kebab, "schema-types");
  var schemaTypes = fs.readFileSync(schemaTypesPath, "utf-8");

  if (!schemaTypes.includes(`${names.proper} = "${names.snake}"`)) {
    schemaTypes = schemaTypes.replace(
      "{",
      `{  
        ${names.proper} = "${names.proper}",
    ${names.proper}Input = "${names.proper}Input",`
    );

    fs.writeFileSync(schemaTypesPath, schemaTypes);

    var indexPath = path.replace(names.kebab, "index");
    var schemaExports = fs.readFileSync(indexPath, "utf-8");
    schemaExports += `\nexport * from "./${names.kebab}";`;

    fs.writeFileSync(indexPath, schemaExports);
  }

  fs.writeFileSync(
    path,
    `import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";          
import { SchemaTypes } from "./schema-types";
import Base from "./base";

export default class ${names.proper} extends Base {
  // define properties here.
}

export const ${names.camel} = objectType({
  name: SchemaTypes.${names.proper},
  definition(t) {
    t.implements(SchemaTypes.Base);
    // define properties here.
  }
});

export const ${names.camel}InputType = inputObjectType({
  name: SchemaTypes.${names.proper}Input,
  definition(t) {
    t.id("id", { nullable: true });
  }
});

export const create${names.proper} = mutationField("create${names.proper}", {
  type: SchemaTypes.${names.proper},
  args: {
    payload: arg({ type: SchemaTypes.${names.proper}Input, required: true })
  },
  resolve: async (parent, { payload }, { services }) => {
    return await services.${names.proper}.save(payload);
  }
});

export const get${names.proper} = queryField("${names.camel}", {
  type: SchemaTypes.${names.proper},
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) => {
    return await services.${names.proper}.get(id);
  }
});

export const update${names.proper} = mutationField("update${names.proper}", {
  type: SchemaTypes.${names.proper},
  args: {
    payload: arg({ type: SchemaTypes.${names.proper}Input, required: true })
  },
  resolve: async (parent, { payload }, { services }) => {
    return await services.${names.proper}.update(payload);
  }
});

export const delete${names.proper} = mutationField("delete${names.proper}", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) => {
    return await services.${names.proper}.delete(id);
  }
});
`
  );
}

function createRepository() {
  var path = __dirname + "/src/repositories/" + names.kebab + ".repository.ts";
  if (exists(path)) {
    return;
  }

  var reposPath = path.replace(names.kebab + ".repository", "index");
  var repos = fs.readFileSync(reposPath, "utf-8");
  var repoLines = repos.split("\n");

  var indexOfExport = _.findIndex(repoLines, l =>
    l.includes("export interface Repositories {")
  );
  repoLines.splice(
    indexOfExport + 1,
    0,
    ` ${names.proper}s: ${names.proper}sRepository;`
  );
  repoLines.splice(
    0,
    0,
    `import ${names.proper}sRepository from "./${names.kebab}.repository";`
  );

  var dbPath = __dirname + "/src/db.ts";
  if (!exists(dbPath)) {
    console.error("cannot find path: " + dbPath);
  } else {
    var dbClass = fs.readFileSync(dbPath, "utf-8");
    var dbLines = dbClass.split("\n");

    dbLines.splice(
      0,
      0,
      `import ${names.proper}sRepository from "./repositories/${
        names.kebab
      }.repository";`
    );

    var indexOfRepos = _.findIndex(dbLines, l =>
      l.includes("// define repositories here.")
    );
    dbLines.splice(
      indexOfRepos + 1,
      0,
      `         obj.${names.proper}s = new ${names.proper}sRepository();`
    );

    var indexOfCreateTables = _.findIndex(dbLines, l =>
      l.includes("createTables() {")
    );
    dbLines.splice(
      indexOfCreateTables + 5,
      0,
      `   // this.connection.${names.proper}s.createTable();`
    );

    fs.writeFileSync(dbPath, dbLines.join("\n"));
  }

  repos = repoLines.join("\n");
  fs.writeFileSync(reposPath, repos);

  fs.writeFileSync(
    path,
    `import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import ${names.proper} from "../schemas/${names.kebab}";

export default class ${names.proper}sRepository extends BaseRepository<${
      names.proper
    }> {
  constructor() {
    super(SchemaTypes.${names.proper});
  }
  
  createTable(): Promise<null> {
    throw new Error("Method not implemented.");
  }
  
  upsert(payload: ${names.proper}): Promise<${names.proper}> {
    throw new Error("Method not implemented.");
  }
  
  insert(payload: ${names.proper}): Promise<${names.proper}> {
    throw new Error("Method not implemented.");
  }
  
  update(payload: ${names.proper}): Promise<${names.proper}> {
    throw new Error("Method not implemented.");
  }
}
    
    `
  );
}

function createService() {
  var path = __dirname + "/src/services/" + names.kebab + ".service.ts";
  if (exists(path)) {
    return;
  }

  var servicesPath = path.replace(names.kebab + ".service", "index");
  var services = fs.readFileSync(servicesPath, "utf-8");
  var servicesLines = services.split("\n");

  var indexOfInterface = _.findIndex(servicesLines, l =>
    l.includes("export interface Services {")
  );
  servicesLines.splice(
    indexOfInterface + 1,
    0,
    `    ${names.proper}: ${names.proper}Service;`
  );

  var indexOfExport = _.findIndex(servicesLines, l =>
    l.includes("export function getServices(): Services {")
  );
  servicesLines.splice(
    indexOfExport + 2,
    0,
    `    ${names.proper}: new ${names.proper}Service(),`
  );

  servicesLines.splice(
    0,
    0,
    `import ${names.proper}Service from "./${names.kebab}.service";`
  );

  services = servicesLines.join("\n");
  fs.writeFileSync(servicesPath, services);

  fs.writeFileSync(
    path,
    `import { BaseService } from "./base.service";
import ${names.proper} from "./../schemas/${names.kebab}";
import ${names.proper}sRepository from "./../repositories/${
      names.kebab
    }.repository";

export default class ${names.proper}Service extends BaseService<${
      names.proper
    }, ${names.proper}sRepository> {
  constructor() {
    super();
    this.repo = new ${names.proper}sRepository();
  }

  async get(id: string): Promise<${names.proper}> {
    return await this.repo.get(id);
  }

  async remove(id: string): Promise<number> {
    return await this.repo.remove(id);
  }

  async query(parentId: string): Promise<Array<${names.proper}>> {
    return await this.repo.all(parentId);
  }

  async save(payload: ${names.proper}): Promise<${names.proper}> {
    return await this.repo.upsert(payload);
  }

  async update(payload: ${names.proper}): Promise<${names.proper}> {
    return await this.repo.upsert(payload);
  }
}
`
  );
}

function createSql() {
  var path = __dirname + "/src/sql/" + names.kebab;
  if (!exists(path)) {
    fs.mkdirSync(path);
  }

  path += `/create-${names.kebab}-table.sql`;
  if (exists(path)) {
    return;
  }

  fs.writeFileSync(
    path,
    `CREATE TABLE IF NOT EXISTS ${names.snake} (
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  deleted boolean DEFAULT false
)`
  );

  console.log(`
Create table method added to db.ts but commented out.
Please make your desired alterations to /src/sql/${names.kebab}/create-${
    names.kebab
  }-table.sql
before uncommenting.`);
}
