# Express + TypeScript + Zod

A small example of validating Express route parameters and JSON request bodies with Zod. The routes echo validated examples; there is no database, account system, or persistent user storage.

## Run

Use Node.js 20 or newer. Install the versions from the existing Yarn lockfile:

```sh
npx --yes yarn@1.22.22 install --frozen-lockfile
npm run dev
```

The server listens on port 3000 by default. Set `PORT` to use another port. For the compiled application:

```sh
npm run build
npm start
```

## Try validation

```sh
curl http://localhost:3000/users/f4152967-0752-471e-9aa1-7f41e3ce6b5e
curl http://localhost:3000/users/invalid-id
```

The first request returns a JSON example. The second returns HTTP 400 with validation details. [More HTTP examples](src/tests/users.test.http) include valid and incomplete POST bodies.

## Checks

```sh
npm run typecheck
npm test
```

Tests build and start the compiled app on an ephemeral local port, then assert accepted and rejected requests. CI runs the same checks. The `.http` file is also available for manual exploration.

## Structure and limits

- `src/types/users.ts`: request schemas and inferred types.
- `src/middleware/`: validation and error responses.
- `src/routers/`: example routes.
- `src/index.ts`: exported app and standalone server entry point.

This is a validation example, not a production API template. Authentication, persistence, rate limiting, and a complete API error policy are outside its scope.

The package declares the MIT license; the repository includes its license text.
