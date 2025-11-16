import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
