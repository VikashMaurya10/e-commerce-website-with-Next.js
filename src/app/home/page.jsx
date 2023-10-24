"use client"

import { useAuth } from "../../context/auth-provider";

const Home = () => {
  const authCon = useAuth()

  return (
    <div>Home page
      <pre>
        {
          JSON.stringify(authCon, null, 4)
        }
      </pre>
     
    </div>
  )
}

export default Home