import React from "react";
import { Flex } from "../../atoms/Flex";
import { Input } from "../../atoms/Input";
import { Label } from "../../atoms/Label/Label";

interface IProps {
  onChange: (dob: number | undefined) => void;
}

export const DateOfBirth: React.FC<IProps> = (props): JSX.Element => {
  const [day, setDay] = React.useState<string>();
  const [month, setMonth] = React.useState<string>();
  const [year, setYear] = React.useState<string>();

  const maxYear = new Date().getFullYear();

  const handleDay = (val: string) => {
    setDay(val);
    const dob = new Date(Number(year), Number(month) - 1, Number(val)).valueOf();
    props.onChange(dob);
  }

  const handleMonth = (val: string) => {
    setMonth(val);
    const dob = new Date(Number(year), Number(val) - 1, Number(day)).valueOf();
    props.onChange(dob);
  }

  const handleYear = (val: string) => {
    setYear(val);
    const dob = new Date(Number(val), Number(month) - 1, Number(day)).valueOf();
    props.onChange(dob);
  }

  return (
    <>
      <Label>Date of birth</Label>
      <Flex gap="8px">
        <div className="flex-1">
          <Input placeholder="DD" required type="number" inputMode="numeric" min={1} max={31} onChange={handleDay} />
        </div>
        <div className="flex-1">
          <Input placeholder="MM" required type="number" inputMode="numeric" min={1} max={12} onChange={handleMonth} />
        </div>
        <div className="flex-2">
          <Input placeholder="YYYY" required type="number" inputMode="numeric" min={maxYear - 150} max={maxYear} onChange={handleYear} />
        </div>
      </Flex>
    </>
  );
}
