"use client";

import { sdk } from '@farcaster/frame-sdk'
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { SignInButton, useProfile } from "@farcaster/auth-kit";

export default function Page() {
  const { isAuthenticated, profile } = useProfile();

  const [user, setUser] = useState<any>();
  const { user_id } = useParams();
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: profile?.displayName || "",
    topic: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  // Available time slots
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/user/bulk?fids=${user_id}`,
        {
          headers: {
            accept: "application/json",
            "x-neynar-experimental": "false",
            "x-api-key": "NEYNAR_API_DOCS",
          },
        }
      );
      const data = await response.json();
      setUser(data.users[0]);
      await sdk.actions.ready()
    };

    getData();
  }, [user_id]);

  useEffect(() => {
    if (profile) {
      setBookingDetails({
        ...bookingDetails,
        name: profile.displayName || "",
      });
    }
  }, [profile]);

  const handleBooking = () => {
    // Here you would typically send this data to your backend
    console.log("Booking details:", {
      userId: user_id,
      date: date,
      timeSlot: timeSlot,
      ...bookingDetails,
    });

    // Show success state
    setBookingSuccess(true);

    // Reset form after a delay
    setTimeout(() => {
      setBookingSuccess(false);
      setDate(undefined);
      setTimeSlot(undefined);
      setBookingDetails({
        name: profile?.displayName || "",
        topic: "",
      });
      setOpenDialog(false);
    }, 3000);
  };

  if (!user) return <div>Loading...</div>;

  console.log(profile);

  if (!isAuthenticated)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-black mb-2">Please sign in</div>
        <SignInButton />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.pfp_url} alt="user"></AvatarImage>
          <AvatarFallback>FU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.display_name}</h1>
          <p className="text-muted-foreground mt-2">{user.profile.bio.text}</p>

          <div className="mt-4">
            <Button className="mt-4" onClick={() => setOpenDialog(true)}>
              Book a Meeting
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Booking Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>
              Choose a convenient time to meet with {user.display_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setTimeSlot(slot);
                      setOpenDialog(true);
                    }}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About the Meetings</CardTitle>
            <CardDescription>
              Information about the format and duration of the meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Duration</h3>
                <p className="text-sm text-muted-foreground">
                  Each meeting lasts 45 minutes
                </p>
              </div>
              <div>
                <h3 className="font-medium">Format</h3>
                <p className="text-sm text-muted-foreground">
                  Video conference via Zoom or Google Meet
                </p>
              </div>
              <div>
                <h3 className="font-medium">Cost</h3>
                <p className="text-sm text-muted-foreground">
                  First consultation costs <b>50 casts</b>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book a Meeting</DialogTitle>
            <DialogDescription>
              Fill out the form to book a meeting with {user.display_name}
            </DialogDescription>
          </DialogHeader>

          {bookingSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium">Booking Successful!</h3>
              <p className="text-center text-muted-foreground">
                We have sent the details to your email
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={bookingDetails.name}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Choose a Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label>Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="topic">Meeting Topic</Label>
                  <Input
                    id="topic"
                    value={bookingDetails.topic}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        topic: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleBooking}
                  disabled={!date || !timeSlot || !bookingDetails.name}
                >
                  Book
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
