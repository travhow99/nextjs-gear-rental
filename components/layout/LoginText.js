import { Box } from "@chakra-ui/layout"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginText() {
  const { data: session } = useSession()
  if (session) {
    return (
      <Box>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </Box>
    )
  }
  return (
    <Box>
      <button onClick={() => signIn()}>Sign in</button>
    </Box>
  )
}