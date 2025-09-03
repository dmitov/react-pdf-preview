
<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">Dev server for React renderer for creating PDF files on the browser and server<p>
</p>

<img src="screenshot.png" width="100%">

## How to install

```sh
pnpm install -D @uixdimi/react-pdf-preview
npm install -D @uixdimi/react-pdf-preview
yarn add -D @uixdimi/react-pdf-preview
```

## How it works
```package.json
"scripts": {
  "dev": "react-pdf --dir=src/templates --port=3000"
}
```

## Caveats
1. In order for the previewer to work, all templates must pass down the `DocumentProps` down to the document. Eg:
```
export default function Quixote({ creator, ...props }: QuixoteProps) {
  return (
    <Document {...props} title="Don Quijote de la Mancha">
    ...
```

2. Sometimes you might want to include components in your templates. Options are:
 - Create `components` folder anywhere you need it, this way it will be ignored by the previewer.
 - Prefix component filenames with underscore.

See the example template here: [./templates/quixote.tsx](./templates/quixote.tsx)

## Kudos

- [@diegomura](https://github.com/diegomura) for the amazing [@react-pdf/renderer](https://github.com/diegomura/react-pdf)
- [@resend](https://github.com/resend) for the inspiration from [react-email](https://github.com/resend/react-email)

## Stack
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)

## License

MIT © [Dimitar Mitov](http://github.com/dmitov)
