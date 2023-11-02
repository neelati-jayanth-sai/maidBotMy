const { request, gql } = require('graphql-request');
const fs = require('fs');

const endpoint = 'https://skedxblcsmzsmzsajdpz.hasura.ap-southeast-1.nhost.run/v1/graphql';
const headers = {
  'x-hasura-admin-secret': "omb,Q'dnS:yzv)D=IXF)UOVT2;$,je5B",
};

const introspectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
`;

async function fetchSchema() {
  try {
    const response = await request(endpoint, introspectionQuery, {}, { headers });
    const schemaJson = JSON.stringify(response, null, 2);
    fs.writeFileSync('./srcschema.json', schemaJson);
    console.log('Schema fetched and saved to schema.json');
  } catch (error) {
    console.error('Error fetching schema:', error);
  }
}

fetchSchema();
