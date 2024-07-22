import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function SelectComponent<T>({ data, placeholder, setValue, value }: { value: T | null, setValue: (val: T) => void, data: { label: string, value: T }[], placeholder?: string }) {
    return (
        <Select onValueChange={(val) => setValue(val as T)} value={value ? String(value) : undefined}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
                {data.map((item, idx) => (
                    <SelectItem key={`select-item-${idx}`} value={String(item.value)}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}
