import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableToolbarActionsProps {
    title?: string;
    onCreate?: () => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    children?: React.ReactNode;
}

export function TableToolbarActions({ title, onCreate, onSearch, placeholder = 'Cari...', children } : TableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
        {children}
        {onCreate && (
            <Button onClick={onCreate} size="sm">
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                Tambah {title}
            </Button>
        )}
    </div>
  )
}
