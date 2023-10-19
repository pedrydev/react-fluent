import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  TagGroupProps,
} from '@fluentui/react-components';
import { Link, useLocation } from 'react-router-dom';
import { useRecentPages, useRecentPagesFunctions } from '@/layout/recent-pages/RecentPagesContext.tsx';

export default function RecentPagesGroup() {
  const recentPages = useRecentPages();
  const location = useLocation();
  const { remove } = useRecentPagesFunctions();

  const handleDismiss: TagGroupProps['onDismiss'] = (_, data) => {
    const pageToRemove = recentPages.find(x => x.href === data.value);
    if (pageToRemove)
      remove(pageToRemove);
  };

  if (recentPages.length === 0)
    return null;

  return (
    <TagGroup onDismiss={handleDismiss}>
      {recentPages.map(x => (
        <InteractionTag key={x.href} appearance={location.pathname.startsWith(x.href) ? 'brand' : 'outline'}
                        value={x.href}>
          <Link to={x.href} style={{ height: 'inherit' }}>
            <InteractionTagPrimary hasSecondaryAction icon={x.icon}>
              {x.label}
            </InteractionTagPrimary>
          </Link>
          <InteractionTagSecondary />
        </InteractionTag>
      ))}
    </TagGroup>
  );
}
