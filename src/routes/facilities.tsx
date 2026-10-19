import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Users, Package } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/cards/EntityCards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { facilities, } from "@/data/mock";
import type { Facility } from "@/types";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities & Booking — KhelSankalp SGSITS" },
      {
        name: "description",
        content:
          "Grounds, courts and the indoor hall at SGSITS Indore — availability",
      },
      { property: "og:title", content: "Facilities & Booking — KhelSankalp SGSITS" },
    ],
  }),
  component: FacilitiesPage,
});


function FacilitiesPage() {

 const committee = [
    { no: 1, name: "Prof. Neetesh Purohit", designation: "Director" },
    { no: 2, name: "Prof. R.C. Gurjar", designation: "Prof. I/c Basketball" },
    { no: 3, name: "Prof. M.L. Jain", designation: "I/c Volleyball (M/W)" },
    { no: 4, name: "Capt. (Dr.) Manish Jaiswal", designation: "Deputy Director Physical Education" },
    { no: 5, name: "Prof. B.S. More", designation: "Dean SSAA & I/c Chess (M)" },
    { no: 6, name: "Prof. Nitish Gupta", designation: "I/c Kho-Kho (M/W)" },
    { no: 7, name: "Prof. D.S. Ajnar", designation: "I/c Lawn Tennis (M/W)" },
    { no: 8, name: "Dr. Girish G. Soni", designation: "I/c Cricket (M/W)" },
    { no: 9, name: "Prof. R.S. Mandloi", designation: "I/c Netball (M/W)" },
    { no: 10, name: "Dr. Nidhi Oswal", designation: "I/c Throw Ball (M/W)" },
    { no: 11, name: "Dr. Suresh Paswan", designation: "I/c Football (M/W) & Cycling" },
    { no: 12, name: "Dr. Mayura Kemkar", designation: "I/c Chess (W)" },
    { no: 13, name: "Shri Arun Kuliha", designation: "I/c Badminton (M/W)" },
    { no: 14, name: "Dr. Krishnakant Dhakad", designation: "I/c Pickle Ball & Handball (M/W)" },
    { no: 15, name: "Dr. Vipin Kaushik", designation: "I/c Gymnasium (M/W)" },
    { no: 16, name: "Prof. Rakesh Sagar", designation: "I/c Table Tennis (M/W)" },
    { no: 17, name: "Prof. Ravi Jatola", designation: "I/c Kabaddi (M/W)" },
    { no: 18, name: "Prof. Neha Patkar", designation: "I/c Aerobics & Yoga" },
    { no: 19, name: "Prof. Prabnesh Gani", designation: "I/c Carrom" },
    { no: 20, name: "Prof. Sharad Pandey", designation: "I/c Billiards and Snooker" },
  ];

  const studentCommittee = [
  { no: 1, name: "Shreyansh Tiwari", designation: "Coordinator" },
  { no: 2, name: "Drashti Baghel", designation: "Co-Coordinator" },
  { no: 3, name: "Ayush Kushwaha", designation: "Co-Coordinator" },
  { no: 4, name: "Mitansh Jariya", designation: "Treasurer" },
  { no: 5, name: "Akshita Sinha", designation: "Media Head" },
  { no: 6, name: "Prince Kumar", designation: "Media Head" },
  { no: 7, name: "Kartikey Dwivedi", designation: "Planning & Development Manager" },
  { no: 8, name: "Shivam Sharma", designation: "Planning & Development Manager" },
  { no: 9, name: "Piyush Bidwal", designation: "Marketing & Sponsorship Head" },
  { no: 10, name: "Khushi Soni", designation: "Marketing & Sponsorship Head" },
  { no: 11, name: "Rakshit Singh", designation: "Branch Representative Head" },
  { no: 12, name: "Kashish Mahore", designation: "Branch Representative Head" },
  { no: 13, name: "Zeenat Khan", designation: "Culture & Creative Head" },
  { no: 14, name: "Riya Chaturvedi", designation: "Culture & Creative Head" },
  { no: 15, name: "Dhairya Verma", designation: "Operations & Executive Head" },
];

   const outdoorGames = [
    { name: "Cricket", type: "Team Sport", icon: "🏏" },
    { name: "Football", type: "Team Sport", icon: "⚽" },
    { name: "Basketball", type: "Court Sport", icon: "🏀" },
    { name: "Volleyball", type: "Team Sport", icon: "🏐" },
    { name: "Kho-Kho", type: "Traditional Sport", icon: "🏃" },
    { name: "Kabaddi", type: "Traditional Sport", icon: "🤼" },
    { name: "Lawn Tennis", type: "Racquet Sport", icon: "🎾" },
    { name: "Netball", type: "Team Sport", icon: "🏐" },
    { name: "Throw Ball", type: "Team Sport", icon: "🏐" },
    { name: "Cycling", type: "Outdoor Sport", icon: "🚴" },
    { name: "Handball", type: "Team Sport", icon: "🤾" },
    { name: "Pickleball", type: "Racquet Sport", icon: "🏓" },
  ];

  const indoorGames = [
    { name: "Chess", type: "Strategy Game", icon: "♟️" },
    { name: "Badminton", type: "Racquet Sport", icon: "🏸" },
    { name: "Table Tennis", type: "Racquet Sport", icon: "🏓" },
    { name: "Carrom", type: "Board Game", icon: "🎯" },
    { name: "Billiards & Snooker", type: "Cue Sport", icon: "🎱" },
    { name: "Gymnasium", type: "Fitness", icon: "🏋️" },
    { name: "Aerobics & Yoga", type: "Fitness", icon: "🧘" },
    { name: "Karate", type: "Martial Arts", icon: "🥋" },
    { name: "Boxing", type: "Martial Arts", icon: "🥊" },
    { name: "Taekwondo", type: "Martial Arts", icon: "🥋" },
    { name: "Billard and Snooker", type: "Strategy Game", icon: "🎱" },
  ];

  const renderGames = (
    games: { name: string; type: string; icon: string }[]
  ) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <Card
          key={game.name}
          className="p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-3xl">
              {game.icon}
            </div>
            <div>
              <h3 className="font-semibold">{game.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {game.type}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );


  return (
    <div>
      <PageHeader
        eyebrow="Campus infrastructure"
        title="Facilities"
        description="Sports grounds, courts and facilities available at SGSITS."
        actions={
          <Button asChild variant="outline">
            <Link to="/campus-map">
              <MapPin className="mr-2 h-4 w-4" />
              View campus map
            </Link>
          </Button>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Tabs defaultValue="venues">
          <TabsList className="flex h-auto flex-wrap gap-1">
            <TabsTrigger value="venues">
              Facilities
            </TabsTrigger>

            <TabsTrigger value="committee">
              Institude Sports Committee
            </TabsTrigger>
          </TabsList>

         
<TabsContent value="venues" className="mt-6">
  <div className="space-y-8">
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Outdoor Games</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore outdoor sports available at SGSITS.
        </p>
      </div>
      {renderGames(outdoorGames)}
    </section>

    <section>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Indoor Games</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore indoor sports and fitness activities at SGSITS.
        </p>
      </div>
      {renderGames(indoorGames)}
    </section>
  </div>
</TabsContent>


          <TabsContent value="equipment" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">
                Sports Equipment
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                View sports equipment and related information.
              </p>
              {/* Add your existing equipment content here */}
            </Card>
          </TabsContent>



<TabsContent value="committee" className="mt-6">
  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

    {/* Faculty Sports Committee Card */}
    <Card className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Faculty Sports Committee
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Faculty members and their designations at SGSITS.
        </p>
        <Badge variant="secondary" className="mt-4">
          {committee.length} Members
        </Badge>
      </div>

      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {committee.map((member) => (
              <TableRow key={member.no}>
                <TableCell>{member.no}</TableCell>
                <TableCell className="font-medium">
                  {member.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.designation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>

    {/* Student Sports Committee Card */}
    <Card className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Student Sports Committee
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Student representatives and their responsibilities.
        </p>
        <Badge variant="secondary" className="mt-4">
          {studentCommittee.length} Members
        </Badge>
      </div>

      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentCommittee.map((member) => (
              <TableRow key={member.no}>
                <TableCell>{member.no}</TableCell>
                <TableCell className="font-medium">
                  {member.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.designation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>

  </div>
</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
