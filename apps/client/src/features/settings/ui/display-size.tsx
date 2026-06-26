import { Select } from "@mantine/core";
import { useDisplaySize } from "../hooks";

export const DisplaySize = () => {
  const [value, setValue] = useDisplaySize();

  return (
    <Select
      variant="filled"
      onChange={(value) => setValue(Number(value))}
      comboboxProps={{ width: 200, position: "bottom-start" }}
      value={value.toString()}
      data={[
        { value: "0.7", label: "Very small" },
        { value: "0.85", label: "Small" },
        { value: "1", label: "Normal" },
        { value: "1.15", label: "Large" },
        { value: "1.3", label: "Very large" },
      ]}
    />
  );
};
