export default function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#1E1A2E',
      }}
    >
      <div
        className="mesh-blob-1"
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          top: '10%',
          left: '-5%',
          borderRadius: '50%',
          background: 'rgba(37, 99, 235, 0.2)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div
        className="mesh-blob-2"
        style={{
          position: 'absolute',
          width: '45vw',
          height: '45vw',
          top: '-10%',
          right: '-10%',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.2)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div
        className="mesh-blob-3"
        style={{
          position: 'absolute',
          width: '55vw',
          height: '40vw',
          bottom: '-15%',
          left: '25%',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.12)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
