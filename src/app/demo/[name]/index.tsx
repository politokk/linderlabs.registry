import type { ReactElement, ReactNode } from "react";

// blocks
import { blank } from "@/app/demo/[name]/blocks/blank";
import { dashboard } from "@/app/demo/[name]/blocks/dashboard";
import { sidebar07 } from "@/app/demo/[name]/blocks/sidebar-07";
// components
import { brandHeader } from "@/app/demo/[name]/components/brand-header";
import { brandSidebar } from "@/app/demo/[name]/components/brand-sidebar";
import { hero } from "@/app/demo/[name]/components/hero";
import { login } from "@/app/demo/[name]/components/login";
import { logo } from "@/app/demo/[name]/components/logo";
// ui
import { accordion } from "@/app/demo/[name]/ui/accordion";
import { alert } from "@/app/demo/[name]/ui/alert";
import { alertDialog } from "@/app/demo/[name]/ui/alert-dialog";
import { aspectRatio } from "@/app/demo/[name]/ui/aspect-ratio";
import { avatar } from "@/app/demo/[name]/ui/avatar";
import { badge } from "@/app/demo/[name]/ui/badge";
import { breadcrumb } from "@/app/demo/[name]/ui/breadcrumb";
import { button } from "@/app/demo/[name]/ui/button";
import { buttonGroup } from "@/app/demo/[name]/ui/button-group";
import { calendar } from "@/app/demo/[name]/ui/calendar";
import { carousel } from "@/app/demo/[name]/ui/carousel";   
import { card } from "@/app/demo/[name]/ui/card";
import { chart } from "@/app/demo/[name]/ui/chart";
import { checkbox } from "@/app/demo/[name]/ui/checkbox";
import { collapsible } from "@/app/demo/[name]/ui/collapsible"; 
import { combobox } from "@/app/demo/[name]/ui/combobox";
import { command } from "@/app/demo/[name]/ui/command";
import { contextMenu } from "@/app/demo/[name]/ui/context-menu";
import { dataTable } from "@/app/demo/[name]/ui/data-table";
import { datePicker } from "@/app/demo/[name]/ui/date-picker";
import { dialog } from "@/app/demo/[name]/ui/dialog";
import { drawer } from "@/app/demo/[name]/ui/drawer";
import { dropdownMenu } from "@/app/demo/[name]/ui/dropdown-menu";
import { empty } from "@/app/demo/[name]/ui/empty";
import { field } from "@/app/demo/[name]/ui/field";
import { form } from "@/app/demo/[name]/ui/form";
import { hoverCard } from "@/app/demo/[name]/ui/hover-card";
import { input } from "@/app/demo/[name]/ui/input";
import { inputGroup } from "@/app/demo/[name]/ui/input-group";
import { inputOTP } from "@/app/demo/[name]/ui/input-otp";
import { item } from "@/app/demo/[name]/ui/item";
import { kbd } from "@/app/demo/[name]/ui/kbd";
import { label } from "@/app/demo/[name]/ui/label";
import { menubar } from "@/app/demo/[name]/ui/menubar";
import { navigationMenu } from "@/app/demo/[name]/ui/navigation-menu";
import { pagination } from "@/app/demo/[name]/ui/pagination";
import { popover } from "@/app/demo/[name]/ui/popover";
import { progress } from "@/app/demo/[name]/ui/progress";
import { radioGroup } from "@/app/demo/[name]/ui/radio-group";
import { resizable } from "@/app/demo/[name]/ui/resizable";
import { scrollArea } from "@/app/demo/[name]/ui/scroll-area";
import { select } from "@/app/demo/[name]/ui/select";
import { sidebar } from "@/app/demo/[name]/ui/sidebar"; 
import { separator } from "@/app/demo/[name]/ui/separator";
import { sheet } from "@/app/demo/[name]/ui/sheet";
import { skeleton } from "@/app/demo/[name]/ui/skeleton";
import { slider } from "@/app/demo/[name]/ui/slider";
import { sonner } from "@/app/demo/[name]/ui/sonner";
import { spinner } from "@/app/demo/[name]/ui/spinner";
import { switchConfig } from "@/app/demo/[name]/ui/switch";
import { table } from "@/app/demo/[name]/ui/table";
import { tabs } from "@/app/demo/[name]/ui/tabs";
import { textarea } from "@/app/demo/[name]/ui/textarea";
import { toggle } from "@/app/demo/[name]/ui/toggle";
import { toggleGroup } from "@/app/demo/[name]/ui/toggle-group";
import { tooltip } from "@/app/demo/[name]/ui/tooltip";

interface Demo {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  // blocks
  blank,
  dashboard,

  // components
  hero,
  login,
  logo,
  "brand-header": brandHeader,
  "brand-sidebar": brandSidebar,
  "sidebar-07": sidebar07,
  // ui
  accordion,
  alert,
  "aspect-ratio": aspectRatio,
  avatar,
  badge,
  breadcrumb,
  button,
  "button-group": buttonGroup,
  calendar,
  card,
  carousel,
  chart,
  checkbox, 
  "collapsible": collapsible,
  "alert-dialog": alertDialog,
  dialog,
  "drawer": drawer,
  "date-picker": datePicker,
  "data-table": dataTable,
  "combobox": combobox,
  "command": command,
  "context-menu": contextMenu,
  "dropdown-menu": dropdownMenu,
  "empty": empty,
  "field": field,
  "form": form,
  "hover-card": hoverCard,
  input,
  "input-group": inputGroup,
  "input-otp": inputOTP,
  "item": item,
  "kbd": kbd,
  "label": label,
  "menubar": menubar,
  "navigation-menu": navigationMenu,
  "pagination": pagination,
  "popover": popover,
  "progress": progress,
  "radio-group": radioGroup,
  "resizable": resizable,
  "scroll-area": scrollArea,
  select,
  "separator": separator,
  "sheet": sheet,
  "sidebar": sidebar,
  "skeleton": skeleton,
  "slider": slider,
  "spinner": spinner,
  "switch": switchConfig,
  "sonner": sonner,
  "table": table,
  tabs,
  "textarea": textarea,
  "toggle": toggle,
  "toggle-group": toggleGroup,
  tooltip,
};
