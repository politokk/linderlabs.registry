import {
  ActionSonner,
  CancelSonner,
  DescriptionSonner,
  ErrorSonner,
  InfoSonner,
  PromiseSonner,
  Sonner,
  SuccessfulSonner,
  WarningSonner,
} from "@/app/demo/[name]/ui/sonner-toasts";

export const sonner = {
  name: "sonner",
  components: {
    Default: <Sonner />,
    Description: <DescriptionSonner />,
    Success: <SuccessfulSonner />,
    Info: <InfoSonner />,
    Warning: <WarningSonner />,
    Error: <ErrorSonner />,
    Action: <ActionSonner />,
    Cancel: <CancelSonner />,
    Promise: <PromiseSonner />,
  },
};