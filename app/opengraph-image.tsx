import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Competitor Review Spy — See How Your Google Reviews Compare';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(245,242,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,235,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Red glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%',
          width: 800, height: 400,
          background: 'rgba(255,50,50,0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,50,50,0.15)',
            border: '1px solid rgba(255,50,50,0.4)',
            borderRadius: 100, padding: '8px 20px', marginBottom: 32,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF3232' }} />
            <span style={{ color: '#FF3232', fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              Live Google Data
            </span>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#F5F2EB', lineHeight: 1.1, marginBottom: 24 }}>
            Are your competitors<br />
            <span style={{ color: '#FF3232' }}>beating you</span> on<br />
            Google reviews?
          </div>
          <div style={{ fontSize: 22, color: 'rgba(245,242,235,0.6)', marginBottom: 40 }}>
            Side-by-side comparison: ratings, response rate, review volume.
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: '#FF3232', borderRadius: 12, padding: '16px 32px',
            width: 'fit-content',
          }}>
            <span style={{ color: 'white', fontSize: 24, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
              Spy on my competitors — $9
            </span>
          </div>
          <div style={{ marginTop: 24, color: 'rgba(245,242,235,0.4)', fontSize: 18 }}>
            competitor-review-spy.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
