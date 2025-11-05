import {
  BasicAlert,
  IconDescriptionAlert,
  DescriptionOnlyAlert,
  IconTitleAlert,
  LongTitleAlert,
  LongDescriptionAlert,
  LongContentAlert,
  DestructiveAlert,
  DestructiveWithListAlert,
  AlertWithAction,
  CustomColorAlert,
} from "@/app/demo/[name]/ui/alert-demo";

export const alert = {
  name: "alert",
  components: {
    Basic: <BasicAlert />,
    "Icon & Description": <IconDescriptionAlert />,
    "Description Only": <DescriptionOnlyAlert />,
    "Icon & Title": <IconTitleAlert />,
    "Long Title": <LongTitleAlert />,
    "Long Description": <LongDescriptionAlert />,
    "Long Content": <LongContentAlert />,
    Destructive: <DestructiveAlert />,
    "Destructive with List": <DestructiveWithListAlert />,
    "With Action": <AlertWithAction />,
    "Custom Color": <CustomColorAlert />,
  },
};