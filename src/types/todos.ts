export interface TodoItem {
    id: string;
    checked: boolean;
    title: string;
}

export interface TodoItemProps extends TodoItem {
    onChecked: (id: string, checked: boolean) => void
    onDelete: (id: string) => void
}