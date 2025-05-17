export function OutputFormatSelector({
  value,
  onChange,
  disabled = false
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const formats = [
    { id: 'json', label: 'JSON' },
    { id: 'xml', label: 'XML' },
    { id: 'resw', label: 'RESW' },
    { id: 'pages', label: 'Pages' },
  ];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {formats.map((format) => (
        <button
          key={format.id}
          type="button"
          onClick={() => onChange(format.id)}
          className={`flex items-center justify-center rounded-md p-2 text-sm transition-colors ${
            value === format.id
              ? 'bg-primary text-primary-foreground font-medium'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={disabled}
        >
          {format.label}
        </button>
      ))}
    </div>
  );
}