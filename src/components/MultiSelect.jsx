import { Box } from "@mui/system";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import { flexCenter } from "../styles/globalStyle";

const MultiSelect = (props) => {
  const {
    data1,
    data2,
    key1,
    key2,
    firstNames,
    setFirstNames,
    setSecondNames,
  } = props;

  //? Purchases verilerinde ayni urun tekrar tekrar olabilir. Bunu engellemek icin
  //? verileri Set veri yapisina aktararak benzersiz olamasini saglayabiliriz.

  const uniqueFirstNames = new Set(data1?.map((item) => item[key1]));
  const uniqueSecondNames = new Set(
    data1 !== data2
      ? data2
          ?.filter((item) => firstNames?.includes(item[key2]))
          .map((item) => item[key1])
      : data2
          ?.filter((item) => firstNames?.includes(item[key1]))
          .map((item) => item[key2])
  );
  return (
    <Box sx={flexCenter} mt={3}>
      <MultiSelectBox
        handleSelect={(item) => setFirstNames(item)}
        placeholder={`Select ${key1}`}
        maxWidth="max-w-none"
        marginTop="mt-0"
      >
        {[...uniqueFirstNames]?.map((item) => (
          <MultiSelectBoxItem key={item} text={item} value={item} />
        ))}
      </MultiSelectBox>
      <MultiSelectBox
        handleSelect={(item) => setSecondNames(item)}
        placeholder={`Select ${key2}`}
        maxWidth="max-w-none"
        marginTop="mt-0"
      >
        {[...uniqueSecondNames]?.map((item) => (
          <MultiSelectBoxItem key={item} text={item} value={item} />
        ))}
      </MultiSelectBox>
    </Box>
  );
};

export default MultiSelect;
