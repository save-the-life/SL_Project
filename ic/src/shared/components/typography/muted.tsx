import TypographyType from './typographyType';

export function TypographyMuted({ children, className }: TypographyType) {
  return (
    <p className={`text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </p>
  );
}
