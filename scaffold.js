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

  createModel();
  createSchema();
  createRepository();
  createService();
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

function createModel() {
  var path = __dirname + "/src/models/" + names.kebab + ".ts";
  if (exists(path)) {
    return;
  }

  var modelsPath = path.replace(names.kebab, "index");
  var models = fs.readFileSync(modelsPath, "utf-8");
  var modelLines = models.split("\n");

  var indexOfImports = _.findIndex(modelLines, l =>
    l.includes(`import sequelize = require("sequelize");`)
  );
  modelLines.splice(
    indexOfImports + 2,
    0,
    `import { init${names.proper}s, ${names.proper}Instance, ${
      names.proper
    }Attributes } from "./${names.kebab}";`
  );

  var indexOfModels = _.findIndex(modelLines, l =>
    l.includes("export interface Models {")
  );
  modelLines.splice(
    indexOfModels + 1,
    0,
    `   ${names.proper}s: sequelize.Model<${names.proper}Instance, ${
      names.proper
    }Attributes, ${names.proper}Attributes>;`
  );

  var indexOfGetModels = _.findIndex(modelLines, l =>
    l.includes("export function getModels(sequelize: Sequelize): Models {")
  );
  modelLines.splice(
    indexOfGetModels + 2,
    0,
    `    ${names.proper}s: init${names.proper}s(sequelize),`
  );

  models = modelLines.join("\n");
  fs.writeFileSync(modelsPath, models);

  fs.writeFileSync(
    path,
    `import Sequelize = require("sequelize");

export type ${names.proper}Instance = Sequelize.Instance<${
      names.proper
    }Attributes> & ${names.proper}Attributes;
export type ${names.proper}Model = Sequelize.Model<${names.proper}Instance, ${
      names.proper
    }Attributes>;

export interface ${names.proper}Attributes {
  id: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function init${names.proper}s(sequelize: Sequelize.Sequelize): ${
      names.proper
    }Model {
  return sequelize.define<${names.proper}Instance, ${
      names.proper
    }Attributes>("${names.camel}", {
    id: {
      field: "id",
      type: Sequelize.UUID,
      primaryKey: true
    },
    deleted: {
      field: "deleted",
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      field: "created_at",
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true,
    tableName: '${names.snake}'
  });
}`
  );
}

function createSchema() {
  var path = __dirname + "/src/schemas/" + names.kebab + ".ts";
  if (exists(path)) {
    return;
  }

  var schemaTypesPath = path.replace(names.kebab, "schema-types");
  var schemaTypes = fs.readFileSync(schemaTypesPath, "utf-8");

  if (!schemaTypes.includes(`${names.proper} = "${names.proper}`)) {
    schemaTypes = schemaTypes.replace(
      "}",
      `  ${names.proper} = "${names.proper}",
    ${names.proper}Input = "${names.proper}Input",
}`
    );

    var schemaTypeLines = schemaTypes.split("\n");

    schemaTypes =
      schemaTypeLines[0] +
      _.sortBy(schemaTypeLines.slice(1), [
        function(l) {
          return l.replace(/\s/g, "");
        }
      ]).join("\n");

    fs.writeFileSync(schemaTypesPath, schemaTypes);

    var indexPath = path.replace(names.kebab, "index");
    var schemaExports = fs.readFileSync(indexPath, "utf-8");
    var schemaExportsLines = schemaExports.split("\n");
    var indexOfObjects = _.findIndex(schemaExportsLines, l =>
      l.includes("//objects")
    );
    schemaExportsLines.splice(
      indexOfObjects + 1,
      0,
      `export * from "./${names.kebab}";`
    );

    fs.writeFileSync(indexPath, schemaExportsLines.join("\n"));
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
          
          import { v4 as uuid } from "uuid";
          import { SchemaTypes } from ".";
          
          export const ${names.camel} = objectType({
            name: "${names.proper}",
            definition(t) {
              t.implements(SchemaTypes.Base);
            }
          });
          
          export const ${names.camel}InputType = inputObjectType({
            name: SchemaTypes.${names.proper}Input,
            definition(t) {
              t.id("id", { nullable: true });
            }
          });
          
          export const create${names.proper} = mutationField("create${
      names.proper
    }", {
            type: SchemaTypes.${names.proper},
            args: {
              payload: arg({ type: SchemaTypes.${
                names.proper
              }Input, required: true })
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
          
          export const update${names.proper} = mutationField("update${
      names.proper
    }", {
            type: SchemaTypes.${names.proper},
            args: {
              payload: arg({ type: SchemaTypes.${
                names.proper
              }Input, required: true })
            },
            resolve: async (parent, { payload }, { services }) => {
              return await services.${names.proper}.update(payload);
            }
          });
          
          export const delete${names.proper} = mutationField("delete${
      names.proper
    }", {
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
    `    ${names.proper}Repo: ${names.proper}Repository;`
  );
  repoLines.splice(
    indexOfExport - 2,
    0,
    `import ${names.proper}Repository from "./${names.kebab}.repository";`
  );

  repos = repoLines.join("\n");
  fs.writeFileSync(reposPath, repos);

  fs.writeFileSync(
    path,
    `import { BaseRepository } from "./base.repository";
    import { ${names.proper}Instance } from "./../datamodels/${names.kebab}";
    
    export default class ${names.proper}Repository extends BaseRepository<${
      names.proper
    }Instance> {
      constructor() {
        super();
      }
    
      async get(id: string): Promise<${names.proper}Instance> {
        return await this.models.${names.proper}s.findOne({
          where: {
            id: id,
            deleted: false
          }
        });
      }
    
      async delete(id: string): Promise<number> {
        const [count, instances] = await this.models.${names.proper}s.update(
          {
            deleted: true
          },
          {
            where: {
              id: id
            }
          }
        );
    
        return count;
      }
    
      async upsert(payload: ${names.proper}Instance): Promise<${
      names.proper
    }Instance> {
        const original = await this.get(payload.id);
        const [record, created] = await this.models.${names.proper}s.upsert(
          {
            id: payload.id,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt
          },
          {
            returning: true
          }
        );
    
        return record;
      }
    
      async query(parentId: string): Promise<Array<${names.proper}Instance>> {
        return await this.models.${names.proper}s.findAll();
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
  import { ${names.proper}Instance } from "./../datamodels/${names.kebab}";
  import ${names.proper}Repository from "./../repositories/${
      names.kebab
    }.repository";
  import uuid = require("uuid");
  
  export default class ${names.proper}Service extends BaseService<${
      names.proper
    }Instance, ${names.proper}Repository> {
    constructor() {
      super();
      this.repo = new ${names.proper}Repository();
    }
  
    async get(id: string): Promise<${names.proper}Instance> {
      return await this.repo.get(id);
    }
  
    async delete(id: string): Promise<number> {
      return await this.repo.delete(id);
    }
  
    async query(parentId: string): Promise<Array<${names.proper}Instance>> {
      return await this.repo.query(parentId);
    }
  
    async save(payload: ${names.proper}Instance): Promise<${
      names.proper
    }Instance> {
      var ${names.camel} = Object.assign({}, payload, {
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return await this.repo.upsert(${names.camel});
    }
  
    async update(payload: ${names.proper}Instance): Promise<${
      names.proper
    }Instance> {
      payload.updatedAt = new Date().toISOString();
      return await this.repo.upsert(payload);
    }
  }
  `
  );
}
