import { Input } from "@ui/shadcn/Input";
import { Label } from "@ui/shadcn/Label";
import { twMerge } from "tailwind-merge";

type Props = {
    type: string;
    label: string;
    placeholder: string;
    value?: any;
    onChange?: (value: any) => void;
    className?: string;
};

export function InputWithLabel({
    type,
    label,
    placeholder,
    value,
    onChange,
    className,
}: Props) {
    return (
        <div className={twMerge("grid w-full items-center gap-1.5", className)}>
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <Input
                type={type}
                id={label.toLowerCase()}
                placeholder={placeholder}
                onChange={(e) =>
                    onChange &&
                    (type == "file"
                        ? onChange(e.target.files![0])
                        : onChange(e.target.value))
                }
                value={value}
            />
        </div>
    );
}
