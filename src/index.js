const { GraphQLServer } = require('graphql-yoga')

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
];
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.filter(link => link.id === args.id)[0]
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link;
        },
        updateLink: (parent, args) => {
            let updatedLink;
            links = links.map(link => {
                if (link.id === args.id) {
                    updatedLink = {
                        id: args.id,
                        url: args.url,
                        description: args.description
                    };
                    return updatedLink;
                }
                return link;
            });
            return updatedLink;
        },
        deleteLink: (parent, args) => {
            let deletedLink;
            links = links.map(link => {
                if (link.id === args.id) {
                    deletedLink = link;
                    return;
                }
                return link;
            });
            return deletedLink;
        }
    },
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
