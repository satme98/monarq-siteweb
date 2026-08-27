import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface DroneVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const DroneVideoPlayer: React.FC<DroneVideoPlayerProps> = ({
  src,
  poster,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-monarq-black group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Subtle soft gradient at bottom for controls contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Minimal Discreet Video Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-luxury">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
          title={isPlaying ? 'Pause' : 'Lecture'}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
          title={isMuted ? 'Activer le son' : 'Couper le son'}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
          title="Plein écran"
          aria-label="Plein écran"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
