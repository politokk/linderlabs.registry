"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function Sonner() {
  return <Button size="sm" onClick={() => toast("Event has been created")}>Default Toast</Button>;
}

export function DescriptionSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
    >
      Description Toast
    </Button>
  );
}

export function SuccessfulSonner() {
  return (
    <Button variant="outline" size="sm"  onClick={() => toast.success("Event has been created")}>
      Success Toast
    </Button>
  );
}

export function InfoSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => toast.info("Be at the area 10 minutes before the event time")}
    >
      Info Toast
    </Button>
  );
}

export function WarningSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => toast.warning("Event start time cannot be earlier than 8am")}
    >
      Warning Toast
    </Button>
  );
}

export function ErrorSonner() {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => toast.error("Event has not been created")}
    >
      Error Toast
    </Button>
  );
}

export function ActionSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast("Event has been created", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Action Toast
    </Button>
  );
}

export function CancelSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast("Event has been created", {
          cancel: {
            label: "Cancel",
            onClick: () => console.log("Cancel"),
          },
        })
      }
    >
      Cancel Toast
    </Button>
  );
}

export function PromiseSonner() {
  return (
    <Button
      variant="outline"
      size="sm"
        onClick={() =>
        toast.promise<{ name: string }>(
          () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve({ name: "Sonner" })
              }, 2000)
            }),
          {
            loading: "Loading...",
            success: (data) => {
              return `${data.name} toast has been added`
            },
            error: "Error",
          }
        )
      }
    >
      Promise Toast
    </Button>
  );
}