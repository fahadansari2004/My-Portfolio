import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fahad Bin Ansari Portfolio',
    short_name: 'Fahad',
    description: 'Portfolio of Fahad Bin Ansari, Full-Stack Developer and AI Developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/mypic.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
