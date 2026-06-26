import { Select } from "@mantine/core";
import { useFontFamily } from "../hooks";

export const TextStyleLoader = () => {
  const [value] = useFontFamily();

  return (
    <link
      rel="stylesheet"
      href={`https://fonts.googleapis.com/css2?family=${value.replace(" ", "+")}:wght@400;700;900&display=swap`}
    />
  );
};

export const TextStyle = () => {
  const [value, setValue] = useFontFamily();

  return (
    <Select
      variant="filled"
      onChange={(value) => setValue(value || "Roboto")}
      comboboxProps={{ width: 200, position: "bottom-start" }}
      value={value}
      data={[
        { value: "Roboto", label: "Roboto - Normal" },
        { value: "Comic Neue", label: "Comic Neue - Thin" },
        { value: "Fira Code", label: "Fira Code - Mono" },
        { value: "Sansita", label: "Sansita - Anime" },
        { value: "Kalam", label: "Kalam - Cursive" },
      ]}
    />
  );
};
