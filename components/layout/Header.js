import { Spacer, Box, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import Link from "next/link";
import LoginText from "./LoginText";

export default function Header() {
  return (
    <Flex
      alignItems="center"
      w="100%"
      p={2}
      bg="gray.100" /* justifyContent={'space-between'} */
    >
      <Box w="33%" display="flex" alignItems="center">
        <Link href="/">
          <>
            <Image
              display="inline"
              maxW="32px"
              src={
                "https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Generic-icon.png"
              }
              alt={"Fake Icon"}
            />
            <span>adventurebuddy</span>
          </>
        </Link>
      </Box>
      <Spacer />
      <LoginText />
    </Flex>
  );
}
