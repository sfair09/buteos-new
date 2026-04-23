'use client';

interface AdSidebarProps {
  adCount?: number;
  className?: string;
}

export default function AdSidebar({ adCount = 3, className = '' }: AdSidebarProps) {
  return (
    <aside className={`ad-sidebar ${className}`}>
      {Array.from({ length: adCount }, (_, index) => (
        <div key={index} className="ad-container">
          <div className="ad-label">Advertisement</div>
          {/* Placeholder container for Auto ads. When Auto ads are enabled in AdSense,
              Google's script may inject ad elements automatically. Keep this container
              available so placements exist, but don't push or insert ad units manually. */}
          <div className="adsense-container autoad-placeholder" />
        </div>
      ))}
    </aside>
  );
}
// Note: for Auto ads, the head script is sufficient and AdSense handles placement.
// Manual ad-slot markup and pushes were removed to avoid conflicts with Auto ads.