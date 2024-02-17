import { Input } from "@/components/ui/input";
import { getServerSideUser } from "@/utils/get-server-side-user";
import axios from "axios";
import { log } from "console";
import { redirect } from "next/navigation";

async function RoomIdPage({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const user = await getServerSideUser();

  if (!user) {
    return redirect("/sign-in");
  }

  var messages = [];
  var rooms;

  try {
    [{ data: rooms }, { data: messages }] = await Promise.all([
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/get-room?roomId=${params.roomId}`
      ),
      axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/get-messages`,
        {
          roomId: params.roomId,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ),
    ]);

    if (!rooms) {
      return redirect("/room");
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-1">
        {messages.length === 0 ? (
          <h1>No messages</h1>
        ) : (
          <div>
            {
              // @ts-ignore
              rooms.map((room) => {
                return (
                  <div key={room._id}>
                    <h1>{room.name}</h1>
                    <p>{room.profile}</p>
                  </div>
                );
              })
            }
          </div>
        )}
      </div>
      <Input />
    </div>
  );
}

export default RoomIdPage;
