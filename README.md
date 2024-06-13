# This Boilerplate is extended by the Next.js Enterprise Boilerplate ("https://github.com/Blazity/next-enterprise"). I've added langchain server into this template.

## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

1. Fork & clone repository:

```bash
## Don't forget to ⭐ star and fork it first :)
git clone https://github.com/<your_username)/next-fastapi-langchain.git
```

2. Install the dependencies:

```bash
yarn install --frozen-lockfile
```

3. Install the LangChain CLI:

```bash
yarn dev
```
4. Create a new LangChain project, e.g., neo4j-advanced-rag:

```bash
langchain app new {llmenv} --package neo4j-advanced-rag
```

or add a package to an existing project, you can just run:

```bash
langchain app add neo4j-advanced-rag
```

And add the following code to your server.py file under the {llmenv} folder:

```bash
from neo4j_advanced_rag import chain as neo4j_advanced_chain

add_routes(app, neo4j_advanced_chain, path="/neo4j-advanced-rag")
```

And set environment variables

```bash
export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
export NEO4J_URI=<YOUR_NEO4J_URI>
export NEO4J_USERNAME=<YOUR_NEO4J_USERNAME>
export NEO4J_PASSWORD=<YOUR_NEO4J_PASSWORD>
```

5. Run the development server:

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see the web frontend.

Open [http://localhost:8000](http://localhost:8000) to see the langchain server.

We can see all templates at http://127.0.0.1:8000/docs We can access the playground at http://127.0.0.1:8000/neo4j-advanced-rag/playground

7. This project uses a git hook to enforce [conventional commits](https://github.com/qoomon/git-conventional-commits). To install the git hook, run the following command in the root directory of the project:

```sh
brew install pre-commit
pre-commit install -t commit-msg
```

You can check detailed information in ("https://github.com/Blazity/next-enterprise")
