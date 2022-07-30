export interface AddConditionProps {
  code: string;
  setCode: (value: string) => void;
  remove: () => void;
  allowRemove: boolean;
  disabled?: boolean;
}
