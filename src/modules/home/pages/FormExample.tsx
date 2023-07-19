import {
  Checkbox,
  CheckboxProps,
  Input,
  InputProps,
  Label,
  Radio,
  RadioGroup,
  RadioGroupProps
} from "@fluentui/react-components";
import { useState } from "react";
import useUniqueList from "@/core/form/useUniqueList.ts";
import Upload from "@/core/form/Upload.tsx";

export default function FormExample() {
  const { state: checkboxes, addOrRemove: addOrRemoveCheckbox, setState: setCheckboxes } = useUniqueList<string>({});
  const [radio, setRadio] = useState("");
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleAllCheckboxChange: CheckboxProps["onChange"] = (_, data) => {
    if (typeof data.checked === "boolean") {
      if (data.checked) setCheckboxes(["1", "2", "3"]);
      else setCheckboxes([]);
    } else setCheckboxes(["1", "2", "3"]);
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (ev, _) => {
    addOrRemoveCheckbox(ev.target.value);
  };

  const handleInputChange: InputProps["onChange"] = (_, data) => {
    setInput(data.value);
  };

  const handleRadioChange: RadioGroupProps["onChange"] = (_, data) => {
    setRadio(data.value);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="space-x-3">
        <Label htmlFor="sample-input">Sample input</Label>
        <Input
          aria-labelledby="sample-input"
          contentAfter=".00"
          contentBefore="$"
          onChange={handleInputChange}
          value={input}
        />
      </div>
      <div className="space-y-1.5">
        <Checkbox
          checked={checkboxes.length === 3 ? true : checkboxes.length > 0 ? "mixed" : false}
          label="All options"
          onChange={handleAllCheckboxChange}
        />
        <div className="space-x-3">
          {["1", "2", "3"].map(n =>
            <Checkbox
              key={n}
              checked={checkboxes.some(c => c === n)}
              label={`Option ${n}`}
              onChange={handleCheckboxChange}
              value={n} />)}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sample-radio">Radio</Label>
        <RadioGroup aria-labelledby="sample-radio" onChange={handleRadioChange} value={radio}>
          <div className="flex space-x-3">
            {["1", "2", "3"].map(n =>
              <Radio
                key={n}
                label={`Option ${n}`}
                value={n}
              />)}
          </div>
        </RadioGroup>
      </div>
      <Upload label="Subir 1 archivo" maxFiles={3} onChange={setFiles} values={files} />
    </div>
  );
}
