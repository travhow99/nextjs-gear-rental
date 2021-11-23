import { Box } from "@chakra-ui/layout"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginText() {
  const { data: session } = useSession()

  console.log('sesh:', session)
  if (session) {
    return (
      <Box>
        Signed in as {session.user.email || session.user.name} <br />
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