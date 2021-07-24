import { signOut, useSession } from "next-auth/client";

import { Text, Avatar, Divider, Link, Popover } from "@geist-ui/react";

const Profile = () => {
  const [session] = useSession();

  const content = () => (
    <>
      <Popover.Item>
        <Text p>{session?.user.name}</Text>
      </Popover.Item>

      <Popover.Item>
        <Text h5>{session?.user.email}</Text>
      </Popover.Item>

      <Divider y={1} />
      <Popover.Item>
        <Link href="#" block>
          Settings
        </Link>
      </Popover.Item>

      <Popover.Item>
        <Link href="#" onClick={signOut} block>
          Sign Out
        </Link>
      </Popover.Item>
    </>
  );

  return (
    <Popover content={content} hideArrow>
      <Avatar
        loading="lazy"
        src={session?.user.image}
        alt="Avatar"
        size="medium"
        style={{ cursor: "pointer" }}
      />
    </Popover>
  );
};

export default Profile;
