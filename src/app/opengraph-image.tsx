import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vergeo Group — Kaluba Prosper Musonda';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          borderLeft: '24px solid #2563eb', // Blue accent bar on the left
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: '#111827',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            Vergeo Group
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#4b5563',
            }}
          >
            Full Stack Developer & Automation Builder
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-end',
            fontSize: 28,
            fontWeight: 600,
            color: '#2563eb',
          }}
        >
          vergeo.company
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
