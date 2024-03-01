import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useState } from "react";

type DropdownProps = {
  value: string;
  onChangeHandler: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  // const [categories, setCategories] = useState<[]>([]);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="select-item p-regular-14" value="Birthday">
          Birthday
        </SelectItem>
        <SelectItem className="select-item p-regular-14" value="Aniversary">
          Aniversary
        </SelectItem>
        <SelectItem className="select-item p-regular-14" value="New year">
          New year
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
