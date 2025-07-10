export const MAX_FILE_SIZE = 100000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const LIST_TAKE_COUNT = 5;


// // package.json
// ```json
// {
//   "name": "y2mate-clone",
//   "version": "1.0.0",
//   "private": true,
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "dependencies": {
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-scripts": "5.0.1",
//     "typescript": "^4.9.5"
//   },
//   "devDependencies": {
//     "autoprefixer": "^10.4.12",
//     "postcss": "^8.4.16",
//     "tailwindcss": "^3.1.8"
//   }
// }
// ```

// // tsconfig.json
// ```json
// {
//   "compilerOptions": {
//     "target": "es5",
//     "lib": ["dom", "dom.iterable", "esnext"],
//     "allowJs": true,
//     "skipLibCheck": true,
//     "esModuleInterop": true,
//     "allowSyntheticDefaultImports": true,
//     "strict": true,
//     "forceConsistentCasingInFileNames": true,
//     "noFallthroughCasesInSwitch": true,
//     "module": "esnext",
//     "moduleResolution": "node",
//     "resolveJsonModule": true,
//     "isolatedModules": true,
//     "jsx": "react-jsx"
//   },
//   "include": ["src"]
// }
// ```

// // tailwind.config.js
// ```js
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
//   theme: { extend: {} },
//   plugins: []
// };
// ```

// // postcss.config.js
// ```js
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {}
//   }
// };
// ```

// // public/index.html
// ```html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Y2Mate Clone</title>
// </head>
// <body>
//   <div id="root"></div>
// </body>
// </html>
// ```

// // src/index.css
// ```css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// ```

// // src/index.tsx
// ```tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// ```

// // src/types.ts
// ```ts
// export interface DownloadOption {
//   format: string;
//   size: string;
//   url: string;
// }
// ```

// // src/api/y2mateApi.ts
// ```ts
// import { DownloadOption } from '../types';

// export const fetchDownloadOptions = async (videoUrl: string): Promise<DownloadOption[]> => {
//   // TODO: Replace with actual backend endpoint
//   const response = await fetch(`/api/download?url=${encodeURIComponent(videoUrl)}`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   const data = await response.json();
//   return data.options as DownloadOption[];
// };
// ```

// // src/App.tsx
// ```tsx
// import React, { useState } from 'react';
// import Header from './components/Header';
// import DownloaderForm from './components/DownloaderForm';
// import DownloadOptions from './components/DownloadOptions';
// import Footer from './components/Footer';
// import { fetchDownloadOptions } from './api/y2mateApi';
// import { DownloadOption } from './types';

// const App: React.FC = () => {
//   const [options, setOptions] = useState<DownloadOption[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (videoUrl: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const opts = await fetchDownloadOptions(videoUrl);
//       setOptions(opts);
//     } catch (err) {
//       setError('Failed to fetch download options.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <DownloaderForm onSubmit={handleSubmit} />
//         {loading && <p className="mt-4 text-center">Loading...</p>}
//         {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//         {options.length > 0 && <DownloadOptions options={options} />}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;
// ```

// // src/components/Header.tsx
// ```tsx
// import React from 'react';

// const Header: React.FC = () => (
//   <header className="bg-blue-600 text-white py-4">
//     <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
//       <h1 className="text-2xl font-bold">Y2Mate Clone</h1>
//       <p className="mt-2 md:mt-0">YouTube Downloader</p>
//     </div>
//   </header>
// );

// export default Header;
// ```

// // src/components/DownloaderForm.tsx
// ```tsx
// import React, { useState, FormEvent } from 'react';

// interface Props {
//   onSubmit: (url: string) => void;
// }

// const DownloaderForm: React.FC<Props> = ({ onSubmit }) => {
//   const [videoUrl, setVideoUrl] = useState('');

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onSubmit(videoUrl);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
//       <input
//         type="text"
//         placeholder="Enter YouTube URL"
//         value={videoUrl}
//         onChange={(e) => setVideoUrl(e.target.value)}
//         className="w-full p-3 border border-gray-300 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-3 rounded-b-lg hover:bg-blue-700 transition"
//       >
//         Get Download Links
//       </button>
//     </form>
//   );
// };

// export default DownloaderForm;
// ```

// // src/components/DownloadOptions.tsx
// ```tsx
// import React from 'react';
// import { DownloadOption } from '../types';

// interface Props {
//   options: DownloadOption[];
// }

// const DownloadOptions: React.FC<Props> = ({ options }) => (
//   <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {options.map((opt) => (
//       <a
//         key={opt.format}
//         href={opt.url}
//         className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <p className="font-medium">{opt.format}</p>
//         <p className="text-sm text-gray-600">{opt.size}</p>
//         <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
//           Download
//         </button>
//       </a>
//     ))}
//   </div>
// );

// export default DownloadOptions;
// ```

// // src/components/Footer.tsx
// ```tsx
// import React from 'react';

// const Footer: React.FC = () => (
//   <footer className="bg-gray-100 py-4 mt-8">
//     <div className="container mx-auto px-4 text-center text-sm text-gray-600">
//       © 2025 Y2Mate Clone. All rights reserved.
//     </div>
//   </footer>
// );

// export default Footer;
