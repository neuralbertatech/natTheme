import type { ComponentProps } from "svelte";
import type {
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLFormAttributes,
  HTMLInputAttributes,
  HTMLInputTypeAttribute,
  HTMLTextareaAttributes,
} from "svelte/elements";
import type {
  CalendarSingleRootProps,
  CheckboxRootProps,
  LabelRootProps,
  RadioGroupItemProps,
  RadioGroupRootProps,
  SelectMultipleRootProps,
  SelectSingleRootProps,
  SelectTriggerProps,
  SliderSingleRootProps,
  SwitchRootProps,
  WithElementRef,
  WithoutChildrenOrChild,
  CommandInputProps,
  SingleToggleGroupRootPropsWithoutHTML,
  BitsPrimitiveDivAttributes,
  Without,
  ToggleGroupRootPropsWithoutHTML,
  ToggleGroupItemProps,
} from "bits-ui";
import type { ButtonType, LayoutType } from "@sjsf/form/fields/components";
import type { Button } from "@sjsf/shadcn-theme/default";

type InputType = Exclude<HTMLInputTypeAttribute, "file">;

type InputProps = WithElementRef<
  Omit<HTMLInputAttributes, "type"> &
    (
      | { type: "file"; files?: FileList }
      | { type?: InputType; files?: undefined }
    )
>;

type ToggleVariants = {
  variant?: "default" | "outline" | undefined;
  size?: "default" | "sm" | "lg" | undefined;
};

type ToggleGroupProps = SingleToggleGroupRootPropsWithoutHTML &
  Without<BitsPrimitiveDivAttributes, ToggleGroupRootPropsWithoutHTML> &
  ToggleVariants;

export interface UiOptions {
  shadcnButton?: ComponentProps<typeof Button>;
  shadcnButtons?: {
    [B in ButtonType]: ComponentProps<typeof Button>;
  };
  /**
   * Overrides the attributes of the description.
   */
  descriptionAttributes?: HTMLAttributes<HTMLDivElement>;
  /**
   * Overrides the attributes of the errors list.
   */
  errorsList?: HTMLAttributes<HTMLUListElement>;

  form?: HTMLFormAttributes;
  /**
   * Overrides the attributes of the help.
   */
  helpAttributes?: HTMLAttributes<HTMLDivElement>;

  shadcnLabel?: LabelRootProps;
  /**
   * Overrides the attributes of any layout component.
   */
  layout?: HTMLAttributes<HTMLDivElement>;
  /**
   * Overrides the attributes of a layout with a specific type.
   * This override takes precedence over the `layout` override, but does not replace it.
   */
  layouts?: {
    [L in LayoutType]?: HTMLAttributes<HTMLDivElement>;
  };
  shadcnSubmitButton?: ComponentProps<typeof Button>;
  /**
   * Overrides the attributes of the field title
   */
  titleAttributes?: HTMLAttributes<HTMLDivElement>;

  shadcnCheckbox?: WithoutChildrenOrChild<CheckboxRootProps>;

  shadcnNumber?: InputProps;

  shadcnSelect?: Omit<SelectSingleRootProps, "type">;
  shadcnSelectTrigger?: SelectTriggerProps;

  shadcnText?: InputProps;

  shadcnCheckboxes?: WithoutChildrenOrChild<CheckboxRootProps>;

  shadcnComboboxTrigger?: ComponentProps<typeof Button>;
  shadcnComboboxInput?: CommandInputProps;
  shadcnComboboxEmptyText?: string;

  shadcnDatePicker?: Omit<
    WithoutChildrenOrChild<CalendarSingleRootProps>,
    "type"
  >;
  shadcnDatePickerTrigger?: ComponentProps<typeof Button>;
  shadcnDateFormatter?: (date: Date) => string;

  file?: HTMLInputAttributes;

  shadcnMultiSelect?: Omit<SelectMultipleRootProps, "type">;
  shadcnMultiSelectTrigger?: SelectTriggerProps;

  shadcnRadioButtons?: ToggleGroupProps;
  shadcnRadioButtonsItem?: ToggleGroupItemProps & ToggleVariants;

  shadcnRadioGroup?: WithoutChildrenOrChild<RadioGroupRootProps>;
  shadcnRadioItem?: Omit<WithoutChildrenOrChild<RadioGroupItemProps>, "value">;

  shadcnRange?: Omit<WithoutChildrenOrChild<SliderSingleRootProps>, "type">;

  shadcnSwitch?: WithoutChildrenOrChild<SwitchRootProps>;

  textarea?: HTMLTextareaAttributes;
}
