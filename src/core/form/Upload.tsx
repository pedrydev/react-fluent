import { Body1, Button, Caption1 } from "@fluentui/react-components";
import { ArrowUpload24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { ChangeEvent, useRef, useState } from "react";
import usePalette from "@/core/styles/usePalette.ts";

export interface UploadProps {
  disabled?: boolean;
  label: string;
  onChange: (values: File[]) => void;
  maxFiles?: number;
  validate?: (values: File[]) => string | null;
  values: File[];
}

export default function Upload({ disabled, label, onChange, maxFiles = 1, validate, values }: UploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const palette = usePalette();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files === null) {
      setError("");
      onChange([]);
      return;
    }

    var files = Array.from(ev.target.files);

    if (values.length + files.length > maxFiles) {
      setError(`Only ${maxFiles} files are allowed`);
      return;
    }

    if (validate) {
      const validationResult = validate(files);
      if (validationResult !== null) {
        setError(validationResult);
        return;
      }
    }

    setError("");
    onChange([...values, ...files]);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    onChange(values.slice(0, index).concat(values.slice(index + 1)));
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <Button className="w-max" disabled={disabled} icon={<ArrowUpload24Regular />}
                onClick={handleClick}>{label}</Button>
        {error && <Caption1 className={palette.textError}>{error}</Caption1>}
      </div>
      <input className="hidden" multiple={maxFiles > 1} onChange={handleChange} ref={inputRef} type="file" />
      {values.map((f, i) => (
        <div key={f.name + f.lastModified} className="flex space-x-4 justify-between">
          <Body1>{f.name}</Body1>
          <Button
            appearance="transparent"
            icon={<Dismiss24Regular />}
            onClick={() => handleRemove(i)}
            shape="circular"
            size="small"
            title="Remove file" />
        </div>
      ))}
    </div>
  );
}
