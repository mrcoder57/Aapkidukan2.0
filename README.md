# Aapkidukaan An e-commerce for all 
Apkidukan is a full-stack PERN (PostgreSQL, Express, React, Node) application with TypeScript that enables users to create products, write reviews, buy and sell products, and more.
Currently, two official plugins are available:

##Features
User authentication and authorization using JWT and bcrypt

Product creation, editing, and deletion with image upload using Cloudinary

Product rating and review system with star ratings and comments

Responsive and modern UI design using Material-UI and styled-component
## Demo
You can view a live demo of the app here:https://aapkidukan2-0.vercel.app/
## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
