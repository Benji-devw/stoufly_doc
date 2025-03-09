import { useState } from 'react';
import Wave from './Wave';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface AudioPlayerProps {
  track: {
    title: string;
    url: string;
    bpm: number;
    likes: number;
    category: string;
    tags: string;
    reporter: string;
    datePost: string;
    description?: string;
  };
}

const AudioPlayer = ({ track }: AudioPlayerProps) => {
  const router = useRouter();
  const [tags, setTags] = useState(track.tags?.replace(/\s/g, '').split(',') || []);
  
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="card flex flex-col border hover:shadow-xl transition-all duration-300 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-50 rounded-lg shadow-md overflow-hidden hover:border-orange-500 dark:hover:border-orange-500">
      {/* En-tête de la carte */}
      <div className="card__header p-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold truncate">{track.title}</h2>
          <div className="flex items-center gap-3">
            <div className="card__likes flex items-center gap-1 text-center hover:text-orange-600 cursor-pointer transition-colors">
              <span className="text-sm font-medium">{track.likes}</span>
              <svg className="w-5 h-5 hover:stroke-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            
            <a 
              className="download-button p-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
              href={track.url} 
              download={`${track.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.mp3`}
              onClick={(e) => {
                e.preventDefault();
                // Créer un élément a temporaire pour forcer le téléchargement
                const link = document.createElement('a');
                link.href = track.url;
                link.download = `${track.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.mp3`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              title="Télécharger le sample"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
          <span className="mr-2">Catégorie:</span>
          <button
            className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
            onClick={() => {
              router.push({ 
                pathname: '/', 
                query: { ...router.query, category: track.category } 
              }, undefined, {scroll: false});
            }}
          >
            {track.category}
          </button>
        </div>
      </div>

      {/* Visualisation de l'onde sonore */}
      <div className="card__wave p-3">
        <Wave url={track.url} bpm={track.bpm} />
      </div>

      {/* Pied de la carte avec tags */}
      <div className="card__footer mt-auto p-3 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag: string, id: number) => (
            <button 
              key={id}
              onClick={() => {
                router.push({ 
                  pathname: '/', 
                  query: { ...router.query, tag: tag } 
                }, undefined, {scroll: false});
              }}
              className="px-2 py-0.5 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-500">
          <span>Par: <span className="font-medium text-zinc-700 dark:text-zinc-300">{track.reporter}</span></span>
          <span>Publié le: {formatDate(track.datePost)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;