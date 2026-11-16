import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useViewportVideo } from '../lib/useViewportVideo';
import { useLanguage } from '../i18n';

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
  const [wantsPlayback, setWantsPlayback] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useViewportVideo(src, wantsPlayback);
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useLanguage();

  const togglePlay = () => {
    if (!videoRef.current) return;
    setWantsPlayback(!isPlaying);
    if (isPlaying) videoRef.current.pause();
    else {
      if (!videoRef.current.getAttribute('src')) videoRef.current.src = src;
      void videoRef.current.play().catch(() => {});
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
        poster={poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
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
          title={isPlaying ? t.common.pause : t.common.play}
          aria-label={isPlaying ? t.common.pause : t.common.play}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
          title={isMuted ? t.common.unmute : t.common.mute}
          aria-label={isMuted ? t.common.unmute : t.common.mute}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
          title={t.common.fullscreen}
          aria-label={t.common.fullscreen}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
