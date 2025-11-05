import { AccordionDemo } from "@/app/demo/[name]/ui/accordion-demo"
import { BasicAlert } from "@/app/demo/[name]/ui/alert-demo"
import { IconDescriptionAlert } from "@/app/demo/[name]/ui/alert-demo"
import { DescriptionOnlyAlert } from "@/app/demo/[name]/ui/alert-demo"
import { IconTitleAlert } from "@/app/demo/[name]/ui/alert-demo"
import { LongTitleAlert } from "@/app/demo/[name]/ui/alert-demo"
import { LongDescriptionAlert } from "@/app/demo/[name]/ui/alert-demo"
import { LongContentAlert } from "@/app/demo/[name]/ui/alert-demo"
import { DestructiveAlert } from "@/app/demo/[name]/ui/alert-demo"
import { DestructiveWithListAlert } from "@/app/demo/[name]/ui/alert-demo"
import { AlertWithAction } from "@/app/demo/[name]/ui/alert-demo"
import { CustomColorAlert } from "@/app/demo/[name]/ui/alert-demo"
import { AlertDialogDemo } from "@/app/demo/[name]/ui/alert-dialog-demo"
import { AspectRatioDemo } from "@/app/demo/[name]/ui/aspect-ratio-demo"
import { AvatarDemo } from "@/app/demo/[name]/ui/avatar-demo"
import { BadgeDemo } from "@/app/demo/[name]/ui/badge-demo"
import { BreadcrumbDemo } from "@/app/demo/[name]/ui/breadcrumb-demo"
import { ButtonDemo } from "@/app/demo/[name]/ui/button-demo"
import { CalendarDemo } from "@/app/demo/[name]/ui/calendar-demo"
import { CardDemo } from "@/app/demo/[name]/ui/card-demo"
import { CarouselDemo } from "@/app/demo/[name]/ui/carousel-demo"
import { CheckboxDemo } from "@/app/demo/[name]/ui/checkbox-demo"
import { CollapsibleDemo } from "@/app/demo/[name]/ui/collapsible-demo"
import { ComboboxDemo } from "@/app/demo/[name]/ui/combobox-demo"
import { CommandDemo } from "@/app/demo/[name]/ui/command-demo"
import { ComponentWrapper } from "@/components/component-wrapper"
import { ContextMenuDemo } from "@/app/demo/[name]/ui/context-menu-demo"
import { DatePickerDemo } from "@/app/demo/[name]/ui/date-picker-demo"
import { DialogDemo } from "@/app/demo/[name]/ui/dialog-demo"
import { DrawerDemo } from "@/app/demo/[name]/ui/drawer-demo"
import { DropdownMenuDemo } from "@/app/demo/[name]/ui/dropdown-menu-demo"
import { HoverCardDemo } from "@/app/demo/[name]/ui/hover-card-demo"
import { InputDemo } from "@/app/demo/[name]/ui/input-demo"
import { InputOTPDemo } from "@/app/demo/[name]/ui/input-otp-demo"
import { LabelDemo } from "@/app/demo/[name]/ui/label-demo"
import { MenubarDemo } from "@/app/demo/[name]/ui/menubar-demo"
import { NavigationMenuDemo } from "@/app/demo/[name]/ui/navigation-menu-demo"
import { PaginationDemo } from "@/app/demo/[name]/ui/pagination-demo"
import { PopoverDemo } from "@/app/demo/[name]/ui/popover-demo"
import { ProgressDemo } from "@/app/demo/[name]/ui/progress-demo"
import { RadioGroupDemo } from "@/app/demo/[name]/ui/radio-group-demo"
import { ResizableDemo } from "@/app/demo/[name]/ui/resizable-demo"
import { ScrollAreaDemo } from "@/app/demo/[name]/ui/scroll-area-demo"
import { SelectDemo } from "@/app/demo/[name]/ui/select-demo"
import { SeparatorDemo } from "@/app/demo/[name]/ui/separator-demo"
import { SheetDemo } from "@/app/demo/[name]/ui/sheet-demo"
import { SkeletonDemo } from "@/app/demo/[name]/ui/skeleton-demo"
import { SliderDemo } from "@/app/demo/[name]/ui/slider-demo"
import { SwitchDemo } from "@/app/demo/[name]/ui/switch-demo"
import { TableDemo } from "@/app/demo/[name]/ui/table-demo"
import { TabsDemo } from "@/app/demo/[name]/ui/tabs-demo"
import { TextareaDemo } from "@/app/demo/[name]/ui/textarea-demo"
import { ToggleDemo } from "@/app/demo/[name]/ui/toggle-demo"
import { ToggleGroupDemo } from "@/app/demo/[name]/ui/toggle-group-demo"
import { TooltipDemo } from "@/app/demo/[name]/ui/tooltip-demo"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function ComponentsPage() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ComponentWrapper name="Accordion">
              <AccordionDemo />
            </ComponentWrapper>
            <ComponentWrapper name="BasicAlert">
              <BasicAlert />
              </ComponentWrapper>

            <ComponentWrapper name="IconDescriptionAlert">
              <IconDescriptionAlert />
              </ComponentWrapper>

            <ComponentWrapper name="DescriptionOnlyAlert">
              <DescriptionOnlyAlert />
              </ComponentWrapper>

            <ComponentWrapper name="IconTitleAlert">
              <IconTitleAlert />
              </ComponentWrapper>

            <ComponentWrapper name="LongTitleAlert">
              <LongTitleAlert />
              </ComponentWrapper>

            <ComponentWrapper name="LongDescriptionAlert">
              <LongDescriptionAlert />
              </ComponentWrapper>

            <ComponentWrapper name="LongContentAlert">
              <LongContentAlert />
              </ComponentWrapper>

            <ComponentWrapper name="DestructiveAlert">
              <DestructiveAlert />
              </ComponentWrapper>

            <ComponentWrapper name="DestructiveWithListAlert">
              <DestructiveWithListAlert />
              </ComponentWrapper>

            <ComponentWrapper name="AlertWithAction">
              <AlertWithAction />
              </ComponentWrapper>

            <ComponentWrapper name="CustomColorAlert">
              <CustomColorAlert />
            </ComponentWrapper>
            <ComponentWrapper name="AlertDialog">
              <AlertDialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name="AspectRatio">
              <AspectRatioDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Avatar">
              <AvatarDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Badge">
              <BadgeDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Breadcrumb">
              <BreadcrumbDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Button">
              <div className="flex items-center gap-2">
                <ButtonDemo />

              </div>
              <div className="flex items-center gap-2">
              <ButtonDemo />
              <ButtonDemo />
              <ButtonDemo />
              </div>
              <div className="flex items-center gap-2">
              <ButtonDemo />
              </div>
            </ComponentWrapper>
            <ComponentWrapper name="Calendar">
              <CalendarDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Card">
              <CardDemo />
            </ComponentWrapper>
            <ComponentWrapper
              name="Carousel"
              className="[&_.max-w-xs]:max-w-[70%]"
            >
              <CarouselDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Checkbox">
              <CheckboxDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Collapsible">
              <CollapsibleDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Combobox">
              <ComboboxDemo />
            </ComponentWrapper>
            <ComponentWrapper
              name="Command"
              className="[&_[cmdk-root]]:md:min-w-max"
            >
              <CommandDemo />
            </ComponentWrapper>
            <ComponentWrapper name="ContextMenu">
              <ContextMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="DatePicker">
              <DatePickerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Dialog">
              <DialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Drawer">
              <DrawerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="DropdownMenu">
              <DropdownMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="HoverCard">
              <HoverCardDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Input">
              <InputDemo />
            </ComponentWrapper>
            <ComponentWrapper name="InputOTP">
              <InputOTPDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Label">
              <LabelDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Menubar">
              <MenubarDemo />
            </ComponentWrapper>
            <ComponentWrapper name="NavigationMenu" className="col-span-2">
              <NavigationMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Pagination">
              <PaginationDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Popover">
              <PopoverDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Progress">
              <ProgressDemo />
            </ComponentWrapper>
            <ComponentWrapper name="RadioGroup">
              <RadioGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Resizable" className="col-span-2">
              <ResizableDemo />
            </ComponentWrapper>
            <ComponentWrapper name="ScrollArea">
              <ScrollAreaDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Select">
              <SelectDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Separator">
              <SeparatorDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Sheet">
              <SheetDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Skeleton">
              <SkeletonDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Slider">
              <SliderDemo />
            </ComponentWrapper>
           
            <ComponentWrapper name="Switch">
              <SwitchDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Table" className="col-span-2">
              <TableDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Tabs">
              <TabsDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Textarea">
              <TextareaDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Toggle">
              <div className="flex items-center gap-2">
                <ToggleDemo />
              </div>
            </ComponentWrapper>
            <ComponentWrapper name="ToggleGroup">
              <ToggleGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Tooltip">
              <TooltipDemo />
            </ComponentWrapper>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}