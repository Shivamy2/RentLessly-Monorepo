/**
 * FullPageLoader Component
 * Cool Gen-Z style full page loading overlay with heartbeat logo animation
 */

'use client';

import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import Image from 'next/image';

// Heartbeat pulse animation - scale up and down like a heart beating
const heartbeat = keyframes`
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(232, 100, 27, 0));
  }
  14% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 20px rgba(232, 100, 27, 0.6));
  }
  28% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(232, 100, 27, 0.3));
  }
  42% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px rgba(232, 100, 27, 0.5));
  }
  70% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(232, 100, 27, 0));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(232, 100, 27, 0));
  }
`;

// Glow pulse behind logo
const glowPulse = keyframes`
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.2);
  }
`;

// Subtle breathing for text
const breathe = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

export function FullPageLoader({ text = 'Finding your perfect home...' }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Glow effect behind logo */}
      <Box
        sx={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 100, 27, 0.4) 0%, transparent 70%)',
          animation: `${glowPulse} 1.5s ease-in-out infinite`,
        }}
      />

      {/* Logo with heartbeat animation */}
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          animation: `${heartbeat} 1.5s ease-in-out infinite`,
        }}
      >
        <Image
          src="/logo-icon.png"
          alt="Rent Lessly"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      {/* Loading text */}
      <Box
        component="span"
        sx={{
          mt: 3,
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.5px',
          animation: `${breathe} 2s ease-in-out infinite`,
        }}
      >
        {text}
      </Box>

      {/* Animated dots */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.8,
          mt: 2,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              animation: `${breathe} 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default FullPageLoader;
