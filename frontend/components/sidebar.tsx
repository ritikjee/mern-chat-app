import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getServerSideUser } from "@/utils/get-server-side-user";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

async function Sidebar() {
  const user = await getServerSideUser();

  if (!user) {
    return null;
  }

  var rooms = [];

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/get-rooms?userId=${user.id}`
    );
    rooms = data;
  } catch (error) {
    console.log(error);
    rooms = [];
  }

  return (
    <Command className="flex flex-col justify-between">
      <CommandList className="max-h-screen">
        <CommandInput placeholder="Type a command or search..." />
        <CommandEmpty>No results found.</CommandEmpty>
        {rooms.map((room: any) => (
          <Link href={`/room/${room._id}`} key={room._id}>
            <CommandGroup heading={"Rooms"}>
              <CommandItem>
                <Avatar>
                  <AvatarImage src={room.profile} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="ml-2">{room.name}</span>
              </CommandItem>
            </CommandGroup>
          </Link>
        ))}
      </CommandList>
      <Button>Create Room</Button>
    </Command>
  );
}
export default Sidebar;
