import React from 'react';

interface SkeletonProps {
  style?: React.CSSProperties;
}

// Hauteurs prédéfinies pour éviter les erreurs d'hydratation
const barHeights = [
  30, 45, 20, 60, 35, 25, 50, 40, 15, 55,
  25, 45, 30, 20, 50, 35, 60, 40, 25, 45
];

const Skeleton = ({ style }: SkeletonProps) => {
  return (
    <div 
      style={style} 
      className="skeleton flex flex-col border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/70 bg-zinc-100/70 rounded-lg shadow-md overflow-hidden h-[352px] w-full"
    >
      {/* En-tête de la carte - hauteur fixe pour correspondre à AudioPlayer */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 h-[88px]">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-3/4 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="h-4 w-6 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
              <div className="h-5 w-5 rounded-full dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
            </div>
            <div className="h-7 w-7 rounded-full dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="h-4 w-16 rounded-md dark:bg-zinc-800 bg-zinc-300 mr-2 animate-pulse"></div>
          <div className="h-5 w-20 rounded-full dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
        </div>
      </div>

      {/* Visualisation de l'onde sonore - hauteur fixe pour correspondre à Wave */}
      <div className="p-3 h-[164px]">
        {/* Wrapper de l'onde */}
        <div className="h-24 w-full rounded-md dark:bg-zinc-800 bg-zinc-300 flex items-center px-2">
          <div className="flex items-end justify-between w-full h-16">
            {barHeights.map((height, index) => (
              <div 
                key={index} 
                className="w-1.5 dark:bg-zinc-700 bg-zinc-400 rounded-sm mx-0.5 animate-pulse"
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${index * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Contrôles de l'onde */}
        <div className="flex items-center mt-2 h-8">
          <div className="h-8 w-8 rounded-md dark:bg-zinc-800 bg-zinc-300 mr-4 animate-pulse"></div>
          <div className="flex justify-between w-full">
            <div className="h-5 w-20 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
            <div className="h-5 w-20 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Pied de la carte avec tags - hauteur fixe */}
      <div className="mt-auto p-3 border-t border-zinc-200 dark:border-zinc-800 h-[100px]">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className="h-5 w-16 rounded-full dark:bg-zinc-800 bg-zinc-300 animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="h-3 w-24 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
          <div className="h-3 w-24 rounded-md dark:bg-zinc-800 bg-zinc-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;