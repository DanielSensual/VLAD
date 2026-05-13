/**
 * Route-level loading state.
 *
 * Renders a branded Red Stripe progress bar that fills to ~92%
 * in the first beat, hangs there to communicate "almost ready,"
 * then sprints to 100% when the route resolves and this component
 * unmounts. No JS — pure CSS keyframes so it stays under a few KB.
 */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        gap: 'var(--space-lg)',
      }}
    >
      <span
        className="label"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
        }}
      >
        J.Vladimir
      </span>

      <div
        style={{
          position: 'relative',
          width: 'min(340px, 60vw)',
          height: '2px',
          background: 'var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'left center',
            background:
              'linear-gradient(90deg, var(--stripe-deep) 0%, var(--stripe) 50%, var(--stripe-wet) 100%)',
            filter: 'url(#wet-paint)',
            animation: 'stripe-load 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
          }}
        />
      </div>

      <span
        className="label"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.55rem',
          letterSpacing: '0.35em',
        }}
      >
        Loading the work
      </span>

      <style>{`
        @keyframes stripe-load {
          0%   { transform: scaleX(0); opacity: 0.4; }
          40%  { transform: scaleX(0.92); opacity: 1; }
          70%  { transform: scaleX(0.92); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
