import React from 'react';

interface FooterProps {
  count?: number;
  name?: string;
}
export default function LoadedFooter(props: FooterProps) {
  const { name, count } = props;
  const name1 = name ?? '';
  const count1 = count ?? '';
  return (
    <div className="text-center py-4 text-muted-foreground text-sm">
      -- {count1} {name1} loaded --
    </div>
  );
}
