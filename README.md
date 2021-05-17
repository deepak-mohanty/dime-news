

// Application Refactor And Improvements

1. Improve on points/feedback from Lighthouse

2. Cancel Token for Axios when we are on different component,
    so that API's doesnt make frequest network calls when not used.

3. Use React Lazy(): Used to load components with Code Splitting, to split into smaller chunks
    where most important one can be loaded first, then every other second components.

4. Redux + Middlewares: Create single source of truth to handle and store data in App itself.

5. Data Layer and Less Network Load: Techniques to Capture

6. Analyze the bundle size
    1.1: npm install --save source-map-explorer
    1.2: Add it inside scripts: package.json file:  "analyze": "source-map-explorer 'build/static/js/*.js'",
    1.3: npm run analyze