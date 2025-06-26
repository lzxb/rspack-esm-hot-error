# Rspack project

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

## Known Issues

1. When enabling `runtimeChunk: "single"`, the page throws an error
2. When disabling `runtimeChunk: "single"`, hot module replacement (HMR) doesn't work for `HelloWorld.vue`
